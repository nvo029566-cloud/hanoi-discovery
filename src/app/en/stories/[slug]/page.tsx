import type { Metadata } from "next";
import { StoryDetailPage, detailMetadata } from "@/components/pages/public-pages";
import { getCatalog } from "@/lib/catalog";

// Keep real 404 status codes for unknown slugs: allow a blocking route instead of a Suspense shell.
export const instant = false;

export async function generateStaticParams() {
  const { stories } = await getCatalog("en");
  return stories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata("stories", "en", slug);
}

export default async function Page({ params }: PageProps<"/en/stories/[slug]">) {
  const { slug } = await params;
  return <StoryDetailPage locale="en" slug={slug} />;
}
