import { z } from "zod";

const email = z.string().trim().toLowerCase().pipe(z.email("Email không hợp lệ.")).pipe(z.string().max(254, "Email quá dài."));

const registerSchema = z.object({
  name: z.string().trim().min(2, "Họ tên cần ít nhất 2 ký tự.").max(60, "Họ tên tối đa 60 ký tự."),
  email,
  password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự.").max(128, "Mật khẩu tối đa 128 ký tự."),
});

const loginSchema = z.object({
  email,
  password: z.string().min(1, "Vui lòng nhập mật khẩu.").max(128, "Mật khẩu tối đa 128 ký tự."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type FieldErrors = Partial<Record<string, string>>;

export type ParseResult<T> = { success: true; data: T } | { success: false; fieldErrors: FieldErrors };

function toResult<T>(parsed: z.ZodSafeParseResult<T>): ParseResult<T> {
  if (parsed.success) return { success: true, data: parsed.data };
  const fieldErrors: FieldErrors = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  return { success: false, fieldErrors };
}

export function parseRegister(input: unknown): ParseResult<RegisterInput> {
  return toResult(registerSchema.safeParse(input));
}

export function parseLogin(input: unknown): ParseResult<LoginInput> {
  return toResult(loginSchema.safeParse(input));
}
