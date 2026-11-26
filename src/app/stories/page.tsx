import type { Metadata } from "next";
import { StoriesPage } from "@/components/pages/public-pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMetadata("vi", "stories");

export default function Page() {
  return <StoriesPage locale="vi" />;
}
