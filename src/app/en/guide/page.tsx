import type { Metadata } from "next";
import { GuidePage } from "@/components/pages/guide-page";
import { getMessages } from "@/i18n/messages";
import { customPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = customPageMetadata(
  "en",
  "/guide",
  getMessages("en").guide.eyebrow,
  getMessages("en").guide.meta,
);

export default function Page() {
  return <GuidePage locale="en" />;
}
