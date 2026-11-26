import { z } from "zod";

/**
 * Validation for the admin destination form.
 * Rule that protects data quality: coordinates, opening hours and ticket info are only accepted
 * together with a source URL, so nothing unverifiable can be published as fact.
 */

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blankToNull = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .transform((v) => (v === "" ? null : v));

const coordinate = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : Number(v)))
    .pipe(
      z
        .number({ error: `${label} phải là số (dùng dấu chấm, ví dụ 21.0285).` })
        .min(min, `${label} phải từ ${min} đến ${max}.`)
        .max(max, `${label} phải từ ${min} đến ${max}.`)
        .nullable(),
    );

const sourceUrl = blankToNull(500, "Nguồn tối đa 500 ký tự.").pipe(
  z
    .url("Nguồn phải là một đường dẫn hợp lệ.")
    .refine((u) => /^https?:\/\//i.test(u), "Nguồn phải bắt đầu bằng http:// hoặc https://")
    .nullable(),
);

const destinationSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .min(2, "Slug cần ít nhất 2 ký tự.")
      .max(80, "Slug tối đa 80 ký tự.")
      .regex(SLUG, "Slug chỉ gồm chữ thường a-z, số và dấu gạch ngang (ví dụ: ho-hoan-kiem)."),
    categoryId: z.string().trim().min(1, "Vui lòng chọn danh mục."),
    status: z.enum(["DRAFT", "PUBLISHED"], "Trạng thái không hợp lệ."),
    nameVi: z.string().trim().min(2, "Tên tiếng Việt cần ít nhất 2 ký tự.").max(120, "Tên tối đa 120 ký tự."),
    summaryVi: z
      .string()
      .trim()
      .min(10, "Mô tả tiếng Việt cần ít nhất 10 ký tự.")
      .max(600, "Mô tả tối đa 600 ký tự."),
    nameEn: blankToNull(120, "Tên tối đa 120 ký tự."),
    summaryEn: blankToNull(600, "Mô tả tối đa 600 ký tự."),
    latitude: coordinate(-90, 90, "Vĩ độ"),
    longitude: coordinate(-180, 180, "Kinh độ"),
    openingHours: blankToNull(300, "Giờ mở cửa tối đa 300 ký tự."),
    ticketInfo: blankToNull(300, "Thông tin vé tối đa 300 ký tự."),
    sourceUrl,
  })
  .superRefine((d, ctx) => {
    if ((d.nameEn === null) !== (d.summaryEn === null)) {
      ctx.addIssue({
        code: "custom",
        path: [d.nameEn === null ? "nameEn" : "summaryEn"],
        message: "Bản tiếng Anh cần cả tên và mô tả (hoặc để trống cả hai).",
      });
    }
    if ((d.latitude === null) !== (d.longitude === null)) {
      ctx.addIssue({
        code: "custom",
        path: [d.latitude === null ? "latitude" : "longitude"],
        message: "Cần nhập cả vĩ độ và kinh độ (hoặc để trống cả hai).",
      });
    }
    const hasFacts =
      d.latitude !== null || d.longitude !== null || d.openingHours !== null || d.ticketInfo !== null;
    if (hasFacts && d.sourceUrl === null) {
      ctx.addIssue({
        code: "custom",
        path: ["sourceUrl"],
        message: "Cần nguồn kiểm chứng khi nhập tọa độ, giờ mở cửa hoặc thông tin vé.",
      });
    }
  });

export type DestinationInput = z.infer<typeof destinationSchema>;
export type DestinationFieldErrors = Partial<Record<string, string>>;
export type DestinationParseResult =
  | { success: true; data: DestinationInput }
  | { success: false; fieldErrors: DestinationFieldErrors };

export function parseDestinationForm(input: unknown): DestinationParseResult {
  const parsed = destinationSchema.safeParse(input);
  if (parsed.success) return { success: true, data: parsed.data };
  const fieldErrors: DestinationFieldErrors = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  return { success: false, fieldErrors };
}
