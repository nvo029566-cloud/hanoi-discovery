"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import { localPhotos } from "@/lib/local-photos";
import type { Category, Destination } from "@/types/content";

interface TrendingCoverflowProps {
  destinations: Destination[];
  categories: Category[];
  locale?: Locale;
}

export function TrendingCoverflow({
  destinations,
  categories,
  locale = "vi",
}: TrendingCoverflowProps) {
  const isEn = locale === "en";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const filtered = selectedCategory === "all"
    ? destinations
    : destinations.filter((d) => d.category === selectedCategory);

  const displayItems = filtered.length > 0 ? filtered : destinations;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : displayItems.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < displayItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="bg-[#FAF8F3] py-16 sm:py-20 lg:py-24 border-t border-[#DEDAD1] text-[#1c2421]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Section Header matching 00:09 */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#103C34] mb-2">
            {isEn ? "Curated Highlights" : "Gợi ý nổi bật"}
          </h2>
          <p className="text-xs sm:text-sm text-[#526159] font-light">
            {isEn
              ? "Discover the most beloved heritage sanctuaries cherished by travelers and researchers."
              : "Khám phá những điểm đến được yêu thích nhất bởi cộng đồng du khách và nhà nghiên cứu."}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setCurrentIndex(0);
            }}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#103C34] text-white shadow-md shadow-emerald-950/15"
                : "bg-white text-[#526159] border border-stone-200 hover:border-[#103C34] hover:text-[#103C34]"
            }`}
          >
            {isEn ? "All Highlights" : "Tất cả"}
          </button>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.slug);
                setCurrentIndex(0);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.slug
                  ? "bg-[#103C34] text-white shadow-md shadow-emerald-950/15"
                  : "bg-white text-[#526159] border border-stone-200 hover:border-[#103C34] hover:text-[#103C34]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3D Coverflow Carousel Container matching 00:10 - 00:12 */}
        <div className="relative flex items-center justify-center py-6">
          {/* Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-0 sm:left-4 z-20 flex size-11 sm:size-12 items-center justify-center rounded-full bg-white border border-stone-200 shadow-xl text-[#103C34] hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Carousel Track */}
          <div className="w-full max-w-[880px] overflow-hidden px-4">
            <div className="flex items-center justify-center gap-4 sm:gap-6 transition-all duration-500 ease-out">
              {/* Show previous, current, next in 3D perspective */}
              {[-1, 0, 1].map((offset) => {
                const itemIndex =
                  (currentIndex + offset + displayItems.length) % displayItems.length;
                const item = displayItems[itemIndex];
                const isCenter = offset === 0;
                const cardImg = localPhotos[item.slug]?.src ?? "/images/hero-hanoi.jpg";

                return (
                  <div
                    key={`${item.slug}-${offset}`}
                    className={`transition-all duration-500 ease-out select-none ${
                      isCenter
                        ? "w-full max-w-[380px] sm:max-w-[420px] scale-100 z-10 opacity-100"
                        : "hidden md:block md:w-[240px] lg:w-[280px] scale-90 opacity-60 hover:opacity-85 pointer-events-none"
                    }`}
                  >
                    <div className="group flex flex-col rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl">
                      {/* Image with Tag Overlay */}
                      <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                        <Image
                          src={cardImg}
                          alt={item.name}
                          fill
                          sizes="420px"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                          <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                            {isEn ? "OPEN" : "ĐANG MỞ CỬA"}
                          </span>
                        </div>
                        <div className="absolute top-3.5 right-3.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white">
                            <Star className="size-3 fill-amber-400 text-amber-400" />
                            <span>4.9</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                            <Sparkles className="size-3.5" />
                            <span>Hà Nội</span>
                          </div>
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#103C34] group-hover:text-emerald-700 transition-colors line-clamp-1 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#526159] line-clamp-2 leading-relaxed font-light mb-4">
                            {item.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                            <MapPin className="size-3" />
                            <span>Thủ đô Hà Nội</span>
                          </span>
                          <Link
                            href={localePath(locale, `/destinations/${item.slug}`)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors group-hover:translate-x-1"
                          >
                            <span>{isEn ? "View details" : "Xem chi tiết"}</span>
                            <ArrowRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-0 sm:right-4 z-20 flex size-11 sm:size-12 items-center justify-center rounded-full bg-white border border-stone-200 shadow-xl text-[#103C34] hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {displayItems.slice(0, Math.min(displayItems.length, 6)).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex % Math.min(displayItems.length, 6)
                  ? "w-8 h-2.5 bg-[#103C34]"
                  : "w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA Button matching 00:12 */}
        <div className="text-center mt-10">
          <Link
            href={localePath(locale, "/destinations")}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-stone-300 bg-white px-7 text-xs sm:text-sm font-bold text-[#103C34] shadow-xs hover:border-[#103C34] hover:bg-[#FAF8F3] hover:shadow-md transition-all active:scale-95"
          >
            <span>{isEn ? "EXPLORE ALL DESTINATIONS →" : "XEM TẤT CẢ GỢI Ý →"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
