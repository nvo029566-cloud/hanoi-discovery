import type { Metadata } from "next";
import { ServicesView } from "@/components/services/services-view";
import { customPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = customPageMetadata(
  "en",
  "/services",
  "Hanoi Tourism Services & E-Tickets",
  "Book authorized double-decker city tour buses, world-renowned water puppet shows, nighttime heritage tours, and direct airport express transfers in Hanoi.",
);

export default function ServicesPageEn() {
  return <ServicesView locale="en" />;
}
