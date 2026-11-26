"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { MapLoader } from "@/components/map/map-loader";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { getCategory, withCoordinates } from "@/lib/content";
import type { Category, Destination } from "@/types/content";

/** Map of destinations that have verified coordinates, plus an interactive list and category pills. */
export function PlacesMap({
  destinations,
  categories,
  locale = "vi",
}: {
  destinations: Destination[];
  categories: Category[];
  locale?: Locale;
}) {
  const m = getMessages(locale).map;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState("");

  const allPoints = withCoordinates(destinations);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const displayedPoints = useMemo(
    () => allPoints.filter((p) => {
      const matchesQuery = !normalizedQuery || `${p.name} ${p.summary}`.toLocaleLowerCase().includes(normalizedQuery);
      return (!selectedCategory || p.category === selectedCategory) && matchesQuery;
    }),
    [allPoints, normalizedQuery, selectedCategory],
  );
  const displayedSlugs = new Set(displayedPoints.map((point) => point.slug));

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-[22px] border border-border/80 bg-surface p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {locale === "vi" ? "Tìm nhanh trên bản đồ" : "Find your next stop"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {locale === "vi" ? "Lọc theo khu vực, chủ đề hoặc tên địa điểm." : "Search by name, theme, or area."}
            </p>
          </div>
          <label className="relative block w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={locale === "vi" ? "Ví dụ: Hồ Hoàn Kiếm" : "Try: Hoan Kiem Lake"}
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              aria-label={locale === "vi" ? "Tìm kiếm địa điểm" : "Search places"}
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={locale === "vi" ? "Xóa tìm kiếm" : "Clear search"}>
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <SlidersHorizontal className="size-3.5" aria-hidden="true" />
            {locale === "vi" ? "Chủ đề:" : "Theme:"}
          </span>
        <button
          type="button"
          onClick={() => setSelectedCategory("")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            selectedCategory === ""
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border border-border bg-surface text-foreground hover:border-primary/40"
          }`}
        >
          {locale === "vi" ? "Tất cả địa danh" : "All Places"} ({allPoints.length})
        </button>
          {categories.map((c) => {
          const count = allPoints.filter((p) => p.category === c.slug).length;
          if (count === 0) return null;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSelectedCategory(c.slug)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === c.slug
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-surface text-foreground hover:border-primary/40"
              }`}
            >
              {c.name} ({count})
            </button>
          );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="isolate relative z-0">
          {displayedPoints.length > 0 ? (
            <div role="region" aria-label={m.region}>
              <MapLoader
                points={displayedPoints}
                locale={locale}
                selectedSlug={selectedSlug}
                onSelectPoint={(slug) => setSelectedSlug(slug)}
              />
            </div>
          ) : (
            <p className="rounded-[16px] border border-border bg-surface p-6 text-center text-muted-foreground">
              {m.none}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl">{m.listTitle}</h3>
            <span className="text-xs text-muted-foreground font-medium">
              {displayedPoints.length} / {destinations.length}
            </span>
          </div>
          <ul className="mt-4 max-h-[32rem] space-y-3 overflow-y-auto pr-1">
            {destinations.filter((d) => displayedSlugs.has(d.slug)).map((d) => {
              const onMap = allPoints.some((p) => p.slug === d.slug);
              const isSelected = selectedSlug === d.slug;
              return (
                <li
                  key={d.slug}
                  className={`rounded-[12px] border p-3.5 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-surface hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={localePath(locale, `/destinations/${d.slug}`)}
                        className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4 hover:text-primary/80"
                      >
                        {d.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {getCategory(categories, d.category)?.name}
                      </p>
                    </div>
                    {onMap && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSlug(d.slug);
                          if (selectedCategory && d.category !== selectedCategory) {
                            setSelectedCategory("");
                          }
                        }}
                        className="shrink-0 text-xs font-semibold text-primary/80 hover:text-primary underline decoration-1"
                        aria-label={`${locale === "vi" ? "Xem trên bản đồ" : "View on map"} ${d.name}`}
                      >
                        📍 {locale === "vi" ? "Định vị" : "Locate"}
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {onMap ? m.onMap : m.notOnMap}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            {m.attribution}
          </p>
        </div>
      </div>
    </div>
  );
}
