import type { Metadata } from "next";
import { CultureDetailPage, detailMetadata } from "@/components/pages/public-pages";
import { getCatalog } from "@/lib/catalog";

// Keep real 404 status codes for unknown slugs: allow a blocking route instead of a Suspense shell.
export const instant = false;

export async function generateStaticParams() {
  const { culture } = await getCatalog("en");
  return culture.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/culture/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata("culture", "en", slug);
}

export default async function Page({ params }: PageProps<"/en/culture/[slug]">) {
  const { slug } = await params;
  return <CultureDetailPage locale="en" slug={slug} />;
}
