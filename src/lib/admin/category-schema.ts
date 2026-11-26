import { z } from "zod";

/**
 * Validation for the admin category form.
 * Vietnamese is required; English is optional but must be complete (name + description) when present.
 */

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blankToNull = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .transform((v) => (v === "" ? null : v));

const shape = {
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "Slug cần ít nhất 2 ký tự.")
    .max(60, "Slug tối đa 60 ký tự.")
    .regex(SLUG, "Slug chỉ gồm chữ thường a-z, số và dấu gạch ngang (ví dụ: di-tich)."),
  sortOrder: z
    .string()
    .trim()
    .regex(/^\d{1,3}$/, "Thứ tự là số nguyên từ 0 đến 999.")
    .transform(Number),
  nameVi: z.string().trim().max(120, "Tối đa 120 ký tự."),
  descriptionVi: z.string().trim().max(600, "Tối đa 600 ký tự."),
  nameEn: blankToNull(120, "Tối đa 120 ký tự."),
  descriptionEn: blankToNull(600, "Tối đa 600 ký tự."),
};

export type CategoryInput = z.infer<z.ZodObject<typeof shape>>;
export type CategoryFieldErrors = Partial<Record<string, string>>;
export type CategoryParseResult =
  | { success: true; data: CategoryInput }
  | { success: false; fieldErrors: CategoryFieldErrors };

export function parseCategoryForm(input: unknown): CategoryParseResult {
  const schema = z.object(shape).superRefine((d, ctx) => {
    const issue = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });
    if (d.nameVi.length < 2) issue("nameVi", "Cần ít nhất 2 ký tự.");
    if (d.descriptionVi.length < 10) issue("descriptionVi", "Mô tả tiếng Việt cần ít nhất 10 ký tự.");
    const hasName = d.nameEn !== null;
    const hasDescription = d.descriptionEn !== null;
    if (hasName !== hasDescription) {
      issue(hasName ? "descriptionEn" : "nameEn", "Bản tiếng Anh cần đầy đủ tên và mô tả (hoặc để trống cả hai).");
    }
  });

  const parsed = schema.safeParse(input);
  if (parsed.success) return { success: true, data: parsed.data };
  const fieldErrors: CategoryFieldErrors = {};
  for (const i of parsed.error.issues) fieldErrors[String(i.path[0] ?? "form")] ??= i.message;
  return { success: false, fieldErrors };
}
