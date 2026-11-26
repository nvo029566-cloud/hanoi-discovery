"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import { localPhotos } from "@/lib/local-photos";
import type { Destination } from "@/types/content";
import { ThreeDCard } from "@/components/ui/three-d-card";

interface TopTrendingGridProps {
  destinations: Destination[];
  locale?: Locale;
}

export function TopTrendingGrid({ destinations, locale = "vi" }: TopTrendingGridProps) {
  const isEn = locale === "en";

  // Pick top 4 famous landmarks for TOP 1, TOP 2, TOP 3, TOP 4
  const top4 = destinations.slice(0, 4);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 text-[#1c2421]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header matching 00:26 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-2">
            {isEn ? "DISCOVERY EXPEDITION" : "HÀNH TRÌNH KHÁM PHÁ"}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#103C34]">
            {isEn ? "Top Trending Sanctuaries" : "TOP ĐỊA ĐIỂM THỊNH HÀNH"}
          </h2>
        </div>

        {/* 4 Cards Grid with TOP 1, TOP 2, TOP 3, TOP 4 Badges matching 00:27 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {top4.map((item, idx) => {
            const rank = idx + 1;
            const imgSrc = localPhotos[item.slug]?.src ?? "/images/hero-hanoi.jpg";
            return (
              <ThreeDCard key={item.slug} maxRotate={6} scale={1.03} className="h-full rounded-3xl">
                <Link
                  href={localePath(locale, `/destinations/${item.slug}`)}
                  className="group relative flex flex-col justify-end aspect-[3/4] overflow-hidden rounded-3xl border border-stone-200/80 shadow-lg transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Full Card Image */}
                  <Image
                    src={imgSrc}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/95" />

                  {/* TOP Rank Badge in Top-Left matching video */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-3 py-1 text-xs font-black text-stone-950 shadow-md tracking-wider">
                      TOP {rank}
                    </span>
                  </div>

                  {/* Rating in Top-Right */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-white border border-white/20">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="relative z-10 p-5">
                    <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-1 block">
                      Hà Nội, Việt Nam
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-white/75 line-clamp-1 mt-1 font-light">
                      {item.summary}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-300 group-hover:translate-x-1.5 transition-transform duration-200">
                      <span>{isEn ? "Discover now" : "Khám phá ngay"}</span>
                      <ArrowRight className="size-3.5" />
                    </div>
                  </div>
                </Link>
              </ThreeDCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
