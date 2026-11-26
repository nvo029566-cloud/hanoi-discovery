import type { Metadata } from "next";
import { FoodPage } from "@/components/pages/public-pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMetadata("vi", "food");

export default function Page() {
  return <FoodPage locale="vi" />;
}
