"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdmin } from "@/lib/auth/admin";
import { expireCatalog } from "@/lib/admin/catalog-cache";
import { prisma } from "@/lib/prisma";
import { parseDestinationForm, type DestinationFieldErrors } from "./destination-schema";

export type DestinationFormState = {
  error?: string;
  fieldErrors?: DestinationFieldErrors;
  values?: Record<string, string>;
};

const FIELDS = [
  "slug",
  "categoryId",
  "imageId",
  "status",
  "nameVi",
  "summaryVi",
  "nameEn",
  "summaryEn",
  "latitude",
  "longitude",
  "openingHours",
  "ticketInfo",
  "sourceUrl",
] as const;

function text(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

/** Creates (no id) or updates (id given) a destination with its vi/en translations. Admin only. */
export async function saveDestinationAction(
  _prev: DestinationFormState,
  formData: FormData,
): Promise<DestinationFormState> {
  await assertAdmin();

  const id = text(formData, "id");
  const values: Record<string, string> = {};
  for (const f of FIELDS) values[f] = text(formData, f);

  const parsed = parseDestinationForm(values);
  if (!parsed.success) return { fieldErrors: parsed.fieldErrors, values };
  const d = parsed.data;

  const category = await prisma.category.findUnique({ where: { id: d.categoryId }, select: { id: true } });
  if (!category) return { fieldErrors: { categoryId: "Danh mục không tồn tại." }, values };

  const imageId = values.imageId.trim() || null;
  if (imageId) {
    const image = await prisma.mediaAsset.findUnique({ where: { id: imageId }, select: { id: true } });
    if (!image) return { fieldErrors: { imageId: "Ảnh không tồn tại trong thư viện." }, values };
  }

  const clash = await prisma.destination.findUnique({ where: { slug: d.slug }, select: { id: true } });
  if (clash && clash.id !== id) return { fieldErrors: { slug: "Slug này đã được dùng." }, values };

  const common = {
    slug: d.slug,
    categoryId: d.categoryId,
    imageId,
    status: d.status,
    latitude: d.latitude,
    longitude: d.longitude,
    openingHours: d.openingHours,
    ticketInfo: d.ticketInfo,
    sourceUrl: d.sourceUrl,
  };

  let previousSlug: string | null = null;
  try {
    if (id) {
      const existing = await prisma.destination.findUnique({ where: { id }, select: { id: true, slug: true } });
      if (!existing) return { error: "Không tìm thấy điểm đến cần sửa.", values };
      previousSlug = existing.slug;
      await prisma.$transaction([
        prisma.destination.update({ where: { id }, data: common }),
        prisma.destinationTranslation.upsert({
          where: { destinationId_locale: { destinationId: id, locale: "vi" } },
          create: { destinationId: id, locale: "vi", name: d.nameVi, summary: d.summaryVi },
          update: { name: d.nameVi, summary: d.summaryVi },
        }),
        d.nameEn !== null && d.summaryEn !== null
          ? prisma.destinationTranslation.upsert({
              where: { destinationId_locale: { destinationId: id, locale: "en" } },
              create: { destinationId: id, locale: "en", name: d.nameEn, summary: d.summaryEn },
              update: { name: d.nameEn, summary: d.summaryEn },
            })
          : prisma.destinationTranslation.deleteMany({ where: { destinationId: id, locale: "en" } }),
      ]);
    } else {
      await prisma.destination.create({
        data: {
          ...common,
          isSample: false,
          translations: {
            create: [
              { locale: "vi", name: d.nameVi, summary: d.summaryVi },
              ...(d.nameEn !== null && d.summaryEn !== null
                ? [{ locale: "en" as const, name: d.nameEn, summary: d.summaryEn }]
                : []),
            ],
          },
        },
      });
    }
  } catch (error) {
    // Two admins saving the same slug at once: unique constraint violation.
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return { fieldErrors: { slug: "Slug này đã được dùng." }, values };
    }
    throw error;
  }

  expireCatalog();
  // A visitor (or the admin previewing a draft) may already have cached a 404 for this exact URL.
  revalidatePath(`/destinations/${d.slug}`);
  if (previousSlug && previousSlug !== d.slug) revalidatePath(`/destinations/${previousSlug}`);
  redirect("/admin/destinations");
}

/** Publishes or hides a destination. Admin only. */
export async function setDestinationStatusAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = text(formData, "id");
  const status = text(formData, "status");
  if (!id || (status !== "DRAFT" && status !== "PUBLISHED")) throw new Error("Invalid request");
  const { slug } = await prisma.destination.update({ where: { id }, data: { status }, select: { slug: true } });
  expireCatalog();
  revalidatePath(`/destinations/${slug}`);
}
