import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { AdminGate } from "@/components/admin/admin-gate";
import { PageShell } from "@/components/ui/page-shell";

// Every admin page depends on the signed-in user, so none of it can be prerendered.
export const instant = false;

export const metadata: Metadata = {
  title: "Quản trị",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <PageShell>
      <Suspense fallback={<p className="text-muted-foreground">Đang tải…</p>}>
        <AdminGate>{children}</AdminGate>
      </Suspense>
    </PageShell>
  );
}
