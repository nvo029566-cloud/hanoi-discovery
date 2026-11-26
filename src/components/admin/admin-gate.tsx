import Link from "next/link";
import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/admin";

/** Server component: only admins get past it. Render inside <Suspense>. */
export async function AdminGate({ children }: { children: ReactNode }) {
  await requireAdmin();
  return (
    <div>
      <nav aria-label="Quản trị" className="mb-8 flex flex-wrap gap-2 border-b border-border pb-4 text-sm font-medium">
        <Link href="/admin" className="inline-flex min-h-11 items-center rounded-[10px] px-3 hover:bg-surface">
          Tổng quan
        </Link>
        <Link
          href="/admin/destinations"
          className="inline-flex min-h-11 items-center rounded-[10px] px-3 hover:bg-surface"
        >
          Điểm đến
        </Link>
        <Link href="/" className="inline-flex min-h-11 items-center rounded-[10px] px-3 text-muted-foreground">
          Về trang web
        </Link>
      </nav>
      {children}
    </div>
  );
}
