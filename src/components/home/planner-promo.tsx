"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Compass, Sparkles, ArrowRight, Route, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/content";

const durations = [
  { days: 1, labelVi: "1 Ngày (Tinh hoa)", labelEn: "1 Day (Highlights)" },
  { days: 2, labelVi: "2 Ngày (Lý tưởng)", labelEn: "2 Days (Recommended)" },
  { days: 3, labelVi: "3 Ngày (Trọn vẹn)", labelEn: "3 Days (Full Experience)" },
] as const;

export function PlannerPromo({
  categories,
  locale = "vi",
}: {
  categories: Category[];
  locale?: Locale;
}) {
  const m = getMessages(locale);
  const isEn = locale === "en";
  const [days, setDays] = useState<number>(2);
  const [interests, setInterests] = useState<string[]>(["history-heritage", "food-drink"]);

  function toggle(slug: string) {
    setInterests((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  const params = new URLSearchParams({ days: String(days) });
  if (interests.length > 0) params.set("interests", interests.join(","));

  return (
    <section aria-labelledby="planner-title" className="relative overflow-hidden bg-[#071f1c] text-white py-16 md:py-24 border-t border-amber-500/20">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 size-96 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 size-96 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1280px] gap-12 px-4 md:px-6 lg:grid-cols-12 items-center">
        {/* Left Column: Heading & Value Prop */}
        <div className="lg:col-span-6">
          <SectionHeading
            id="planner-title"
            invert
            eyebrow={m.home.promoEyebrow}
            title={m.home.promoTitle}
            description={
              isEn
                ? "Our intelligent trip engine calculates real-world Haversine distances, estimates traffic duration, and arranges your morning, afternoon, and evening stops automatically."
                : "Hệ thống thuật toán du lịch thông minh tự động tính toán khoảng cách tọa độ Haversine, dự toán thời gian di chuyển và sắp xếp các chặng sáng - chiều - tối tối ưu nhất."
            }
          />

          <div className="mt-8 space-y-3 text-xs md:text-sm text-white/80">
            <div className="flex items-center gap-2.5">
              <span className="flex size-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-300 shrink-0">
                <Route className="size-3.5" />
              </span>
              <span>
                {isEn
                  ? "Automatic route clustering to minimize travel fatigue"
                  : "Tự động phân nhóm địa danh gần nhau, hạn chế tắc đường"}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 shrink-0">
                <Compass className="size-3.5" />
              </span>
              <span>
                {isEn
                  ? "Interactive GIS map view with 1-click Google Maps turn-by-turn navigation"
                  : "Bản đồ số định vị GPS và chỉ đường vệ tinh Google Maps trực tiếp"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Trip Configurator Box */}
        <div className="lg:col-span-6">
          <div className="rounded-[24px] border border-amber-400/30 bg-black/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="size-4" />
              <span>{isEn ? "Smart Itinerary Builder" : "Trình Lập Kế Hoạch Thông Minh"}</span>
            </div>

            {/* Days Selection */}
            <fieldset>
              <legend className="mb-3 text-xs font-semibold text-white/90">
                {isEn ? "1. Select your stay duration:" : "1. Chọn thời gian lưu trú tại Hà Nội:"}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {durations.map((d) => (
                  <button
                    key={d.days}
                    type="button"
                    aria-pressed={days === d.days}
                    onClick={() => setDays(d.days)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all text-center",
                      days === d.days
                        ? "border-amber-400 bg-amber-400 text-stone-900 shadow-md font-bold"
                        : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/30",
                    )}
                  >
                    {isEn ? d.labelEn : d.labelVi}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Interests Selection */}
            <fieldset className="mt-6">
              <legend className="mb-3 text-xs font-semibold text-white/90">
                {isEn ? "2. Pick your travel passions:" : "2. Chọn sở thích trải nghiệm của bạn:"}
              </legend>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const active = interests.includes(c.slug);
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggle(c.slug)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                        active
                          ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"
                          : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10",
                      )}
                    >
                      {active && <Check className="size-3 text-emerald-300" />}
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Action CTA */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                href={`${localePath(locale, "/planner")}?${params.toString()}`}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs sm:text-sm font-bold text-stone-900 shadow-xl transition-all hover:bg-amber-300 hover:scale-[1.01]"
              >
                <Calendar className="size-4" />
                <span>{m.home.promoCta}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
