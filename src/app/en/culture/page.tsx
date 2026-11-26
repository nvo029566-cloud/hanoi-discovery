import type { Metadata } from "next";
import { CulturePage } from "@/components/pages/public-pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMetadata("en", "culture");

export default function Page() {
  return <CulturePage locale="en" />;
}
