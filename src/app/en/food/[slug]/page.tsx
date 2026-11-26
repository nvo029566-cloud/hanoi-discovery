import type { Metadata } from "next";
import { FoodDetailPage, detailMetadata } from "@/components/pages/public-pages";
import { getCatalog } from "@/lib/catalog";

// Keep real 404 status codes for unknown slugs: allow a blocking route instead of a Suspense shell.
export const instant = false;

export async function generateStaticParams() {
  const { foods } = await getCatalog("en");
  return foods.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/food/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata("food", "en", slug);
}

export default async function Page({ params }: PageProps<"/en/food/[slug]">) {
  const { slug } = await params;
  return <FoodDetailPage locale="en" slug={slug} />;
}
