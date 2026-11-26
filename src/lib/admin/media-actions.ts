"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/prisma";
import { checkImageFile, parseMediaForm, type MediaFieldErrors } from "./media-validation";

export type MediaFormState = {
  error?: string;
  fieldErrors?: MediaFieldErrors;
  values?: Record<string, string>;
};

const FIELDS = ["altVi", "altEn", "credit", "license", "sourceUrl"] as const;

function text(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

/** Uploads one image with its attribution. Admin only. */
export async function uploadMediaAction(_prev: MediaFormState, formData: FormData): Promise<MediaFormState> {
  await assertAdmin();

  const values: Record<string, string> = {};
  for (const f of FIELDS) values[f] = text(formData, f);

  const parsed = parseMediaForm(values);
  const file = formData.get("file");
  const bytes = file instanceof File ? new Uint8Array(await file.arrayBuffer()) : new Uint8Array(0);
  const check = checkImageFile(bytes);

  const fieldErrors: MediaFieldErrors = parsed.success ? {} : { ...parsed.fieldErrors };
  if (!check.ok) fieldErrors.file = check.error;
  if (!parsed.success || !check.ok) return { fieldErrors, values };

  await prisma.mediaAsset.create({
    data: {
      mimeType: check.mime,
      byteSize: bytes.byteLength,
      data: bytes,
      altVi: parsed.data.altVi,
      altEn: parsed.data.altEn,
      credit: parsed.data.credit,
      license: parsed.data.license,
      sourceUrl: parsed.data.sourceUrl,
    },
  });
  revalidatePath("/admin/media");
  redirect("/admin/media");
}

/** Deletes one image. Admin only. */
export async function deleteMediaAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = text(formData, "id");
  if (!id) throw new Error("Invalid request");
  const inUse = await prisma.mediaAsset.findUnique({
    where: { id },
    select: { _count: { select: { destinations: true, foods: true, cultureItems: true, stories: true } } },
  });
  if (inUse && Object.values(inUse._count).some((n) => n > 0)) return; // Still used as a cover image: never delete it.
  await prisma.mediaAsset.deleteMany({ where: { id } });
  revalidatePath("/admin/media");
}
