import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact-page";
import { getMessages } from "@/i18n/messages";
import { customPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = customPageMetadata(
  "vi",
  "/contact",
  getMessages("vi").contact.eyebrow,
  getMessages("vi").contact.meta,
);

export default function Page() {
  return <ContactPage locale="vi" />;
}
