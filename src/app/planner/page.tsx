import type { Metadata } from "next";
import { PlannerPage } from "@/components/pages/public-pages";
import { staticPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = staticPageMetadata("vi", "planner");

export default function Page() {
  return <PlannerPage locale="vi" />;
}
