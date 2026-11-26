import type { Metadata } from "next";
import { MapPage } from "@/components/pages/public-pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMetadata("vi", "map");

export default function Page() {
  return <MapPage locale="vi" />;
}
