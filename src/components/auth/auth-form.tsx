"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { loginAction, registerAction, type AuthFormState } from "@/lib/auth/actions";

const initialState: AuthFormState = {};

const inputClass =
  "mt-1 h-12 w-full rounded-[10px] border border-border bg-surface px-3 text-base text-foreground";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const next = useSearchParams().get("next") ?? "";
  const [state, formAction, pending] = useActionState(isRegister ? registerAction : loginAction, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="mt-8 space-y-5">
      {!isRegister && <input type="hidden" name="next" value={next} />}

      {state.error && (
        <p role="alert" className="rounded-[10px] border border-border bg-surface p-3 text-sm text-primary">
          {state.error}
        </p>
      )}

      {isRegister && (
        <div>
          <label htmlFor="name" className="text-sm font-medium">Họ và tên</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
          {errors.name && <p id="name-error" role="alert" className="mt-1 text-sm text-primary">{errors.name}</p>}
        </div>
      )}

      <div>
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
        {errors.email && <p id="email-error" role="alert" className="mt-1 text-sm text-primary">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium">Mật khẩu</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          required
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "password-error" : isRegister ? "password-hint" : undefined}
          className={inputClass}
        />
        {isRegister && !errors.password && (
          <p id="password-hint" className="mt-1 text-sm text-muted-foreground">Ít nhất 8 ký tự.</p>
        )}
        {errors.password && (
          <p id="password-error" role="alert" className="mt-1 text-sm text-primary">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-[10px] bg-primary px-6 font-medium text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Đang xử lý…" : isRegister ? "Tạo tài khoản" : "Đăng nhập"}
      </button>

      <p className="text-sm text-muted-foreground">
        {isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-medium text-primary underline underline-offset-4"
        >
          {isRegister ? "Đăng nhập" : "Đăng ký"}
        </Link>
      </p>
    </form>
  );
}
