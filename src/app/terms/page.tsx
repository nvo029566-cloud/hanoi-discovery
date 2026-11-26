import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { getMessages } from "@/i18n/messages";
import { customPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = customPageMetadata(
  "vi",
  "/terms",
  getMessages("vi").legal.termsTitle,
  getMessages("vi").legal.termsText[0],
);

export default function Page() {
  return <LegalPage type="terms" locale="vi" />;
}
