"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdmin } from "@/lib/auth/admin";
import { expireCatalog } from "@/lib/admin/catalog-cache";
import { prisma } from "@/lib/prisma";
import { parseCategoryForm, type CategoryFieldErrors } from "./category-schema";

export type CategoryFormState = {
  error?: string;
  fieldErrors?: CategoryFieldErrors;
  values?: Record<string, string>;
};

const FIELDS = ["slug", "sortOrder", "nameVi", "descriptionVi", "nameEn", "descriptionEn"] as const;

function text(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

/** Creates (no id) or updates (id given) a category. Admin only. */
export async function saveCategoryAction(_prev: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  await assertAdmin();

  const id = text(formData, "id");
  const values: Record<string, string> = {};
  for (const f of FIELDS) values[f] = text(formData, f);

  const parsed = parseCategoryForm(values);
  if (!parsed.success) return { fieldErrors: parsed.fieldErrors, values };
  const d = parsed.data;

  const owner = await prisma.category.findUnique({ where: { slug: d.slug }, select: { id: true } });
  if (owner && owner.id !== id) return { fieldErrors: { slug: "Slug này đã được dùng." }, values };

  const en = d.nameEn !== null && d.descriptionEn !== null ? { name: d.nameEn, description: d.descriptionEn } : null;
  try {
    if (!id) {
      await prisma.category.create({
        data: {
          slug: d.slug,
          sortOrder: d.sortOrder,
          translations: {
            create: [
              { locale: "vi", name: d.nameVi, description: d.descriptionVi },
              ...(en ? [{ locale: "en" as const, ...en }] : []),
            ],
          },
        },
      });
    } else {
      const existing = await prisma.category.findUnique({ where: { id }, select: { id: true } });
      if (!existing) return { error: "Không tìm thấy danh mục cần sửa.", values };
      await prisma.$transaction([
        prisma.category.update({ where: { id }, data: { slug: d.slug, sortOrder: d.sortOrder } }),
        prisma.categoryTranslation.upsert({
          where: { categoryId_locale: { categoryId: id, locale: "vi" } },
          create: { categoryId: id, locale: "vi", name: d.nameVi, description: d.descriptionVi },
          update: { name: d.nameVi, description: d.descriptionVi },
        }),
        en
          ? prisma.categoryTranslation.upsert({
              where: { categoryId_locale: { categoryId: id, locale: "en" } },
              create: { categoryId: id, locale: "en", ...en },
              update: en,
            })
          : prisma.categoryTranslation.deleteMany({ where: { categoryId: id, locale: "en" } }),
      ]);
    }
  } catch (error) {
    // Two admins saving the same slug at once: unique constraint violation.
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return { fieldErrors: { slug: "Slug này đã được dùng." }, values };
    }
    throw error;
  }

  expireCatalog();
  revalidatePath("/");
  revalidatePath("/en");
  redirect("/admin/categories");
}

/** Deletes a category, but only when no destination uses it. Admin only. */
export async function deleteCategoryAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Invalid request");

  const inUse = await prisma.destination.count({ where: { categoryId: id } });
  if (inUse > 0) return; // The UI hides the button in this case; never delete a category that is still in use.

  await prisma.category.deleteMany({ where: { id } });
  expireCatalog();
  revalidatePath("/admin/categories");
}
