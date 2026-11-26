"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";

interface HeritageStatsSectionProps {
  locale?: Locale;
  /** Published items behind each pillar, shown as a small badge. Omitted values hide the badge. */
  counts?: { history?: number; oldQuarter?: number; heritage?: number; cuisine?: number };
}

/** 01: Đình Làng / Cổng Thành Thăng Long cổ kính */
function IconTemple({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top peak */}
      <path d="M48 10 L50 8 L52 10" />
      {/* Upper tier roof */}
      <path d="M30 20 L50 14 L70 20" />
      <line x1="30" y1="20" x2="33" y2="28" />
      <line x1="70" y1="20" x2="67" y2="28" />
      <line x1="33" y1="28" x2="67" y2="28" />
      {/* Lower main roof */}
      <path d="M18 36 L50 28 L82 36" />
      <line x1="16" y1="36" x2="84" y2="36" />
      {/* Columns and openings */}
      <line x1="24" y1="36" x2="24" y2="64" />
      <line x1="41" y1="36" x2="41" y2="64" />
      <line x1="59" y1="36" x2="59" y2="64" />
      <line x1="76" y1="36" x2="76" y2="64" />
      {/* Base steps */}
      <line x1="18" y1="64" x2="82" y2="64" />
      <line x1="14" y1="68" x2="86" y2="68" />
    </svg>
  );
}

/** 02: Nhà Ống Phố Cổ Hà Nội */
function IconOldQuarter({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Left townhouse pitched roof */}
      <path d="M22 28 L46 16 L46 68" />
      {/* Right townhouse box */}
      <path d="M46 16 L76 16 L76 68" />
      {/* Left townhouse facade */}
      <line x1="22" y1="28" x2="22" y2="68" />
      {/* Left townhouse windows */}
      <rect x="27" y="34" width="14" height="12" />
      <rect x="27" y="52" width="14" height="16" />
      {/* Right townhouse grid windows (2x2) */}
      <rect x="52" y="24" width="18" height="18" />
      <line x1="61" y1="24" x2="61" y2="42" />
      <line x1="52" y1="33" x2="70" y2="33" />
      <rect x="52" y="48" width="18" height="20" />
      <line x1="61" y1="48" x2="61" y2="68" />
      <line x1="52" y1="58" x2="70" y2="58" />
      {/* Ground foundation */}
      <line x1="16" y1="68" x2="84" y2="68" />
    </svg>
  );
}

/** 03: Khuê Văn Các với Cửa Sổ Tròn Sao Khuê */
function IconKhueVanCac({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top peak */}
      <path d="M45 14 L50 9 L55 14" />
      {/* Upper roof */}
      <path d="M26 24 L50 18 L74 24" />
      <line x1="23" y1="24" x2="77" y2="24" />
      {/* Upper pavilion body */}
      <rect x="33" y="24" width="34" height="22" />
      {/* Circular window with cross inside */}
      <circle cx="50" cy="35" r="7" />
      <line x1="50" y1="28" x2="50" y2="42" />
      <line x1="43" y1="35" x2="57" y2="35" />
      {/* Lower roof eave */}
      <path d="M18 46 L50 40 L82 46" />
      <line x1="14" y1="46" x2="86" y2="46" />
      {/* 4 Pillars */}
      <line x1="24" y1="46" x2="24" y2="68" />
      <line x1="41" y1="46" x2="41" y2="68" />
      <line x1="59" y1="46" x2="59" y2="68" />
      <line x1="76" y1="46" x2="76" y2="68" />
      {/* Foundation line */}
      <line x1="14" y1="68" x2="86" y2="68" />
    </svg>
  );
}

