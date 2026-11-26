import type { Metadata } from "next";
import { DestinationDetailPage, detailMetadata } from "@/components/pages/public-pages";
import { getCatalog } from "@/lib/catalog";

// Keep real 404 status codes for unknown slugs: allow a blocking route instead of a Suspense shell.
export const instant = false;

export async function generateStaticParams() {
  const { destinations } = await getCatalog("vi");
  return destinations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata("destinations", "vi", slug);
}

export default async function Page({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  return <DestinationDetailPage locale="vi" slug={slug} />;
}
