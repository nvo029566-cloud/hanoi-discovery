import { notFound } from "next/navigation";
import { DestinationForm } from "@/components/admin/destination-form";
import { loadImageOptions } from "@/lib/admin/image-options";
import { prisma } from "@/lib/prisma";

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [destination, categories, images] = await Promise.all([
    prisma.destination.findUnique({ where: { id }, include: { translations: true } }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { translations: { where: { locale: "vi" } } },
    }),
    loadImageOptions(),
  ]);
  if (!destination) notFound();

  const vi = destination.translations.find((t) => t.locale === "vi");
  const en = destination.translations.find((t) => t.locale === "en");

  return (
    <>
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Sửa điểm đến</h1>
      {destination.isSample && (
        <p className="mt-3 text-sm text-muted-foreground">Đây là dữ liệu mẫu. Sau khi sửa vẫn được đánh dấu là mẫu.</p>
      )}
      <DestinationForm
        destinationId={destination.id}
        images={images}
        categories={categories.map((c) => ({ id: c.id, name: c.translations[0]?.name ?? c.slug }))}
        initialValues={{
          slug: destination.slug,
          categoryId: destination.categoryId,
          imageId: destination.imageId ?? "",
          status: destination.status,
          nameVi: vi?.name ?? "",
          summaryVi: vi?.summary ?? "",
          nameEn: en?.name ?? "",
          summaryEn: en?.summary ?? "",
          latitude: destination.latitude?.toString() ?? "",
          longitude: destination.longitude?.toString() ?? "",
          openingHours: destination.openingHours ?? "",
          ticketInfo: destination.ticketInfo ?? "",
          sourceUrl: destination.sourceUrl ?? "",
        }}
      />
    </>
  );
}
