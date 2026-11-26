import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "Đăng ký",
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <PageShell variant="compact">
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Tạo tài khoản</h1>
      <p className="mt-3 text-muted-foreground">Miễn phí. Chỉ cần email và mật khẩu.</p>
      <Suspense fallback={<p className="mt-8 text-muted-foreground">Đang tải…</p>}>
        <AuthForm mode="register" />
      </Suspense>
    </PageShell>
  );
}
