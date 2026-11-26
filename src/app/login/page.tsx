import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "Đăng nhập",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <PageShell variant="compact">
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Đăng nhập</h1>
      <p className="mt-3 text-muted-foreground">Lưu điểm đến yêu thích và xem lại chúng ở mọi nơi.</p>
      <Suspense fallback={<p className="mt-8 text-muted-foreground">Đang tải…</p>}>
        <AuthForm mode="login" />
      </Suspense>
    </PageShell>
  );
}
