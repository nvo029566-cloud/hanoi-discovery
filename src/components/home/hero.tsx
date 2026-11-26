"use client";

import { useState, useRef, type MouseEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  MapPin,
  Calendar,
  ArrowRight,
  Search,
  Sparkles,
  Compass,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { localePath, type Locale } from "@/i18n/locales";
import { VirtualTour360Modal } from "@/components/virtual-tour/tour-360-modal";

/** Props supporting future video background extensibility (Section 10) */
export interface HeroBackgroundProps {
  type?: "image" | "video";
  src?: string;
  poster?: string;
  alt?: string;
}

/** Hero form values mapped to what the planner understands (`days`, category slug in `interests`). */
const DURATION_DAYS: Record<string, number> = { half: 1, "1day": 1, "2days": 2, "3days": 3 };
const THEME_CATEGORY: Record<string, string> = {
  heritage: "history-heritage",
  food: "local-experiences",
  crafts: "local-experiences",
  night: "photography-spots",
};

interface HeroProps {
  locale?: Locale;
  background?: HeroBackgroundProps;
  /** Published destinations in the catalog; falls back to a placeholder figure when omitted. */
  destinationCount?: number;
}

export function Hero({
  locale = "vi",
  destinationCount,
  background = {
    type: "image",
    src: "/images/hero-turtle-tower-5k-left.jpg",
    alt: "Tháp Rùa hồ Hoàn Kiếm Hà Nội",
  },
}: HeroProps) {
  const router = useRouter();
  const isEn = locale === "en";
  const reduce = useReducedMotion();
  const [tour360Open, setTour360Open] = useState(false);

  // Form State for quick search & route planning
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("1day");
  const [theme, setTheme] = useState("heritage");

  // Subtle interactive mouse parallax
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = destination.trim();
    // A typed destination is a search; otherwise the duration and theme build a planner itinerary.
    if (query) {
      router.push(localePath(locale, `/destinations?${new URLSearchParams({ q: query }).toString()}`));
      return;
    }
    const params = new URLSearchParams({
      days: String(DURATION_DAYS[duration] ?? 1),
      interests: THEME_CATEGORY[theme] ?? "history-heritage",
    });
    router.push(localePath(locale, `/planner?${params.toString()}`));
  };

  const scrollToHeritage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("heritage-stats");
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      data-header-theme="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-labelledby="hero-title"
      className="relative flex min-h-[92svh] lg:min-h-[96svh] flex-col justify-between overflow-hidden bg-[#071f1c] px-4 pb-8 pt-24 text-white sm:pt-28 md:px-8 md:pb-10 lg:pt-32"
    >
      {/* Background Photography / Video layer (Master Framing - Section 4) */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: mouseOffset.x * -6,
          y: mouseOffset.y * -4,
          scale: 1.02,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 70 }}
        className="absolute inset-0 z-0"
      >
        {background.type === "video" && background.src ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={background.poster ?? "/images/hero-turtle-tower-5k-left.jpg"}
            className="hero-photo-cover size-full"
          >
            <source src={background.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={background.src ?? "/images/hero-turtle-tower-5k-left.jpg"}
            alt={background.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="hero-photo-cover size-full brightness-[1.01] contrast-[1.02]"
            aria-hidden="true"
          />
        )}

        {/* Master Prompt Section 4.4: Natural Vertical Overlay Gradient */}
        <div className="hero-editorial-overlay pointer-events-none absolute inset-0 z-1" />
        <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-[#071f1c] via-transparent to-transparent" />
      </motion.div>

      {/* CENTERED EDITORIAL HERO CONTAINER (Sections 3, 5, 8, 9, 10) */}
      <div className="relative z-10 mx-auto w-full max-w-5xl my-auto flex flex-col items-center text-center px-4">
        <div className="flex flex-col items-center text-center max-w-4xl animate-fade-in">
          {/* Eyebrow: Minimalist cultural hallmark (Section 6) */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#081B15]/85 border border-[#E8C77B]/40 shadow-md backdrop-blur-md mb-4 sm:mb-5">
            <span className="size-1.5 rounded-full bg-[#E8C77B] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.22em] text-[#E8C77B] uppercase whitespace-nowrap">
              {isEn ? "MILLENNIAL CAPITAL · VIETNAM" : "THỦ ĐÔ NGHÌN NĂM VĂN HIẾN"}
            </span>
            <span className="size-1.5 rounded-full bg-[#E8C77B] animate-pulse" />
          </div>

          {/* Grand Main Heading: Editorial Serif Typography (Sections 5.1, 5.2, 5.3) */}
          <h1
            id="hero-title"
            className="font-serif text-[44px] sm:text-6xl lg:text-[76px] font-bold leading-[1.08] text-white tracking-[-0.025em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
          >
            <span className="block">{isEn ? "Feel The Soul of Hanoi." : "Cảm Nhận Hà Nội."}</span>
            <span className="block font-serif italic text-[30px] sm:text-4xl lg:text-[52px] text-[#F7D78A] font-normal leading-[1.2] mt-2 sm:mt-3 drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]">
              {isEn ? "Living with millennial heritage." : "Sống cùng dòng chảy di sản."}
            </span>
          </h1>

          {/* Editorial Description: Balanced cultural message (Section 5.5) */}
          <p className="mt-4 sm:mt-5 max-w-[680px] text-base sm:text-lg font-normal leading-[1.75] text-[#FAF9F5] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            {isEn
              ? "Discover the cultural beauty, rich history, and timeless stories that define Vietnam's thousand-year-old capital."
              : "Khám phá vẻ đẹp văn hóa, lịch sử và những câu chuyện làm nên bản sắc của thủ đô nghìn năm văn hiến."}
          </p>

          {/* Three CTA Buttons with Clear Hierarchy (Section 8) */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Primary CTA: Bắt đầu hành trình */}
            <Link
              href={localePath(locale, "/destinations")}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4A64B] hover:bg-[#E8C77B] px-7 text-sm font-semibold text-[#142E27] shadow-xl shadow-black/30 transition-all duration-200 active:scale-95"
            >
              <span>{isEn ? "Start Your Journey" : "Bắt đầu hành trình"}</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA: Khám phá Tour 360° VR */}
            <button
              type="button"
              onClick={() => setTour360Open(true)}
              className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#E8C77B]/45 bg-[#0A261E]/85 hover:bg-[#12362C] px-6 text-sm font-semibold text-[#F5F1E8] shadow-lg backdrop-blur-md transition-all duration-200 active:scale-95"
            >
              <Compass className="size-4 text-[#E8C77B] transition-transform duration-300 group-hover:rotate-45" />
              <span>{isEn ? "Virtual Tour 360°" : "Khám phá Tour 360°"}</span>
              <span className="rounded-full bg-[#E8C77B]/25 border border-[#E8C77B]/50 px-2 py-0.5 text-[10px] font-bold text-[#E8C77B]">
                360°
              </span>
            </button>

            {/* Tertiary CTA: Lập lịch trình */}
            <Link
              href={localePath(locale, "/planner")}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-[#0A261E]/75 hover:bg-[#12362C] px-5 text-sm font-medium text-[#F5F1E8] shadow-lg backdrop-blur-md transition-all duration-200 active:scale-95"
            >
              <Calendar className="size-4 text-[#E8C77B]" />
              <span>{isEn ? "Make Your Trip" : "Lập lịch trình"}</span>
            </Link>
          </div>
        </div>

        {/* HERO SEARCH BAR: Natural Ivory Background (Section 9) */}
        <div className="mt-8 sm:mt-10 w-full max-w-[940px] animate-fade-in">
          <form
            onSubmit={handleSearchSubmit}
            className="rounded-2xl sm:rounded-full bg-[#FAF9F5] p-2 sm:p-2.5 text-left text-[#1D3C34] shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-[rgba(29,60,52,0.08)]"
          >
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-12 sm:items-center">
              {/* Field 1: Destination */}
              <div className="sm:col-span-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-l-full hover:bg-[#E9EDE6]/50 transition-colors border-b sm:border-b-0 sm:border-r border-[#DCD8CB]">
                <label
                  htmlFor="hero-dest"
                  className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1D3C34]"
                >
                  <MapPin className="size-3.5 text-[#987022]" />
                  <span>{isEn ? "DESTINATION" : "ĐIỂM ĐẾN"}</span>
                </label>
                <input
                  id="hero-dest"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={isEn ? "Where would you like to explore?" : "Bạn muốn đi đâu?"}
                  className="mt-0.5 w-full bg-transparent text-sm font-semibold text-[#1D3C34] placeholder:text-[#8A968F] focus:outline-none"
                />
              </div>

              {/* Field 2: Duration */}
              <div className="sm:col-span-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-[#E9EDE6]/50 transition-colors border-b sm:border-b-0 sm:border-r border-[#DCD8CB]">
                <label
                  htmlFor="hero-duration"
                  className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1D3C34]"
                >
                  <Calendar className="size-3.5 text-[#987022]" />
                  <span>{isEn ? "DURATION" : "THỜI GIAN"}</span>
                </label>
                <select
                  id="hero-duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-0.5 w-full bg-transparent text-sm font-semibold text-[#1D3C34] focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:text-[#1D3C34]"
                >
                  <option value="half">{isEn ? "Half-day (4 hours)" : "Nửa ngày (4 tiếng)"}</option>
                  <option value="1day">{isEn ? "1 Full Day (Highlights)" : "1 Ngày di sản (Tinh hoa)"}</option>
                  <option value="2days">{isEn ? "2 Days (Recommended)" : "2 Ngày 1 đêm (Lý tưởng)"}</option>
                  <option value="3days">{isEn ? "3 Days (Full Exp)" : "3 Ngày (Trọn vẹn)"}</option>
                </select>
              </div>

              {/* Field 3: Theme */}
              <div className="sm:col-span-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-[#E9EDE6]/50 transition-colors">
                <label
                  htmlFor="hero-theme"
                  className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1D3C34]"
                >
                  <Sparkles className="size-3.5 text-[#987022]" />
                  <span>{isEn ? "THEME" : "CHỦ ĐỀ"}</span>
                </label>
                <select
                  id="hero-theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="mt-0.5 w-full bg-transparent text-sm font-semibold text-[#1D3C34] focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:text-[#1D3C34]"
                >
                  <option value="heritage">{isEn ? "History & Relics" : "Di tích & Lịch sử"}</option>
                  <option value="food">{isEn ? "Old Quarter Food" : "Ẩm thực phố cổ"}</option>
                  <option value="crafts">{isEn ? "Artisan Craft Guilds" : "Làng nghề truyền thống"}</option>
                  <option value="night">{isEn ? "Night Tours" : "Tour đêm & Phố đi bộ"}</option>
                </select>
              </div>

              {/* Submit Action Button (Heritage Green, no glow, white icon - Section 9.4) */}
              <div className="sm:col-span-1 flex items-center justify-center p-1">
                <button
                  type="submit"
                  aria-label={isEn ? "Search and plan route" : "Tìm kiếm và lập lịch trình"}
                  className="flex size-11 sm:size-12 items-center justify-center rounded-full bg-[#1D3C34] hover:bg-[#35554B] text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Search className="size-5 font-bold" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* HERO STATS HIGHLIGHTS ROW: Authentic Data & Clean Dividers (Section 10) */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-center max-w-[850px] w-full">
          <div className="flex-1 min-w-[120px]">
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#E8C77B] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              1010+
            </div>
            <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#F5F1E8]/85 mt-0.5">
              {isEn ? "YEARS OF HERITAGE" : "NĂM VĂN HIẾN"}
            </div>
          </div>
          <div className="h-7 w-px bg-white/20 hidden sm:block" />
          <div className="flex-1 min-w-[120px]">
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#E8C77B] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              36
            </div>
            <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#F5F1E8]/85 mt-0.5">
              {isEn ? "GUILD STREETS" : "PHỐ PHƯỜNG"}
            </div>
          </div>
          <div className="h-7 w-px bg-white/20 hidden sm:block" />
          <div className="flex-1 min-w-[120px]">
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#E8C77B] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {destinationCount ?? 26}
            </div>
            <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#F5F1E8]/85 mt-0.5">
              {isEn ? "DESTINATIONS" : "ĐIỂM ĐẾN KHÁM PHÁ"}
            </div>
          </div>
          <div className="h-7 w-px bg-white/20 hidden sm:block" />
          <div className="flex-1 min-w-[120px]">
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#E8C77B] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              360°
            </div>
            <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#F5F1E8]/85 mt-0.5">
              {isEn ? "VIRTUAL DISCOVERY" : "KHÁM PHÁ ẢO"}
            </div>
          </div>
        </div>

        {/* Minimal Scroll Prompt with Sticky Offset (Section 13) */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <a
            href="#heritage-stats"
            onClick={scrollToHeritage}
            className="group inline-flex items-center gap-2 text-xs font-medium text-[#F5F1E8]/85 hover:text-[#E8C77B] transition-colors cursor-pointer select-none"
          >
            <span>{isEn ? "Discover Hanoi" : "Khám phá Hà Nội"}</span>
            <ChevronDown
              className="size-3.5 transition-transform duration-200 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* 360 Virtual Tour Modal */}
      <VirtualTour360Modal
        isOpen={tour360Open}
        onClose={() => setTour360Open(false)}
        locale={locale}
      />
    </section>
  );
}
