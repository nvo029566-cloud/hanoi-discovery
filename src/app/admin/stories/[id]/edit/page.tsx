import { ContentEditPage } from "@/components/admin/content-pages";

export default async function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ContentEditPage kind="story" id={id} />;
}
