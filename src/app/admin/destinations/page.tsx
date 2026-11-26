import Link from "next/link";
import { setDestinationStatusAction } from "@/lib/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminDestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      translations: { where: { locale: "vi" } },
      category: { include: { translations: { where: { locale: "vi" } } } },
    },
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Điểm đến</h1>
        <Link
          href="/admin/destinations/new"
          className="inline-flex min-h-11 items-center rounded-[10px] bg-primary px-5 font-medium text-primary-foreground"
        >
          Thêm điểm đến
        </Link>
      </div>

      {destinations.length === 0 ? (
        <p className="mt-8 text-muted-foreground">Chưa có điểm đến nào.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">Danh sách điểm đến</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 font-semibold">Tên</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Slug</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Danh mục</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Trạng thái</th>
                <th scope="col" className="py-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((d) => {
                const published = d.status === "PUBLISHED";
                return (
                  <tr key={d.id} className="border-b border-border align-middle">
                    <td className="py-3 pr-4">
                      {d.translations[0]?.name ?? "(chưa có tên tiếng Việt)"}
                      {d.isSample && <span className="ml-2 text-xs text-muted-foreground">(dữ liệu mẫu)</span>}
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">{d.slug}</td>
                    <td className="py-3 pr-4">{d.category.translations[0]?.name ?? d.category.slug}</td>
                    <td className="py-3 pr-4">{published ? "Đã xuất bản" : "Nháp"}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/destinations/${d.id}/edit`}
                          className="inline-flex min-h-11 items-center rounded-[10px] border border-border px-3 font-medium"
                        >
                          Sửa
                        </Link>
                        <form action={setDestinationStatusAction}>
                          <input type="hidden" name="id" value={d.id} />
                          <input type="hidden" name="status" value={published ? "DRAFT" : "PUBLISHED"} />
                          <button
                            type="submit"
                            className="inline-flex min-h-11 items-center rounded-[10px] border border-border px-3 font-medium"
                          >
                            {published ? "Chuyển về nháp" : "Xuất bản"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
