"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ContentCard } from "@/components/ui/content-card";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { filterFoods } from "@/lib/content";
import type { Food } from "@/types/content";

const MEAL_CATEGORIES = [
  {
    slug: "breakfast",
    nameVi: "🌅 Bữa sáng & Ăn nhẹ",
    nameEn: "🌅 Breakfast & Light",
    slugs: ["pho", "banh-cuon", "xoi-xeo", "banh-mi-dan-to", "banh-cuon-thanh-tri"],
  },
  {
    slug: "main",
    nameVi: "🍲 Bữa chính đậm đà",
    nameEn: "🍲 Lunch & Dinner",
    slugs: [
      "bun-cha",
      "cha-ca",
      "bun-thang",
      "cha-ruoi",
      "bun-dau-mam-tom",
      "bun-oc-ha-noi",
      "lau-rieu-cua-bap-bo",
    ],
  },
  {
    slug: "cafe",
    nameVi: "☕ Cà phê & Quà vặt",
    nameEn: "☕ Coffee & Sweet Treats",
    slugs: [
      "egg-coffee",
      "giang-cafe",
      "com",
      "trang-tien-ice-cream",
      "banh-tom-ho-tay",
      "nom-bo-kho",
      "tra-sen-tay-ho",
      "che-sen-long-nhan",
    ],
  },
];

export function FoodExplorer({ foods, locale = "vi" }: { foods: Food[]; locale?: Locale }) {
  const m = getMessages(locale).explorer;
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const mealType = searchParams.get("type") ?? "";

  let results = filterFoods(foods, q);
  if (mealType) {
    const category = MEAL_CATEGORIES.find((c) => c.slug === mealType);
    if (category) {
      results = results.filter((f) => category.slugs.includes(f.slug));
    }
  }

  const hasFilters = q.trim() !== "" || mealType !== "";

  // Pagination logic (8 items per page)
  const PAGE_SIZE = 8;
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
    return localePath(locale, qs ? `/food?${qs}` : "/food");
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <form
          action={localePath(locale, "/food")}
          method="get"
          role="search"
          aria-label={m.foodFormLabel}
          className="flex w-full max-w-md items-end gap-2.5"
        >
          {mealType && <input type="hidden" name="type" value={mealType} />}
          <div className="flex-1">
            <label htmlFor="food-q" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {m.foodFormLabel}
            </label>
            <input
              id="food-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder={m.foodPlaceholder}
              className="min-h-11 w-full rounded-[10px] border border-border bg-surface px-4 text-sm"
            />
          </div>
          <button
            type="submit"
            className="min-h-11 rounded-[10px] bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
          >
            {m.search}
          </button>
        </form>

        {hasFilters && (
          <Link
            href={localePath(locale, "/food")}
            className="text-xs font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4"
          >
            {m.clearSearch}
          </Link>
        )}
      </div>

      {/* Meal type filter tabs */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link
          href={localePath(locale, q ? `/food?q=${encodeURIComponent(q)}` : "/food")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            mealType === ""
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border border-border bg-surface text-foreground hover:border-primary/40"
          }`}
        >
          {locale === "vi" ? "Tất cả món" : "All Dishes"} ({foods.length})
        </Link>
        {MEAL_CATEGORIES.map((cat) => {
          const isActive = mealType === cat.slug;
          const href = localePath(
            locale,
            q
              ? `/food?type=${cat.slug}&q=${encodeURIComponent(q)}`
              : `/food?type=${cat.slug}`,
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
              {locale === "vi" ? cat.nameVi : cat.nameEn} ({cat.slugs.length})
            </Link>
          );
        })}
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        {m.foodCount(results.length)}
        {mealType && ` • ${MEAL_CATEGORIES.find((c) => c.slug === mealType)?.[locale === "vi" ? "nameVi" : "nameEn"]}`}
        {q.trim() && m.matching(q.trim())}
      </p>

      {results.length > 0 ? (
        <>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {paginatedResults.map((f, i) => (
              <li key={f.slug}>
                <ContentCard
                  href={localePath(locale, `/food/${f.slug}`)}
                  eyebrow={f.englishName || undefined}
                  title={f.name}
                  summary={f.summary}
                  image={f.image}
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
            itemLabelVi="món ăn"
            itemLabelEn="dishes"
            getPageHref={getPageHref}
          />
        </>
      ) : (
        <div className="mt-10 rounded-[16px] border border-border bg-surface p-8 text-center">
          <p className="font-serif text-xl">{m.foodEmpty}</p>
          <Link
            href={localePath(locale, "/food")}
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4"
          >
            {m.clearSearch}
          </Link>
        </div>
      )}
    </>
  );
}
