import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact-page";
import { getMessages } from "@/i18n/messages";
import { customPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = customPageMetadata(
  "en",
  "/contact",
  getMessages("en").contact.eyebrow,
  getMessages("en").contact.meta,
);

export default function Page() {
  return <ContactPage locale="en" />;
}
