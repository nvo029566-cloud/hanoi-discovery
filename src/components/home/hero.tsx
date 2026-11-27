"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Calendar, ChevronDown, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/locales";

export function Hero({ locale = "vi" }: { locale?: Locale }) {
  const isEn = locale === "en";
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-[#071f1c] px-4 pt-24 pb-16 text-center text-white sm:px-6 sm:pt-28 lg:min-h-svh lg:pb-20 lg:text-left"
    >
      {/* 100% Static Photo Background: Khuê Văn Các - Biểu tượng nghìn năm văn hiến (Ultra 5K) */}
      <div aria-hidden="true" className="home-hero-media absolute inset-0 -z-20">
        <Image
          src="/images/hero-khue-van-cac-5k.jpg"
          alt={isEn ? "Khue Van Cac, Temple of Literature, Hanoi" : "Khuê Văn Các, Văn Miếu - Quốc Tử Giám, Hà Nội"}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[20%_center] lg:object-[18%_center]"
        />
      </div>
      <div aria-hidden="true" className="home-hero-scrim pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-[1400px] my-auto lg:grid lg:grid-cols-[minmax(0,4.2fr)_minmax(0,5.8fr)] xl:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-center">
        <div className="mx-auto w-full max-w-lg sm:max-w-xl lg:col-start-2 lg:mx-0 lg:max-w-2xl xl:max-w-[760px] lg:pl-6 xl:pl-10">
          {/* 1. Kicker: Đường kẻ vàng mở rộng + Chữ trượt nhẹ khi load trang */}
          <p className="mb-3 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7D78A] sm:text-xs">
            <motion.span
              aria-hidden="true"
              className="h-px w-6 bg-[#F7D78A]/80 lg:w-9"
              style={{ transformOrigin: "left center" }}
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.85 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            />
            <motion.span
              className="inline-block"
              initial={reduce ? false : { x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            >
              {isEn ? "Vietnam’s capital" : "Thủ đô nghìn năm văn hiến"}
            </motion.span>
            <span aria-hidden="true" className="h-px w-6 bg-[#F7D78A]/80 lg:hidden" />
          </p>

          {/* 2. Headline chính & Sub-headline cân đối theo từng dòng thơ mộng */}
          <h1 id="hero-title" className="font-serif drop-shadow-[0_3px_18px_rgba(0,0,0,0.75)]">
            <div className="overflow-hidden py-0.5">
              <motion.span
                className="block text-[clamp(2.1rem,3.8vw,3.6rem)] xl:text-[4rem] font-bold leading-[1.1] tracking-tight text-white"
                initial={reduce ? false : { y: "105%", opacity: 0.15 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              >
                {isEn ? "Feel the Soul of Hanoi." : "Cảm nhận Hà Nội."}
              </motion.span>
            </div>
            <div className="overflow-hidden pt-0.5">
              <motion.span
                className="hero-subheadline-flow mt-1 block text-[clamp(1.25rem,2.1vw,1.95rem)] xl:text-[2.15rem] font-normal italic leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                initial={reduce ? false : { y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              >
                {isEn ? "Discover its living heritage." : "Sống cùng dòng chảy di sản."}
              </motion.span>
            </div>
          </h1>

          {/* 3. Mô tả ngắn: Tỷ lệ dòng chuẩn tối ưu mắt đọc */}
          <motion.p
            className="mx-auto mt-3.5 max-w-lg text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:text-base lg:text-[16px] lg:mx-0 lg:max-w-xl"
            initial={reduce ? false : { y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.32 }}
          >
            {isEn
              ? "Find historic landmarks, local food and walks through Hanoi’s Old Quarter."
              : "Khám phá di tích, món ngon và những góc phố Hà Nội."}
          </motion.p>

          {/* 4. Cụm nút CTA: Bố cục nút cân bằng, độ tương phản cao */}
          <div className="mt-5 flex flex-wrap justify-center gap-3 sm:gap-3.5 lg:justify-start">
            <motion.div
              initial={reduce ? false : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            >
              <Link
                href={localePath(locale, "/destinations")}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E8C77B] px-5 sm:px-6 text-sm font-semibold text-[#142E27] shadow-[0_4px_16px_rgba(232,199,123,0.35)] transition-all hover:bg-[#F7D78A] hover:shadow-[0_6px_22px_rgba(232,199,123,0.5)] hover:-translate-y-0.5"
              >
                {isEn ? "Explore destinations" : "Khám phá điểm đến"}
                <ArrowRight className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
            <motion.div
              initial={reduce ? false : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
            >
              <Link
                href={localePath(locale, "/planner")}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/45 bg-[#071f1c]/75 backdrop-blur-md px-5 sm:px-6 text-sm font-semibold text-white/95 shadow-sm transition-all hover:border-[#E8C77B] hover:bg-[#173D33]/90 hover:text-[#F7D78A] hover:-translate-y-0.5"
              >
                <Calendar className="size-4 text-[#F7D78A]" aria-hidden="true" />
                {isEn ? "Plan a trip" : "Lập lịch trình"}
              </Link>
            </motion.div>
          </div>

          {/* 5. Thanh tìm kiếm: Tỉ lệ cân đối, viền vàng nhạt sang trọng */}
          <motion.form
            action={localePath(locale, "/destinations")}
            method="get"
            role="search"
            aria-label={isEn ? "Find a place" : "Tìm địa danh"}
            initial={reduce ? false : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.54 }}
            className="mx-auto mt-5 flex w-full max-w-md sm:max-w-lg lg:max-w-[490px] items-center gap-2 rounded-full border border-[#E8C77B]/40 bg-[#FAF9F5]/98 backdrop-blur-md p-1.5 text-[#1D3C34] shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all focus-within:border-[#E8C77B] focus-within:ring-2 focus-within:ring-[#E8C77B]/50 sm:mt-6 lg:mx-0"
          >
            <label htmlFor="hero-dest" className="sr-only">{isEn ? "Destination name" : "Tên địa danh"}</label>
            <input
              id="hero-dest"
              name="q"
              type="search"
              placeholder={isEn ? "Try Hoan Kiem Lake, Temple of Literature..." : "Ví dụ: Hồ Hoàn Kiếm, Văn Miếu..."}
              className="min-h-11 min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm sm:text-base outline-none placeholder:text-[#64746B]"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#1D3C34] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#284E43]"
            >
              <Search className="size-4" aria-hidden="true" />
              {isEn ? "Search" : "Tìm"}
            </button>
          </motion.form>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="mt-5 flex justify-center lg:absolute lg:inset-x-0 lg:bottom-6 lg:mx-auto lg:grid lg:w-[calc(100%_-_5rem)] lg:max-w-[1320px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={localePath(locale, "/destinations/van-mieu-quoc-tu-giam")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-[#071f1c]/75 px-4 text-xs font-semibold text-white/90 transition-colors hover:border-[#E8C77B]"
          >
            <MapPin className="size-4 text-[#F7D78A]" aria-hidden="true" />
            {isEn ? "Khue Van Cac · Temple of Literature" : "Khuê Văn Các · Văn Miếu"}
          </Link>
        </div>
        <a href="#heritage-stats" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold text-white/90 transition-colors hover:text-[#F7D78A] lg:col-start-2">
          {isEn ? "Explore Hanoi’s heritage" : "Khám phá di sản Hà Nội"}
          <ChevronDown className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-y-1" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
