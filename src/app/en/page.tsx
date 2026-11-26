import type { Metadata } from "next";
import { HomePage } from "@/components/pages/public-pages";
import { homeMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = homeMetadata("en");

export default function Home() {
  return <HomePage locale="en" />;
}
