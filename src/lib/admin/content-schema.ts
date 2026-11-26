import { z } from "zod";
import type { ContentKind } from "./content-kinds";

/**
 * Validation for the generic admin form (food, culture, story).
 * Vietnamese is required; English is optional but must be complete when present.
 * Story bodies are typed as paragraphs separated by a blank line.
 */

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blankToNull = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .transform((v) => (v === "" ? null : v));

const paragraphs = z
  .string()
  .transform((v) =>
    v
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0),
  )
  .pipe(z.array(z.string().max(3000, "Mỗi đoạn tối đa 3000 ký tự.")).max(40, "Tối đa 40 đoạn."));

const shape = {
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "Slug cần ít nhất 2 ký tự.")
    .max(80, "Slug tối đa 80 ký tự.")
    .regex(SLUG, "Slug chỉ gồm chữ thường a-z, số và dấu gạch ngang (ví dụ: pho-bo)."),
  status: z.enum(["DRAFT", "PUBLISHED"], "Trạng thái không hợp lệ."),
  nameVi: z.string().trim().max(160, "Tối đa 160 ký tự."),
  summaryVi: blankToNull(600, "Tối đa 600 ký tự."),
  bodyVi: paragraphs,
  nameEn: blankToNull(160, "Tối đa 160 ký tự."),
  summaryEn: blankToNull(600, "Tối đa 600 ký tự."),
  bodyEn: paragraphs,
};

export type ContentInput = z.infer<z.ZodObject<typeof shape>>;
export type ContentFieldErrors = Partial<Record<string, string>>;
export type ContentParseResult =
  | { success: true; data: ContentInput }
  | { success: false; fieldErrors: ContentFieldErrors };

export function parseContentForm(kind: ContentKind, input: unknown): ContentParseResult {
  const schema = z.object(shape).superRefine((d, ctx) => {
    const issue = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });

    if (d.nameVi.length < 2) issue("nameVi", "Cần ít nhất 2 ký tự.");
    if (kind !== "food" && (d.summaryVi === null || d.summaryVi.length < 10)) {
      issue("summaryVi", "Mô tả tiếng Việt cần ít nhất 10 ký tự.");
    }
    if (kind === "story" && d.bodyVi.length === 0) issue("bodyVi", "Cần ít nhất một đoạn nội dung.");

    if (kind === "food") {
      if (d.summaryEn !== null && d.nameEn === null) issue("nameEn", "Cần tên tiếng Anh khi có mô tả tiếng Anh.");
      return;
    }
    const english: [string, boolean][] = [
      ["nameEn", d.nameEn !== null],
      ["summaryEn", d.summaryEn !== null],
      ...(kind === "story" ? ([["bodyEn", d.bodyEn.length > 0]] as [string, boolean][]) : []),
    ];
    if (english.some(([, ok]) => ok) && !english.every(([, ok]) => ok)) {
      for (const [key, ok] of english) if (!ok) issue(key, "Bản tiếng Anh cần đầy đủ các mục (hoặc để trống tất cả).");
    }
  });

  const parsed = schema.safeParse(input);
  if (parsed.success) return { success: true, data: parsed.data };
  const fieldErrors: ContentFieldErrors = {};
  for (const i of parsed.error.issues) fieldErrors[String(i.path[0] ?? "form")] ??= i.message;
  return { success: false, fieldErrors };
}