/** 04: Bát Phở / Ẩm Thực Kinh Kỳ */
function IconPho({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Wavy steam lines */}
      <path d="M40 14 Q44 20 40 26 Q36 32 40 38" />
      <path d="M52 10 Q56 18 52 26 Q48 34 52 38" />
      <path d="M64 12 Q68 20 64 28 Q60 34 64 38" />
      {/* Chopsticks */}
      <line x1="84" y1="18" x2="20" y2="44" strokeWidth="2" />
      <line x1="87" y1="22" x2="22" y2="47" strokeWidth="2" />
      {/* Bowl body */}
      <path d="M22 45 Q50 44 78 45" />
      <path d="M22 45 Q26 70 46 70 L54 70 Q74 70 78 45" />
      {/* Base ring */}
      <line x1="44" y1="74" x2="56" y2="74" strokeWidth="2" />
      <line x1="46" y1="70" x2="44" y2="74" />
      <line x1="54" y1="70" x2="56" y2="74" />
    </svg>
  );
}

export function HeritageStatsSection({ locale = "vi", counts }: HeritageStatsSectionProps) {
  const isEn = locale === "en";
  const reduce = useReducedMotion();

  const items = [
    {
      id: "history",
      num: "01",
      title: isEn ? "Historical Flow" : "Dòng chảy lịch sử",
      desc: isEn
        ? "From the ancient Thang Long citadel to the thousand-year-old capital."
        : "Từ kinh thành Thăng Long đến thủ đô nghìn năm tuổi.",
      count: counts?.history,
      unit: isEn ? "stories" : "bài viết",
      cta: isEn ? "Discover history" : "Khám phá lịch sử",
      href: "/culture",
      icon: IconTemple,
    },
    {
      id: "old-quarter",
      num: "02",
      title: isEn ? "Old Quarter Soul" : "Hồn cốt phố phường",
      desc: isEn
        ? "The way of life, artisan craft guilds, and timeless memories of ancient Ke Cho."
        : "Nếp sống, phố nghề và những ký ức đất Kẻ Chợ.",
      count: counts?.oldQuarter,
      unit: isEn ? "experiences" : "trải nghiệm",
      cta: isEn ? "Discover culture" : "Khám phá văn hóa",
      href: "/destinations?category=local-experiences",
      icon: IconOldQuarter,
    },
    {
      id: "heritage-land",
      num: "03",
      title: isEn ? "Land of Heritage" : "Miền đất di sản",
      desc: isEn
        ? "Monuments and landmarks preserving cultural footprints across generations."
        : "Những công trình lưu giữ dấu ấn qua nhiều thế hệ.",
      count: counts?.heritage,
      unit: isEn ? "landmarks" : "địa danh",
      cta: isEn ? "Discover heritage" : "Khám phá di sản",
      href: "/destinations",
      icon: IconKhueVanCac,
    },
    {
      id: "cuisine",
      num: "04",
      title: isEn ? "Flavors of the Capital" : "Hương vị kinh kỳ",
      desc: isEn
        ? "The quintessence of culinary arts captured in each humble, authentic flavor."
        : "Tinh hoa ẩm thực trong từng hương vị bình dị.",
      count: counts?.cuisine,
      unit: isEn ? "dishes" : "món ăn",
      cta: isEn ? "Discover cuisine" : "Khám phá ẩm thực",
      href: "/food",
      icon: IconPho,
    },
  ];

  return (
    <section
      id="heritage-stats"
      aria-labelledby="heritage-stats-title"
      className="relative scroll-mt-24 sm:scroll-mt-28 bg-[#FAF8F2] pt-14 sm:pt-16 lg:pt-20 pb-4 sm:pb-6 lg:pb-8"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Main Elegant Card Container */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-[#FAF8F2] border border-[#DCD8CB]/80 p-6 sm:p-10 lg:p-14 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          {/* Editorial Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            {/* Minimalist Gold Eyebrow */}
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#987022]/60 inline-block" />
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#987022] uppercase">
                {isEn ? "TIMELESS HERITAGE VALUES" : "NHỮNG GIÁ TRỊ VƯỢT THỜI GIAN"}
              </span>
              <span className="h-px w-8 bg-[#987022]/60 inline-block" />
            </div>

            {/* Main Title: Sửa hoàn toàn lỗi font của Ảnh 2 */}
            <h2
              id="heritage-stats-title"
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D3C34] tracking-tight leading-[1.2]"
            >
              {isEn ? "Hanoi Heritage Footprints" : "Dấu ấn di sản thủ đô"}
            </h2>

            {/* Subtitle */}
            <p className="mt-3.5 text-sm sm:text-base text-[#5A665F] font-light leading-relaxed">
              {isEn
                ? "Over a thousand years of history, four colors shaping Hanoi's authentic identity."
                : "Hơn một nghìn năm lịch sử, bốn sắc màu làm nên bản sắc Hà Nội."}
            </p>
          </div>

          {/* 4 Pillars Grid with Line-Art Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DCD8CB]/70">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col h-full"
                >
                  <Link
                    href={localePath(locale, item.href)}
                    className="group flex flex-col items-center text-center justify-between h-full py-8 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#F3EFE6]/40 cursor-pointer"
                  >
                    <div className="flex flex-col items-center w-full">
                      {/* Line Art Architectural Icon: Nâng lên 3px, scale 1.05, đổi từ vàng đồng sang xanh di sản */}
                      <div className="flex h-20 items-center justify-center text-[#B48A35] group-hover:text-[#1D3C34] group-hover:-translate-y-[3px] group-hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        <Icon className="h-16 w-auto transition-colors duration-300" />
                      </div>

                      {/* Numeric Indicator */}
                      <span className="font-serif text-xs sm:text-sm font-semibold tracking-widest text-[#8A6B32] mt-4 mb-2 transition-colors duration-300">
                        {item.num}
                      </span>

                      {/* Pillar Title: Chuyển nhẹ sang vàng đồng */}
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1D3C34] group-hover:text-[#B48A35] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        {item.title}
                      </h3>

                      {/* Short Description */}
                      <p className="mt-2.5 text-xs sm:text-[13px] text-[#5A665F] leading-relaxed font-light max-w-[240px]">
                        {item.desc}
                      </p>
                      {item.count ? (
                        <span className="mt-3 inline-flex items-center rounded-full border border-[#DCD8CB] bg-white/70 px-3 py-1 text-[11px] font-semibold text-[#6F5518]">
                          {item.count} {item.unit}
                        </span>
                      ) : null}
                    </div>

                    {/* Centered CTA Link: Gạch chân xuất hiện từ trái sang phải, Mũi tên dịch sang phải 5px */}
                    <div className="mt-6 pt-4 w-full flex justify-center">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#1D3C34] group-hover:text-[#987022] transition-colors duration-300">
                        <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#B48A35] group-hover:after:w-full after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]">
                          {item.cta}
                        </span>
                        <ArrowRight className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[5px]" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Philosophical Heritage Quote & Interactive Scroll-Down Trigger */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-[#DCD8CB]/60 text-center">
            <button
              type="button"
              onClick={() => {
                const trailEl = document.getElementById("heritage-trail");
                if (trailEl) {
                  trailEl.scrollIntoView({ behavior: "smooth" });
                }
              }}
              aria-label={
                isEn
                  ? "Scroll down to journey of discovery"
                  : "Cuộn xuống hành trình khám phá"
              }
              className="group/scroll inline-flex flex-col items-center cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B48A35] rounded-xl px-4 py-1.5 hover:bg-[#F3EFE6]/50 active:scale-98"
            >
              <p className="font-serif italic text-sm sm:text-base text-[#987022] group-hover/scroll:text-[#7A5B18] font-normal tracking-wide transition-colors duration-300">
                {isEn
                  ? "Every heritage is a story. Every step is a discovery."
                  : "Mỗi di sản là một câu chuyện. Mỗi bước chân là một khám phá."}
              </p>
              <div className="flex justify-center mt-2.5 text-[#987022] group-hover/scroll:text-[#7A5B18] group-hover/scroll:translate-y-1 transition-all duration-300">
                <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
