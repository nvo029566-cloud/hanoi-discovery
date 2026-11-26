"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Compass, Sparkles } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";

interface CurvedCtaBannerProps {
  locale?: Locale;
}

export function CurvedCtaBanner({ locale = "vi" }: CurvedCtaBannerProps) {
  const isEn = locale === "en";

  return (
    <section className="bg-white py-14 sm:py-20 text-white">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Curved Emerald & Gold Gradient Banner matching 00:17 */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0c3830] via-[#103C34] to-[#1e584d] p-8 sm:p-12 lg:p-16 shadow-2xl shadow-emerald-950/25 border border-emerald-400/20">
          {/* Ambient Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-amber-400/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-emerald-400/15 blur-3xl"
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-amber-200 border border-white/20 mb-5">
              <Sparkles className="size-3.5" />
              <span>{isEn ? "Start Your Journey Today" : "Bắt Đầu Ngay Hôm Nay"}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4 drop-shadow-md">
              {isEn
                ? "Start Your Own Millennial Journey."
                : "Bắt đầu hành trình của riêng bạn."}
            </h2>

            <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed mb-8 max-w-xl">
              {isEn
                ? "We are here to help you craft unforgettable memories across 1,000 years of Thang Long – Hanoi. Let our curated guides inspire every step."
                : "Chúng tôi ở đây để giúp bạn tạo nên những chuyến đi di sản đáng nhớ nhất. Hãy để dữ liệu văn hóa chuẩn mực và công cụ thông minh đồng hành cùng bạn."}
            </p>

            {/* Dual Action Buttons matching 00:17 */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={localePath(locale, "/planner")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FAF8F3] hover:bg-white text-[#103C34] px-7 text-xs sm:text-sm font-bold shadow-lg shadow-black/20 transition-all hover:scale-102 active:scale-95"
              >
                <Calendar className="size-4 text-emerald-800" />
                <span>{isEn ? "Create Itinerary Now" : "Lập lịch trình ngay"}</span>
                <ArrowRight className="size-4 text-emerald-800" />
              </Link>

              <Link
                href={localePath(locale, "/map")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white px-6 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all active:scale-95"
              >
                <Compass className="size-4 text-amber-200" />
                <span>{isEn ? "Explore Heritage Map" : "Bản đồ tương tác"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
