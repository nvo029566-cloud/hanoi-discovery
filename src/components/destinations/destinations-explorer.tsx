"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DestinationCard } from "@/components/home/destination-card";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { filterDestinations, getCategory, isCategorySlug } from "@/lib/content";
import {
  HANOI_DISTRICTS,
  filterDestinationsAdvanced,
} from "@/lib/destination-filters";
import type { Category, Destination } from "@/types/content";

export function DestinationsExplorer({
  destinations,
  categories,
  locale = "vi",
}: {
  destinations: Destination[];
  categories: Category[];
  locale?: Locale;
}) {
  const m = getMessages(locale).explorer;
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const rawCategory = params.get("category") ?? "";
  const category = isCategorySlug(categories, rawCategory) ? rawCategory : "";
  const district = params.get("district") ?? "";
  const fee = (params.get("fee") ?? "") as "free" | "paid" | "";

  const basicFiltered = filterDestinations(destinations, categories, q, category || undefined);
  const results = filterDestinationsAdvanced(basicFiltered, { district, fee });
  const hasFilters = q.trim() !== "" || category !== "" || district !== "" || fee !== "";

  // Pagination logic (9 items per page, 3x3 grid)
  const PAGE_SIZE = 9;
  const pageParam = parseInt(params.get("page") ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, isNaN(pageParam) ? 1 : pageParam), totalPages);
  const paginatedResults = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getPageHref = (page: number) => {
    const p = new URLSearchParams(params.toString());
    if (page <= 1) {
      p.delete("page");
    } else {
      p.set("page", page.toString());
    }
    const qs = p.toString();
    return localePath(locale, qs ? `/destinations?${qs}` : "/destinations");
  };

  return (
    <>
      <form
        action={localePath(locale, "/destinations")}
        method="get"
        role="search"
        aria-label={m.destFormLabel}
        className="mt-8 rounded-[16px] border border-border bg-surface p-5 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="dest-q" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {m.keyword}
            </label>
            <input
              id="dest-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder={m.destPlaceholder}
              className="min-h-11 w-full rounded-[10px] border border-border bg-background px-3.5 text-sm"
            />
          </div>

          <div>
            <label htmlFor="dest-category" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {m.category}
            </label>
            <select
              id="dest-category"
              name="category"
              defaultValue={category}
              className="min-h-11 w-full rounded-[10px] border border-border bg-background px-3 text-sm"
            >
              <option value="">{m.allCategories}</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dest-district" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {locale === "vi" ? "Khu vực / Quận" : "District / Area"}
            </label>
            <select
              id="dest-district"
              name="district"
              defaultValue={district}
              className="min-h-11 w-full rounded-[10px] border border-border bg-background px-3 text-sm"
            >
              <option value="">{locale === "vi" ? "Tất cả khu vực" : "All Districts"}</option>
              {HANOI_DISTRICTS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {locale === "vi" ? d.nameVi : d.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dest-fee" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {locale === "vi" ? "Giá vé tham quan" : "Admission Fee"}
            </label>
            <select
              id="dest-fee"
              name="fee"
              defaultValue={fee}
              className="min-h-11 w-full rounded-[10px] border border-border bg-background px-3 text-sm"
            >
              <option value="">{locale === "vi" ? "Tất cả mức giá" : "All Price Levels"}</option>
              <option value="free">{locale === "vi" ? "Miễn phí vé" : "Free Admission"}</option>
              <option value="paid">{locale === "vi" ? "Có thu phí vé" : "Ticket Required"}</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold">{locale === "vi" ? "Gợi ý nhanh:" : "Quick picks:"}</span>
            <Link
              href={localePath(locale, "/destinations?fee=free")}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${
                fee === "free" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {locale === "vi" ? "✨ Miễn phí vé" : "✨ Free entry"}
            </Link>
            <Link
              href={localePath(locale, "/destinations?district=hoan-kiem")}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${
                district === "hoan-kiem" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              🏛️ {locale === "vi" ? "Quận Hoàn Kiếm" : "Hoan Kiem"}
            </Link>
            <Link
              href={localePath(locale, "/destinations?district=ba-dinh")}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${
                district === "ba-dinh" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              ⭐ {locale === "vi" ? "Quận Ba Đình" : "Ba Dinh"}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {hasFilters && (
              <Link
                href={localePath(locale, "/destinations")}
                className="rounded-[10px] border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors"
              >
                {m.clearFilters}
              </Link>
            )}
            <button
              type="submit"
              className="rounded-[10px] bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              {m.filter}
            </button>
          </div>
        </div>
      </form>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        {m.destCount(results.length)}
        {category && m.inCategory(getCategory(categories, category)?.name ?? "")}
        {district && ` • ${HANOI_DISTRICTS.find((d) => d.slug === district)?.[locale === "vi" ? "nameVi" : "nameEn"] ?? district}`}
        {fee === "free" && ` • ${locale === "vi" ? "Miễn phí" : "Free admission"}`}
        {fee === "paid" && ` • ${locale === "vi" ? "Có phí vé" : "Ticket required"}`}
        {q.trim() && m.matching(q.trim())}
      </p>

      {results.length > 0 ? (
        <>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {paginatedResults.map((d, i) => (
              <li key={d.slug}>
                <DestinationCard
                  destination={d}
                  categoryName={getCategory(categories, d.category)?.name}
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
            itemLabelVi="địa danh"
            itemLabelEn="destinations"
            getPageHref={getPageHref}
          />
        </>
      ) : (
        <div className="mt-10 rounded-[16px] border border-border bg-surface p-8 text-center">
          <p className="font-serif text-xl">{m.destEmpty}</p>
          <p className="mt-2 text-muted-foreground">{m.destEmptyHint}</p>
          {hasFilters && (
            <Link href={localePath(locale, "/destinations")} className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4">
              {m.clearFilters}
            </Link>
          )}
        </div>
      )}
    </>
  );
}
