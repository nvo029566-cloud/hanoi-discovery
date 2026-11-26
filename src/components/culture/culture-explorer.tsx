"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ContentCard } from "@/components/ui/content-card";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { localePath, type Locale } from "@/i18n/locales";
import type { CultureItem } from "@/types/content";

const CULTURE_CATEGORIES = [
  {
    slug: "crafts",
    nameVi: "🏺 Làng nghề thủ công",
    nameEn: "🏺 Traditional Craft Guilds",
    slugs: [
      "bat-trang-ceramics",
      "chuong-conical-hat-village",
      "ngu-xa-bronze-casting",
      "hang-trong-folk-painting",
      "thach-xa-bamboo-dragonfly",
    ],
  },
  {
    slug: "arts",
    nameVi: "🎭 Nghệ thuật diễn xướng",
    nameEn: "🎭 Performing Arts",
    slugs: [
      "water-puppetry",
      "ca-tru",
      "hat-xam-ha-noi",
      "the-quintessence-of-tonkin",
    ],
  },
  {
    slug: "festivals",
    nameVi: "🏮 Lễ hội truyền thống",
    nameEn: "🏮 Traditional Festivals",
    slugs: [
      "mid-autumn-festival",
      "huong-pagoda-festival",
      "dong-da-festival",
    ],
  },
];

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

export function CultureExplorer({
  culture,
  locale = "vi",
}: {
  culture: CultureItem[];
  locale?: Locale;
}) {
  const isEn = locale === "en";
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const catType = searchParams.get("type") ?? "";

  // Filter by query
  let results = culture;
  if (q.trim()) {
    const normQ = normalize(q);
    results = results.filter((c) => {
      const name = normalize(c.name);
      const summary = normalize(c.summary);
      return name.includes(normQ) || summary.includes(normQ);
    });
  }

  // Filter by category
  if (catType) {
    const cat = CULTURE_CATEGORIES.find((c) => c.slug === catType);
    if (cat) {
      results = results.filter((c) => cat.slugs.includes(c.slug));
    }
  }

  const hasFilters = q.trim() !== "" || catType !== "";

  // Pagination logic (6 items per page, 3x2 grid)
  const PAGE_SIZE = 6;
  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, isNaN(pageParam) ? 1 : pageParam), totalPages);
  const paginatedResults = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getPageHref = (page: number) => {
    const p = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      p.delete("page");
    } else {
      p.set("page", page.toString());
    }
    const qs = p.toString();
    return localePath(locale, qs ? `/culture?${qs}` : "/culture");
  };

  return (
    <>
      {/* Search Input Bar */}
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <form
          action={localePath(locale, "/culture")}
          method="get"
          role="search"
          aria-label={isEn ? "Search Hanoi culture and heritage" : "Tìm kiếm văn hóa di sản Hà Nội"}
          className="flex w-full max-w-md items-end gap-2.5"
        >
          {catType && <input type="hidden" name="type" value={catType} />}
          <div className="flex-1">
            <label
              htmlFor="culture-q"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {isEn ? "Heritage Keyword" : "Tìm di sản & làng nghề"}
            </label>
            <input
              id="culture-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder={isEn ? "E.g. water puppet, silk, ceramic..." : "Ví dụ: múa rối, gốm sứ, tranh..."}
              className="min-h-11 w-full rounded-[10px] border border-border bg-surface px-4 text-sm"
            />
          </div>
          <button
            type="submit"
            className="min-h-11 rounded-[10px] bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
          >
            {isEn ? "Search" : "Tìm kiếm"}
          </button>
        </form>

        {hasFilters && (
          <Link
            href={localePath(locale, "/culture")}
            className="text-xs font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4"
          >
            {isEn ? "Clear filters" : "Xóa bộ lọc"}
          </Link>
        )}
      </div>

      {/* Culture Category Filter Tabs */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          href={localePath(locale, q ? `/culture?q=${encodeURIComponent(q)}` : "/culture")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            catType === ""
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border border-border bg-surface text-foreground hover:border-primary/40"
          }`}
        >
          {isEn ? "All Heritage" : "Tất cả di sản"} ({culture.length})
        </Link>
        {CULTURE_CATEGORIES.map((cat) => {
          const isActive = catType === cat.slug;
          const href = localePath(
            locale,
            q
              ? `/culture?type=${cat.slug}&q=${encodeURIComponent(q)}`
              : `/culture?type=${cat.slug}`,
          );
          return (
            <Link
              key={cat.slug}
              href={href}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-surface text-foreground hover:border-primary/40"
              }`}
            >
              {isEn ? cat.nameEn : cat.nameVi} ({cat.slugs.length})
            </Link>
          );
        })}
      </div>

      {/* Results Status Line */}
      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        {isEn
          ? `Found ${results.length} cultural heritage items`
          : `Tìm thấy ${results.length} di sản và nét đẹp văn hóa`}
        {catType && ` • ${CULTURE_CATEGORIES.find((c) => c.slug === catType)?.[isEn ? "nameEn" : "nameVi"]}`}
        {q.trim() && ` • "${q.trim()}"`}
      </p>

      {/* Grid Cards and Pagination */}
      {results.length > 0 ? (
        <>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {paginatedResults.map((c, i) => (
              <li key={c.slug}>
                <ContentCard
                  href={localePath(locale, `/culture/${c.slug}`)}
                  title={c.name}
                  summary={c.summary}
                  image={c.image}
                  index={(currentPage - 1) * PAGE_SIZE + i}
                  locale={locale}
                />
              </li>
            ))}
          </ul>

          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            locale={locale}
            totalItems={results.length}
            pageSize={PAGE_SIZE}
            itemLabelVi="di sản"
            itemLabelEn="heritage items"
            getPageHref={getPageHref}
          />
        </>
      ) : (
        <div className="mt-10 rounded-[16px] border border-border bg-surface p-8 text-center">
          <p className="font-serif text-xl">
            {isEn ? "No heritage items match your search" : "Không tìm thấy di sản phù hợp"}
          </p>
          <Link
            href={localePath(locale, "/culture")}
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4"
          >
            {isEn ? "View all heritage items" : "Xem tất cả di sản văn hóa"}
          </Link>
        </div>
      )}
    </>
  );
}
