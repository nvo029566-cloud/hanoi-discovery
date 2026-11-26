import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfileContent } from "@/components/auth/profile-content";
import { PageShell } from "@/components/ui/page-shell";

export const metadata: Metadata = {
  title: "Hồ sơ",
  robots: { index: false },
};

export default function ProfilePage() {
  return (
    <PageShell>
      <Suspense fallback={<p className="text-muted-foreground">Đang tải…</p>}>
        <ProfileContent />
      </Suspense>
    </PageShell>
  );
}
