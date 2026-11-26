import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { KIND_CONFIG, type ContentKind } from "@/lib/admin/content-kinds";
import { setContentStatusAction } from "@/lib/admin/content-actions";
import { loadImageOptions } from "@/lib/admin/image-options";
import { prisma } from "@/lib/prisma";

interface Row {
  id: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  isSample: boolean;
  name: string | undefined;
}

async function listRows(kind: ContentKind): Promise<Row[]> {
  const orderBy = { updatedAt: "desc" as const };
  const vi = { where: { locale: "vi" as const } };
  if (kind === "food") {
    const rows = await prisma.food.findMany({ orderBy, include: { translations: vi } });
    return rows.map((r) => ({ ...r, name: r.translations[0]?.name }));
  }
  if (kind === "culture") {
    const rows = await prisma.cultureItem.findMany({ orderBy, include: { translations: vi } });
    return rows.map((r) => ({ ...r, name: r.translations[0]?.name }));
  }
  const rows = await prisma.story.findMany({ orderBy, include: { translations: vi } });
  return rows.map((r) => ({ ...r, name: r.translations[0]?.title }));
}

export async function ContentListPage({ kind }: { kind: ContentKind }) {
  const config = KIND_CONFIG[kind];
  const rows = await listRows(kind);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">{config.listTitle}</h1>
        <Link
          href={`/admin/${config.path}/new`}
          className="inline-flex min-h-11 items-center rounded-[10px] bg-primary px-5 font-medium text-primary-foreground"
        >
          {config.addLabel}
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 text-muted-foreground">{config.empty}</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Danh sách {config.listTitle.toLowerCase()}</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 font-semibold">Tên</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Slug</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Trạng thái</th>
                <th scope="col" className="py-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const published = r.status === "PUBLISHED";
                return (
                  <tr key={r.id} className="border-b border-border align-middle">
                    <td className="py-3 pr-4">
                      {r.name ?? "(chưa có bản tiếng Việt)"}
                      {r.isSample && <span className="ml-2 text-xs text-muted-foreground">(dữ liệu mẫu)</span>}
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">{r.slug}</td>
                    <td className="py-3 pr-4">{published ? "Đã xuất bản" : "Nháp"}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/${config.path}/${r.id}/edit`}
                          className="inline-flex min-h-11 items-center rounded-[10px] border border-border px-3 font-medium"
                        >
                          Sửa
                        </Link>
                        <form action={setContentStatusAction}>
                          <input type="hidden" name="kind" value={kind} />
                          <input type="hidden" name="id" value={r.id} />
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

export async function ContentNewPage({ kind }: { kind: ContentKind }) {
  const images = await loadImageOptions();
  return (
    <>
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">{KIND_CONFIG[kind].newTitle}</h1>
      <ContentForm kind={kind} images={images} initialValues={{ status: "DRAFT" }} />
    </>
  );
}

async function loadValues(
  kind: ContentKind,
  id: string,
): Promise<{ values: Record<string, string>; isSample: boolean } | null> {
  if (kind === "food") {
    const r = await prisma.food.findUnique({ where: { id }, include: { translations: true } });
    if (!r) return null;
    const vi = r.translations.find((t) => t.locale === "vi");
    const en = r.translations.find((t) => t.locale === "en");
    return {
      isSample: r.isSample,
      values: {
        slug: r.slug,
        status: r.status,
        imageId: r.imageId ?? "",
        nameVi: vi?.name ?? "",
        summaryVi: vi?.summary ?? "",
        nameEn: en?.name ?? "",
        summaryEn: en?.summary ?? "",
      },
    };
  }
  if (kind === "culture") {
    const r = await prisma.cultureItem.findUnique({ where: { id }, include: { translations: true } });
    if (!r) return null;
    const vi = r.translations.find((t) => t.locale === "vi");
    const en = r.translations.find((t) => t.locale === "en");
    return {
      isSample: r.isSample,
      values: {
        slug: r.slug,
        status: r.status,
        imageId: r.imageId ?? "",
        nameVi: vi?.name ?? "",
        summaryVi: vi?.summary ?? "",
        nameEn: en?.name ?? "",
        summaryEn: en?.summary ?? "",
      },
    };
  }
  const r = await prisma.story.findUnique({ where: { id }, include: { translations: true } });
  if (!r) return null;
  const vi = r.translations.find((t) => t.locale === "vi");
  const en = r.translations.find((t) => t.locale === "en");
  return {
    isSample: r.isSample,
    values: {
      slug: r.slug,
      status: r.status,
      imageId: r.imageId ?? "",
      nameVi: vi?.title ?? "",
      summaryVi: vi?.excerpt ?? "",
      bodyVi: vi?.body.join("\n\n") ?? "",
      nameEn: en?.title ?? "",
      summaryEn: en?.excerpt ?? "",
      bodyEn: en?.body.join("\n\n") ?? "",
    },
  };
}

export async function ContentEditPage({ kind, id }: { kind: ContentKind; id: string }) {
  const [loaded, images] = await Promise.all([loadValues(kind, id), loadImageOptions()]);
  if (!loaded) notFound();
  return (
    <>
      <h1 className="font-serif text-[length:var(--text-hero)] leading-tight">{KIND_CONFIG[kind].editTitle}</h1>
      {loaded.isSample && (
        <p className="mt-3 text-sm text-muted-foreground">Đây là dữ liệu mẫu. Sau khi sửa vẫn được đánh dấu là mẫu.</p>
      )}
      <ContentForm kind={kind} contentId={id} images={images} initialValues={loaded.values} />
    </>
  );
}
