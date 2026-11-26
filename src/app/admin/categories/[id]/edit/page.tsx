import { CategoryEditPage } from "@/components/admin/category-pages";

export default async function AdminEditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CategoryEditPage id={id} />;
}
