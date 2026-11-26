import { z } from "zod";

/** Validation for admin image uploads. Types are detected from the file bytes; SVG is deliberately not allowed. */

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export type ImageMime = "image/jpeg" | "image/png" | "image/webp";

export function detectImageType(bytes: Uint8Array): ImageMime | null {
  const startsWith = (sig: number[], offset = 0) => sig.every((b, i) => bytes[offset + i] === b);
  if (bytes.length >= 3 && startsWith([0xff, 0xd8, 0xff])) return "image/jpeg";
  if (bytes.length >= 8 && startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  // WebP: "RIFF" <size> "WEBP"
  if (bytes.length >= 12 && startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8)) {
    return "image/webp";
  }
  return null;
}

export type FileCheck = { ok: true; mime: ImageMime } | { ok: false; error: string };

export function checkImageFile(bytes: Uint8Array): FileCheck {
  if (bytes.length === 0) return { ok: false, error: "Hãy chọn một tệp ảnh." };
  if (bytes.length > MAX_IMAGE_BYTES) return { ok: false, error: "Ảnh tối đa 2 MB." };
  const mime = detectImageType(bytes);
  if (!mime) return { ok: false, error: "Tệp không phải ảnh JPEG, PNG hoặc WebP hợp lệ." };
  return { ok: true, mime };
}

const blankToNull = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .transform((v) => (v === "" ? null : v));

const httpUrl = blankToNull(500, "Tối đa 500 ký tự.").refine(
  (v) => {
    if (v === null) return true;
    try {
      const u = new URL(v);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  },
  "Đường dẫn nguồn phải bắt đầu bằng http:// hoặc https://.",
);

const shape = {
  altVi: z.string().trim().min(5, "Mô tả ảnh (alt) cần ít nhất 5 ký tự.").max(200, "Tối đa 200 ký tự."),
  altEn: blankToNull(200, "Tối đa 200 ký tự."),
  credit: z.string().trim().min(2, "Cần ghi tác giả hoặc chủ sở hữu ảnh.").max(200, "Tối đa 200 ký tự."),
  license: z.string().trim().min(2, "Cần ghi giấy phép hoặc quyền sử dụng.").max(120, "Tối đa 120 ký tự."),
  sourceUrl: httpUrl,
};

export type MediaInput = z.infer<z.ZodObject<typeof shape>>;
export type MediaFieldErrors = Partial<Record<string, string>>;
export type MediaParseResult =
  | { success: true; data: MediaInput }
  | { success: false; fieldErrors: MediaFieldErrors };

export function parseMediaForm(input: unknown): MediaParseResult {
  const parsed = z.object(shape).safeParse(input);
  if (parsed.success) return { success: true, data: parsed.data };
  const fieldErrors: MediaFieldErrors = {};
  for (const i of parsed.error.issues) fieldErrors[String(i.path[0] ?? "form")] ??= i.message;
  return { success: false, fieldErrors };
}
