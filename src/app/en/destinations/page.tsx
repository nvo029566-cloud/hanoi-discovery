import type { Metadata } from "next";
import { DestinationsPage } from "@/components/pages/public-pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMetadata("en", "destinations");

export default function Page() {
  return <DestinationsPage locale="en" />;
}
