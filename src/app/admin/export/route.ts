import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  await requireAdmin();

  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get("format") ?? "json";
  const dateStr = new Date().toISOString().split("T")[0];

  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: {
        include: { translations: true },
      },
      translations: true,
    },
  });

  if (format === "csv") {
    // Generate CSV with UTF-8 BOM for Microsoft Excel compatibility
    const headers = [
      "ID",
      "Slug",
      "Ten Tieng Viet",
      "Ten Tieng Anh",
      "Danh muc",
      "Trang thai",
      "Vi do (Lat)",
      "Kinh do (Lng)",
      "Gio mo cua",
      "Gia ve",
      "Nguon kiem chung",
      "Ngay tao",
    ];

    const escapeCsv = (val: string | number | null | undefined) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = destinations.map((d) => {
      const vi = d.translations.find((t) => t.locale === "vi");
      const en = d.translations.find((t) => t.locale === "en");
      const catVi = d.category.translations.find((t) => t.locale === "vi")?.name ?? d.category.slug;

      return [
        escapeCsv(d.id),
        escapeCsv(d.slug),
        escapeCsv(vi?.name ?? d.slug),
        escapeCsv(en?.name ?? ""),
        escapeCsv(catVi),
        escapeCsv(d.status),
        escapeCsv(d.latitude),
        escapeCsv(d.longitude),
        escapeCsv(d.openingHours),
        escapeCsv(d.ticketInfo),
        escapeCsv(d.sourceUrl),
        escapeCsv(d.createdAt.toISOString()),
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="hanoi-destinations-${dateStr}.csv"`,
      },
    });
  }

  // Default JSON export
  const [foods, cultureItems, stories] = await Promise.all([
    prisma.food.findMany({ include: { translations: true } }),
    prisma.cultureItem.findMany({ include: { translations: true } }),
    prisma.story.findMany({ include: { translations: true } }),
  ]);

  const payload = {
    exportedAt: new Date().toISOString(),
    system: "Hanoi Discovery Municipal Tourism Portal",
    version: "2.0",
    catalog: {
      destinations: destinations.map((d) => {
        const vi = d.translations.find((t) => t.locale === "vi");
        const en = d.translations.find((t) => t.locale === "en");
        return {
          id: d.id,
          slug: d.slug,
          category: d.category.slug,
          status: d.status,
          nameVi: vi?.name ?? "",
          summaryVi: vi?.summary ?? "",
          nameEn: en?.name ?? "",
          summaryEn: en?.summary ?? "",
          coordinates:
            d.latitude && d.longitude ? { latitude: d.latitude, longitude: d.longitude } : null,
          openingHours: d.openingHours,
          ticketInfo: d.ticketInfo,
          sourceUrl: d.sourceUrl,
          createdAt: d.createdAt,
        };
      }),
      foods: foods.map((f) => ({
        id: f.id,
        slug: f.slug,
        translations: f.translations,
      })),
      culture: cultureItems.map((c) => ({
        id: c.id,
        slug: c.slug,
        translations: c.translations,
      })),
      stories: stories.map((s) => ({
        id: s.id,
        slug: s.slug,
        translations: s.translations,
      })),
    },
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="hanoi-tourism-data-${dateStr}.json"`,
    },
  });
}
