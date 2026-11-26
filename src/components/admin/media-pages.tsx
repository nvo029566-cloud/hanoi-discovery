import Link from "next/link";
import { MediaForm } from "@/components/admin/media-form";
import { deleteMediaAction } from "@/lib/admin/media-actions";
import { prisma } from "@/lib/prisma";

const buttonClass = "inline-flex min-h-11 items-center rounded-[10px] border border-border px-3 font-medium";

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export async function MediaListPage() {
  // Never select the image bytes for a list.
  const rows = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      altVi: true,
      credit: true,
      license: true,
      byteSize: true,
      mimeType: true,
      _count: { select: { destinations: true, foods: true, cultureItems: true, stories: true } },
    },
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Thư viện ảnh</h1>
        <Link
          href="/admin/media/new"
          className="inline-flex min-h-11 items-center rounded-[10px] bg-primary px-5 font-medium text-primary-foreground"
        >
          Tải ảnh lên
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 text-muted-foreground">Chưa có ảnh nào. Mọi ảnh cần có mô tả, tác giả và giấy phép.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">Danh sách ảnh</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 font-semibold">Ảnh</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Mô tả</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Tác giả / giấy phép</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Dung lượng</th>
                <th scope="col" className="py-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border align-middle">
                  <td className="py-3 pr-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/media/${r.id}`} alt={r.altVi} className="h-16 w-24 rounded-[8px] object-cover" />
                  </td>
                  <td className="py-3 pr-4">{r.altVi}</td>
                  <td className="py-3 pr-4">
                    {r.credit} · {r.license}
                  </td>
                  <td className="py-3 pr-4">{formatSize(r.byteSize)}</td>
                  <td className="py-3">
                    {r._count.destinations + r._count.foods + r._count.cultureItems + r._count.stories > 0 ? (
                      <span className="text-xs text-muted-foreground">
                        Đang được dùng làm ảnh bìa, không thể xóa
                      </span>
                    ) : (
                      <form action={deleteMediaAction}>
                        <input type="hidden" name="id" value={r.id} />
                        <button type="submit" className={buttonClass}>
                          Xóa
                        </button>
                      </form>
                    )}
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

export function MediaNewPage() {
  return (
    <>
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">Tải ảnh lên</h1>
      <MediaForm />
    </>
  );
}
