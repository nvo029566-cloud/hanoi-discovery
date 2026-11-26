import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/category-form";
import { deleteCategoryAction } from "@/lib/admin/category-actions";
import { prisma } from "@/lib/prisma";

const buttonClass = "inline-flex min-h-11 items-center rounded-[10px] border border-border px-3 font-medium";

export async function CategoryListPage() {
  const rows = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
    include: { translations: { where: { locale: "vi" } }, _count: { select: { destinations: true } } },
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Danh mục</h1>
        <Link
          href="/admin/categories/new"
          className="inline-flex min-h-11 items-center rounded-[10px] bg-primary px-5 font-medium text-primary-foreground"
        >
          Thêm danh mục
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 text-muted-foreground">Chưa có danh mục nào.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Danh sách danh mục</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 font-semibold">Tên</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Slug</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Thứ tự</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Số điểm đến</th>
                <th scope="col" className="py-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border align-middle">
                  <td className="py-3 pr-4">{r.translations[0]?.name ?? "(chưa có bản tiếng Việt)"}</td>
                  <td className="py-3 pr-4 font-mono text-xs">{r.slug}</td>
                  <td className="py-3 pr-4">{r.sortOrder}</td>
                  <td className="py-3 pr-4">{r._count.destinations}</td>
                  <td className="py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/admin/categories/${r.id}/edit`} className={buttonClass}>
                        Sửa
                      </Link>
                      {r._count.destinations === 0 ? (
                        <form action={deleteCategoryAction}>
                          <input type="hidden" name="id" value={r.id} />
                          <button type="submit" className={buttonClass}>
                            Xóa
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-muted-foreground">Đang được dùng, không thể xóa</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export async function CategoryNewPage() {
  const last = await prisma.category.aggregate({ _max: { sortOrder: true } });
  const next = (last._max.sortOrder ?? -1) + 1;
  return (
    <>
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Thêm danh mục</h1>
      <CategoryForm initialValues={{ sortOrder: String(Math.min(next, 999)) }} />
    </>
  );
}

export async function CategoryEditPage({ id }: { id: string }) {
  const r = await prisma.category.findUnique({ where: { id }, include: { translations: true } });
  if (!r) notFound();
  const vi = r.translations.find((t) => t.locale === "vi");
  const en = r.translations.find((t) => t.locale === "en");
  return (
    <>
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Sửa danh mục</h1>
      <CategoryForm
        categoryId={r.id}
        initialValues={{
          slug: r.slug,
          sortOrder: String(r.sortOrder),
          nameVi: vi?.name ?? "",
          descriptionVi: vi?.description ?? "",
          nameEn: en?.name ?? "",
          descriptionEn: en?.description ?? "",
        }}
      />
    </>
  );
}
