import { DestinationForm } from "@/components/admin/destination-form";
import { loadImageOptions } from "@/lib/admin/image-options";
import { prisma } from "@/lib/prisma";

export default async function NewDestinationPage() {
  const [categories, images] = await Promise.all([
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { translations: { where: { locale: "vi" } } },
    }),
    loadImageOptions(),
  ]);

  return (
    <>
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Thêm điểm đến</h1>
      <DestinationForm
        categories={categories.map((c) => ({ id: c.id, name: c.translations[0]?.name ?? c.slug }))}
        images={images}
        initialValues={{ status: "DRAFT" }}
      />
    </>
  );
}
