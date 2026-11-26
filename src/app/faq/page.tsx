import type { Metadata } from "next";
import { FAQPage } from "@/components/pages/faq-page";
import { getMessages } from "@/i18n/messages";
import { customPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = customPageMetadata(
  "vi",
  "/faq",
  getMessages("vi").faq.eyebrow,
  getMessages("vi").faq.meta,
);

export default function Page() {
  return <FAQPage locale="vi" />;
}
