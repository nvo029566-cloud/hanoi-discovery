"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Sparkles } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import { localPhotos } from "@/lib/local-photos";
import type { Destination } from "@/types/content";

interface InteractiveDestinationRailProps {
  destinations: Destination[];
  locale?: Locale;
}

export function InteractiveDestinationRail({
  destinations,
  locale = "vi",
}: InteractiveDestinationRailProps) {
  const isEn = locale === "en";

  // Signature landmarks for the rail
  const railItems = destinations.slice(0, 5);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const activeSpot = railItems[selectedIndex] ?? railItems[0];

  if (!activeSpot) return null;

  const activeImage = localPhotos[activeSpot.slug]?.src ?? "/images/hero-hanoi.jpg";

  return (
    <section className="relative overflow-hidden bg-[#071f1c] text-white py-14 sm:py-20 lg:py-24">
      {/* Dynamic Background Image with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        <Image
          key={activeSpot.slug}
          src={activeImage}
          alt={activeSpot.name}
          fill
          priority
          sizes="100vw"
          className="size-full object-cover brightness-[0.72] contrast-[1.1] transition-all duration-700 ease-in-out"
        />
        {/* Dark Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041714]/95 via-[#041714]/75 via-45% to-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071f1c] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Active Destination Details matching 00:20 - 00:23 */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Status tag */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200 border border-white/20">
                {isEn ? "Featured Landmark" : "Điểm Đến Tiêu Biểu"}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 drop-shadow-md">
              {activeSpot.name}
            </h2>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200 font-medium mb-4 drop-shadow">
              <MapPin className="size-4 text-amber-300 shrink-0" />
              <span>Hà Nội, Việt Nam</span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed text-white/85 font-light mb-8 max-w-xl drop-shadow">
              {activeSpot.summary}
            </p>

            {/* Dual Action Buttons matching video */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href={localePath(locale, `/destinations/${activeSpot.slug}`)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-950/40 transition-all hover:scale-102 active:scale-95"
              >
                <span>{isEn ? "View Details" : "Xem Chi Tiết"}</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href={localePath(locale, `/planner?add=${activeSpot.slug}`)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 bg-black/35 hover:bg-black/55 px-6 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all active:scale-95"
              >
                <Calendar className="size-4 text-amber-300" />
                <span>{isEn ? "Add to Itinerary" : "Thêm vào lịch trình"}</span>
              </Link>
            </div>
          </div>

          {/* Right: Clickable Thumbnail Rail matching 00:20 - 00:24 */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-200/90 mb-1">
              {isEn ? "Quick Landmark Switcher" : "Chuyển điểm đến nhanh"}
            </p>

            {railItems.map((item, idx) => {
              const active = idx === selectedIndex;
              const thumbImage = localPhotos[item.slug]?.src ?? "/images/hero-hanoi.jpg";
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`group flex items-center gap-3.5 rounded-2xl p-2.5 text-left transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-white/20 border-2 border-amber-300 shadow-xl backdrop-blur-xl translate-x-2"
                      : "bg-black/30 border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-md"
                  }`}
                >
                  {/* Thumbnail Photo */}
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-stone-800">
                    <Image
                      src={thumbImage}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-sm font-bold truncate transition-colors ${
                      active ? "text-amber-200" : "text-white group-hover:text-amber-100"
                    }`}>
                      {item.name}
                    </h4>
                    <p className="text-xs text-white/70 truncate mt-0.5">
                      Thủ đô Hà Nội
                    </p>
                  </div>

                  {active && (
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-stone-950 mr-1 shadow-sm">
                      <Sparkles className="size-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
