import type { Metadata } from "next";
import { HomePage } from "@/components/pages/public-pages";
import { homeMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = homeMetadata("vi");

export default function Home() {
  return <HomePage locale="vi" />;
}
