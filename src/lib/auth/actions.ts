"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyAgainstDummy, verifyPassword } from "./password";
import { createRateLimiter } from "./rate-limit";
import { safeRedirectPath } from "./redirect";
import { createSession, destroySession, getCurrentUser } from "./session";
import { parseLogin, parseRegister, type FieldErrors } from "./validation";

export type AuthFormState = {
  error?: string;
  fieldErrors?: FieldErrors;
  values?: { name?: string; email?: string };
};

// 5 login attempts per email per 15 minutes (per server instance).
const loginLimiter = createRateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });

function text(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

export async function registerAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const raw = { name: text(formData, "name"), email: text(formData, "email"), password: text(formData, "password") };
  const values = { name: raw.name, email: raw.email };
  const parsed = parseRegister(raw);
  if (!parsed.success) return { fieldErrors: parsed.fieldErrors, values };

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) return { fieldErrors: { email: "Email này đã được đăng ký." }, values };

  const passwordHash = await hashPassword(password);
  let userId: string;
  try {
    const user = await prisma.user.create({ data: { name, email, passwordHash }, select: { id: true } });
    userId = user.id;
  } catch (error) {
    // Two sign-ups racing for the same email: unique constraint violation.
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return { fieldErrors: { email: "Email này đã được đăng ký." }, values };
    }
    throw error;
  }

  await createSession(userId);
  redirect("/profile");
}

export async function loginAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const raw = { email: text(formData, "email"), password: text(formData, "password") };
  const values = { email: raw.email };
  const parsed = parseLogin(raw);
  if (!parsed.success) return { fieldErrors: parsed.fieldErrors, values };

  const { email, password } = parsed.data;
  const limit = loginLimiter.consume(email);
  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60000));
    return { error: `Bạn đã thử quá nhiều lần. Vui lòng thử lại sau khoảng ${minutes} phút.`, values };
  }

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, passwordHash: true } });
  let valid = false;
  if (user) valid = await verifyPassword(password, user.passwordHash);
  else await verifyAgainstDummy(password);
  if (!user || !valid) return { error: "Email hoặc mật khẩu không đúng.", values };

  loginLimiter.reset(email);
  await createSession(user.id);
  redirect(safeRedirectPath(formData.get("next")));
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}

export type ToggleFavoriteResult = { ok: true; favorited: boolean } | { ok: false; error: string };

export async function toggleFavoriteAction(slug: string): Promise<ToggleFavoriteResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Bạn cần đăng nhập để lưu điểm đến." };

  const destination = await prisma.destination.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: { id: true },
  });
  if (!destination) return { ok: false, error: "Không tìm thấy điểm đến." };

  const key = { userId_destinationId: { userId: user.id, destinationId: destination.id } };
  const existing = await prisma.favorite.findUnique({ where: key });
  if (existing) {
    await prisma.favorite.delete({ where: key });
    return { ok: true, favorited: false };
  }
  await prisma.favorite.create({ data: { userId: user.id, destinationId: destination.id } });
  return { ok: true, favorited: true };
}
