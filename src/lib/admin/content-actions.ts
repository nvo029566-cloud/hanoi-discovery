"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdmin } from "@/lib/auth/admin";
import { expireCatalog } from "@/lib/admin/catalog-cache";
import { prisma } from "@/lib/prisma";
import { isContentKind, KIND_CONFIG, type ContentKind } from "./content-kinds";
import { parseContentForm, type ContentFieldErrors, type ContentInput } from "./content-schema";

export type ContentFormState = {
  error?: string;
  fieldErrors?: ContentFieldErrors;
  values?: Record<string, string>;
};

const FIELDS = ["slug", "imageId", "status", "nameVi", "summaryVi", "bodyVi", "nameEn", "summaryEn", "bodyEn"] as const;

function text(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

type Saved = { missing: true } | { missing?: false; previousSlug: string | null };

async function slugOwner(kind: ContentKind, slug: string): Promise<string | null> {
  const where = { slug };
  const select = { id: true };
  const row =
    kind === "food"
      ? await prisma.food.findUnique({ where, select })
      : kind === "culture"
        ? await prisma.cultureItem.findUnique({ where, select })
        : await prisma.story.findUnique({ where, select });
  return row?.id ?? null;
}

async function saveFood(id: string, d: ContentInput, imageId: string | null): Promise<Saved> {
  const common = { slug: d.slug, status: d.status, imageId };
  if (!id) {
    await prisma.food.create({
      data: {
        ...common,
        isSample: false,
        translations: {
          create: [
            { locale: "vi", name: d.nameVi, summary: d.summaryVi },
            ...(d.nameEn !== null ? [{ locale: "en" as const, name: d.nameEn, summary: d.summaryEn }] : []),
          ],
        },
      },
    });
    return { previousSlug: null };
  }
  const existing = await prisma.food.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) return { missing: true };
  await prisma.$transaction([
    prisma.food.update({ where: { id }, data: common }),
    prisma.foodTranslation.upsert({
      where: { foodId_locale: { foodId: id, locale: "vi" } },
      create: { foodId: id, locale: "vi", name: d.nameVi, summary: d.summaryVi },
      update: { name: d.nameVi, summary: d.summaryVi },
    }),
    d.nameEn !== null
      ? prisma.foodTranslation.upsert({
          where: { foodId_locale: { foodId: id, locale: "en" } },
          create: { foodId: id, locale: "en", name: d.nameEn, summary: d.summaryEn },
          update: { name: d.nameEn, summary: d.summaryEn },
        })
      : prisma.foodTranslation.deleteMany({ where: { foodId: id, locale: "en" } }),
  ]);
  return { previousSlug: existing.slug };
}

async function saveCulture(id: string, d: ContentInput, imageId: string | null): Promise<Saved> {
  const common = { slug: d.slug, status: d.status, imageId };
  const summaryVi = d.summaryVi ?? "";
  const en = d.nameEn !== null && d.summaryEn !== null ? { name: d.nameEn, summary: d.summaryEn } : null;
  if (!id) {
    await prisma.cultureItem.create({
      data: {
        ...common,
        isSample: false,
        translations: {
          create: [{ locale: "vi", name: d.nameVi, summary: summaryVi }, ...(en ? [{ locale: "en" as const, ...en }] : [])],
        },
      },
    });
    return { previousSlug: null };
  }
  const existing = await prisma.cultureItem.findUnique({ where: { id }, select: { slug: true } });
  if (!existing) return { missing: true };
  await prisma.$transaction([
    prisma.cultureItem.update({ where: { id }, data: common }),
    prisma.cultureItemTranslation.upsert({
      where: { cultureItemId_locale: { cultureItemId: id, locale: "vi" } },
      create: { cultureItemId: id, locale: "vi", name: d.nameVi, summary: summaryVi },
      update: { name: d.nameVi, summary: summaryVi },
    }),
    en
      ? prisma.cultureItemTranslation.upsert({
          where: { cultureItemId_locale: { cultureItemId: id, locale: "en" } },
          create: { cultureItemId: id, locale: "en", ...en },
          update: en,
        })
      : prisma.cultureItemTranslation.deleteMany({ where: { cultureItemId: id, locale: "en" } }),
  ]);
  return { previousSlug: existing.slug };
}

