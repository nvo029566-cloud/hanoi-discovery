import type { Metadata } from "next";
import { StoryDetailPage, detailMetadata } from "@/components/pages/public-pages";
import { getCatalog } from "@/lib/catalog";

// Keep real 404 status codes for unknown slugs: allow a blocking route instead of a Suspense shell.
export const instant = false;

export async function generateStaticParams() {
  const { stories } = await getCatalog("vi");
  return stories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata("stories", "vi", slug);
}

export default async function Page({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  return <StoryDetailPage locale="vi" slug={slug} />;
}
