"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/locales";
import {
  GUIDE_CATEGORIES,
  TRAVEL_GUIDE_ARTICLES,
  type GuideCategoryKey,
} from "@/data/travel-guide-articles";

interface TravelGuideMagazineProps {
  locale?: Locale;
}

export function TravelGuideMagazine({ locale = "vi" }: TravelGuideMagazineProps) {
  const isEn = locale === "en";
  const [activeCategory, setActiveCategory] = useState<GuideCategoryKey>("all");

  // Filtered articles according to active category
  const { featuredArticle, sideArticles } = useMemo(() => {
    let filtered = TRAVEL_GUIDE_ARTICLES;

    if (activeCategory !== "all") {
      filtered = TRAVEL_GUIDE_ARTICLES.filter(
        (article) => article.categoryKey === activeCategory,
      );
    }

    if (activeCategory === "all") {
      // In "all", the default featured is the autumn story, and the 4 side articles match the mockup
      const featured =
        TRAVEL_GUIDE_ARTICLES.find((a) => a.isFeaturedDefault) || TRAVEL_GUIDE_ARTICLES[0];
      const sides = TRAVEL_GUIDE_ARTICLES.filter((a) => a.id !== featured.id).slice(0, 4);
      return { featuredArticle: featured, sideArticles: sides };
    }

    // When a specific category is chosen:
    const featured = filtered[0];
    const sides = filtered.slice(1, 5);
    return { featuredArticle: featured, sideArticles: sides };
  }, [activeCategory]);

  return (
    <section
      id="handbook"
      aria-labelledby="travel-magazine-heading"
      className="relative bg-[#FDFCF8] py-12 sm:py-16 lg:py-24 text-[#263B34] transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            1. SECTION HEADER (Editorial Asymmetric Layout)
        ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-6 border-b border-[#DED9CC]">
          <div className="max-w-[620px]">
            {/* Eyebrow */}
            <span className="block text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#8A6B32] mb-3">
              {isEn ? "VISITOR HANDBOOK" : "SỔ TAY DU KHÁCH"}
            </span>

            {/* Main Heading */}
            <h2
              id="travel-magazine-heading"
              className="font-serif text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.18] font-bold text-[#173D33] tracking-tight"
            >
              {isEn ? "Hanoi Through Written Pages" : "Hà Nội trong từng trang viết"}
            </h2>

            {/* Description */}
            <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#65736C] leading-relaxed max-w-[580px]">
              {isEn
                ? "Curated stories, authentic guidance, and local perspectives for those who hold Hanoi dear."
                : "Những câu chuyện, kinh nghiệm và góc nhìn dành cho người yêu Hà Nội."}
            </p>
          </div>

          {/* Right Header Navigation Link (hidden on mobile to avoid redundancy with bottom CTA) */}
          <div className="hidden md:block shrink-0 self-start md:self-end">
            <Link
              href={localePath(locale, "/guide")}
              className="group inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-medium text-[#173D33] hover:text-[#8A6B32] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
            >
              <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#8A6B32] after:transition-all after:duration-300 group-hover:after:w-full">
                {isEn ? "All articles" : "Tất cả bài viết"}
              </span>
              <span className="text-[15px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* =========================================================
            2. CATEGORY NAVIGATION BAR (Editorial Filter Bar)
        ========================================================= */}
        <nav
          aria-label={isEn ? "Handbook topic filter" : "Bộ lọc chủ đề cẩm nang"}
          className="relative mt-6 sm:mt-7 mb-7 sm:mb-8"
        >
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none pb-2 text-[14px] sm:text-[15px] border-b border-[#DED9CC]/60">
            {GUIDE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative pb-3 font-sans transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] focus-visible:ring-offset-2 rounded-sm ${
                    isActive
                      ? "text-[#173D33] font-semibold"
                      : "text-[#65736C] hover:text-[#173D33] font-normal"
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{isEn ? cat.labelEn : cat.labelVi}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B09255] transition-all duration-300 ease-out"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* =========================================================
            3. MAIN EDITORIAL CONTENT GRID (60:40 Desktop Ratio)
        ========================================================= */}
        {featuredArticle ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-12 xl:gap-14 items-start animate-in fade-in duration-250" key={activeCategory}>
            {/* ----------------- LEFT: FEATURED ARTICLE (60%) ----------------- */}
            <article className="group flex flex-col">
              <Link
                href={localePath(locale, featuredArticle.href)}
                className="block overflow-hidden rounded-[14px] sm:rounded-[18px] shadow-sm"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] sm:rounded-[18px] bg-[#FAF8F2]">
                  <Image
                    src={featuredArticle.coverImage}
                    alt={isEn ? featuredArticle.coverImageAltEn : featuredArticle.coverImageAltVi}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover rounded-[14px] sm:rounded-[18px] transition-transform duration-400 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
                  />
                </div>
              </Link>

              {/* Metadata: Category & Reading Time */}
              <div className="mt-4 sm:mt-5 flex items-center justify-between text-[11px] sm:text-[12px]">
                <span className="font-semibold uppercase tracking-[0.16em] text-[#8A6B32]">
                  {isEn ? featuredArticle.categoryLabelEn : featuredArticle.categoryLabelVi}
                </span>
                <span className="text-[#65736C] font-normal text-[12px] sm:text-[13px]">
                  {isEn ? featuredArticle.readingTimeEn : featuredArticle.readingTimeVi}
                </span>
              </div>

              {/* Featured Title */}
              <h3 className="mt-2.5 font-serif text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.25] font-bold text-[#173D33] group-hover:text-[#8A6B32] transition-colors duration-250">
                <Link
                  href={localePath(locale, featuredArticle.href)}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
                >
                  {isEn ? featuredArticle.titleEn : featuredArticle.titleVi}
                </Link>
              </h3>

              {/* Description */}
              <p className="mt-3 text-[14px] sm:text-[15px] text-[#65736C] leading-relaxed line-clamp-3 font-normal">
                {isEn ? featuredArticle.descriptionEn : featuredArticle.descriptionVi}
              </p>

              {/* CTA Link */}
              <div className="mt-4">
                <Link
                  href={localePath(locale, featuredArticle.href)}
                  className="group/cta inline-flex items-center gap-1.5 text-[14px] font-medium text-[#173D33] hover:text-[#8A6B32] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
                >
                  <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#8A6B32] after:transition-all after:duration-300 group-hover/cta:after:w-full">
                    {isEn ? "Read story" : "Đọc câu chuyện"}
                  </span>
                  <span className="text-[14px] transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 motion-reduce:transform-none">
                    ↗
                  </span>
                </Link>
              </div>
            </article>

            {/* ----------------- RIGHT: SIDE ARTICLES LIST (40%) ----------------- */}
            <div className="flex flex-col divide-y divide-[#DED9CC]">
              {sideArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex gap-4 sm:gap-5 py-4 sm:py-5 first:pt-0 last:pb-0 items-start"
                >
                  {/* Thumbnail */}
                  <Link
                    href={localePath(locale, article.href)}
                    className="relative shrink-0 size-[96px] sm:size-[112px] lg:size-[120px] overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#FAF8F2] shadow-xs"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={article.coverImage}
                      alt={isEn ? article.coverImageAltEn : article.coverImageAltVi}
                      fill
                      sizes="(max-width: 640px) 96px, 120px"
                      className="object-cover rounded-[10px] sm:rounded-[12px] transition-transform duration-400 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
                    />
                  </Link>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A6B32] mb-1">
                        {isEn ? article.categoryLabelEn : article.categoryLabelVi}
                      </span>
                      <h4 className="font-serif text-[17px] sm:text-[19px] lg:text-[20px] font-bold text-[#173D33] leading-snug line-clamp-2 group-hover:text-[#8A6B32] transition-colors duration-250">
                        <Link
                          href={localePath(locale, article.href)}
                          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
                        >
                          {isEn ? article.titleEn : article.titleVi}
                        </Link>
                      </h4>
                      {/* Short description for side articles */}
                      <p className="mt-1 text-[13px] text-[#65736C] line-clamp-2 font-normal leading-relaxed">
                        {isEn ? article.descriptionEn : article.descriptionVi}
                      </p>
                    </div>

                    <div className="mt-2 text-[12px] text-[#65736C]">
                      <span>{isEn ? article.readingTimeEn : article.readingTimeVi}</span>
                    </div>
                  </div>
                </article>
              ))}

              {sideArticles.length === 0 && (
                <div className="py-8 text-center text-[#65736C] text-[14px]">
                  {isEn ? "No additional articles in this category." : "Không có bài viết phụ trong danh mục này."}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center text-[#65736C]">
            <p className="font-serif italic text-lg">
              {isEn ? "No articles found in this category." : "Chưa có bài viết trong danh mục này."}
            </p>
          </div>
        )}

        {/* =========================================================
            4. SECTION FOOTER (Bottom Quote & Navigation CTA)
        ========================================================= */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-[#DED9CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Poetic Tagline */}
          <p className="font-serif italic text-[15px] sm:text-[17px] text-[#8A6B32] tracking-wide">
            {isEn ? "“Travel to understand, discover to cherish.”" : "“Đi để hiểu, khám phá để thêm yêu.”"}
          </p>

          {/* Bottom CTA Link */}
          <Link
            href={localePath(locale, "/guide")}
            className="group inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[#173D33] hover:text-[#8A6B32] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
          >
            <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#8A6B32] after:transition-all after:duration-300 group-hover:after:w-full">
              {isEn ? "Explore full handbook" : "Khám phá cẩm nang"}
            </span>
            <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