async function saveStory(id: string, d: ContentInput, imageId: string | null): Promise<Saved> {
  const summaryVi = d.summaryVi ?? "";
  const en =
    d.nameEn !== null && d.summaryEn !== null && d.bodyEn.length > 0
      ? { title: d.nameEn, excerpt: d.summaryEn, body: d.bodyEn }
      : null;
  const published = d.status === "PUBLISHED";
  if (!id) {
    await prisma.story.create({
      data: {
        slug: d.slug,
        status: d.status,
        imageId,
        isSample: false,
        publishedAt: published ? new Date() : null,
        translations: {
          create: [
            { locale: "vi", title: d.nameVi, excerpt: summaryVi, body: d.bodyVi },
            ...(en ? [{ locale: "en" as const, ...en }] : []),
          ],
        },
      },
    });
    return { previousSlug: null };
  }
  const existing = await prisma.story.findUnique({ where: { id }, select: { slug: true, publishedAt: true } });
  if (!existing) return { missing: true };
  await prisma.$transaction([
    prisma.story.update({
      where: { id },
      data: {
        slug: d.slug,
        status: d.status,
        imageId,
        ...(published && !existing.publishedAt ? { publishedAt: new Date() } : {}),
      },
    }),
    prisma.storyTranslation.upsert({
      where: { storyId_locale: { storyId: id, locale: "vi" } },
      create: { storyId: id, locale: "vi", title: d.nameVi, excerpt: summaryVi, body: d.bodyVi },
      update: { title: d.nameVi, excerpt: summaryVi, body: d.bodyVi },
    }),
    en
      ? prisma.storyTranslation.upsert({
          where: { storyId_locale: { storyId: id, locale: "en" } },
          create: { storyId: id, locale: "en", ...en },
          update: en,
        })
      : prisma.storyTranslation.deleteMany({ where: { storyId: id, locale: "en" } }),
  ]);
  return { previousSlug: existing.slug };
}

/** Creates (no id) or updates (id given) a food, culture item or story. Admin only. */
export async function saveContentAction(_prev: ContentFormState, formData: FormData): Promise<ContentFormState> {
  await assertAdmin();

  const kind = text(formData, "kind");
  if (!isContentKind(kind)) return { error: "Loại nội dung không hợp lệ." };

  const id = text(formData, "id");
  const values: Record<string, string> = {};
  for (const f of FIELDS) values[f] = text(formData, f);

  const parsed = parseContentForm(kind, values);
  if (!parsed.success) return { fieldErrors: parsed.fieldErrors, values };
  const d = parsed.data;

  const imageId = values.imageId.trim() || null;
  if (imageId) {
    const image = await prisma.mediaAsset.findUnique({ where: { id: imageId }, select: { id: true } });
    if (!image) return { fieldErrors: { imageId: "Ảnh không tồn tại trong thư viện." }, values };
  }

  const owner = await slugOwner(kind, d.slug);
  if (owner && owner !== id) return { fieldErrors: { slug: "Slug này đã được dùng." }, values };

  let saved: Saved;
  try {
    saved =
      kind === "food"
        ? await saveFood(id, d, imageId)
        : kind === "culture"
          ? await saveCulture(id, d, imageId)
          : await saveStory(id, d, imageId);
  } catch (error) {
    // Two admins saving the same slug at once: unique constraint violation.
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return { fieldErrors: { slug: "Slug này đã được dùng." }, values };
    }
    throw error;
  }
  if (saved.missing) return { error: "Không tìm thấy mục cần sửa.", values };

  const { path } = KIND_CONFIG[kind];
  expireCatalog();
  revalidatePath(`/${path}/${d.slug}`);
  if (saved.previousSlug && saved.previousSlug !== d.slug) revalidatePath(`/${path}/${saved.previousSlug}`);
  redirect(`/admin/${path}`);
}

/** Publishes or hides a food, culture item or story. Admin only. */
export async function setContentStatusAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const kind = text(formData, "kind");
  const id = text(formData, "id");
  const status = text(formData, "status");
  if (!isContentKind(kind) || !id || (status !== "DRAFT" && status !== "PUBLISHED")) throw new Error("Invalid request");

  const select = { slug: true };
  let slug: string;
  if (kind === "food") {
    ({ slug } = await prisma.food.update({ where: { id }, data: { status }, select }));
  } else if (kind === "culture") {
    ({ slug } = await prisma.cultureItem.update({ where: { id }, data: { status }, select }));
  } else {
    const current = await prisma.story.findUnique({ where: { id }, select: { publishedAt: true } });
    if (!current) throw new Error("Not found");
    ({ slug } = await prisma.story.update({
      where: { id },
      data: { status, ...(status === "PUBLISHED" && !current.publishedAt ? { publishedAt: new Date() } : {}) },
      select,
    }));
  }
  expireCatalog();
  revalidatePath(`/${KIND_CONFIG[kind].path}/${slug}`);
}
