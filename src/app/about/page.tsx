import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/public-pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMetadata("vi", "about");

export default function Page() {
  return <AboutPage locale="vi" />;
}
