"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Bookmark, ChevronDown, Clock, Share2, Ticket } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import type { Destination } from "@/types/content";

interface HeritageTrailShowcaseProps {
  locale?: Locale;
  /** Catalog destinations; opening hours and ticket info are shown for stops found here. */
  destinations?: Destination[];
}

interface TrailStop {
  id: string;
  stepNumber: string;
  stepNumberEn: string;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  descVi: string;
  descEn: string;
  image: string;
  captionVi: string;
  captionEn: string;
  linkTextVi: string;
  linkTextEn: string;
  href: string;
  reverse: boolean;
}

interface TrailConnectorProps {
  id: string;
  reverse: boolean;
}

/**
 * Scroll-driven progressive dotted trail connector.
 * Draws the active golden trail forward based on scroll position,
 * activates the center marker node with a smooth transition from neutral to heritage gold,
 * and rolls back bidirectionally when the user scrolls upwards without any scroll-locking.
 */
function TrailConnector({ id, reverse }: TrailConnectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 82%", "end 32%"],
  });

  const pathD = reverse
    ? "M 380 6 C 300 12, 280 32, 210 32 C 140 32, 120 52, 40 58"
    : "M 40 6 C 120 12, 140 32, 210 32 C 280 32, 300 52, 380 58";

  const startDot = reverse ? { x: 380, y: 6 } : { x: 40, y: 6 };
  const endDot = reverse ? { x: 40, y: 58 } : { x: 380, y: 58 };

  // Progressive dot activations
  const startDotFill = useTransform(
    scrollYProgress,
    [0, 0.12],
    ["#D5C6A8", "#B48A35"]
  );
  const endDotFill = useTransform(
    scrollYProgress,
    [0.85, 1],
    ["#D5C6A8", "#B48A35"]
  );

  // Marker node transitions from neutral to heritage gold
  const markerBorder = useTransform(
    scrollYProgress,
    [0.42, 0.54],
    ["#D5C6A8", "#B48A35"]
  );
  const markerColor = useTransform(
    scrollYProgress,
    [0.42, 0.54],
    ["#9E9484", "#B48A35"]
  );
  const markerScale = useTransform(
    scrollYProgress,
    [0.4, 0.52, 0.65],
    [1, 1.15, 1.05]
  );
  const markerShadow = useTransform(
    scrollYProgress,
    [0.42, 0.54],
    [
      "0 1px 2px rgba(0,0,0,0.04)",
      "0 0 16px rgba(180, 138, 53, 0.35), 0 2px 6px rgba(180, 138, 53, 0.15)"
    ]
  );

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="relative my-8 sm:my-10 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <div className="hidden sm:block w-full max-w-[420px] h-16 relative">
          <svg
            className="w-full h-full text-[#C8B896] overflow-visible"
            viewBox="0 0 420 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={startDot.x} cy={startDot.y} r="3.5" fill="#B48A35" />
            <path
              d={pathD}
              stroke="#B48A35"
              strokeWidth="2"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
            <circle cx={endDot.x} cy={endDot.y} r="3.5" fill="#B48A35" />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-7 rounded-full border border-[#B48A35] bg-[#FAF8F2] shadow-xs flex items-center justify-center text-[#B48A35]">
            <ChevronDown className="size-3.5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative my-8 sm:my-10 flex flex-col items-center justify-center pointer-events-none select-none"
    >
      {/* Desktop S-Curve SVG */}
      <div className="hidden sm:block w-full max-w-[420px] h-16 relative">
        <svg
          className="w-full h-full text-[#C8B896] overflow-visible"
          viewBox="0 0 420 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id={`trail-mask-desktop-${id}`}>
              <motion.path
                d={pathD}
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
            </mask>
          </defs>

          {/* Start Dot */}
          <motion.circle
            cx={startDot.x}
            cy={startDot.y}
            r="3.5"
            style={{ fill: startDotFill }}
          />

          {/* Neutral Inactive Dotted Path */}
          <path
            d={pathD}
            stroke="#E0D7C5"
            strokeWidth="1.75"
            strokeDasharray="4 5"
            strokeLinecap="round"
            opacity={0.8}
          />

          {/* Active Golden Dotted Path Revealed Progressively as User Scrolls */}
          <path
            d={pathD}
            stroke="#B48A35"
            strokeWidth="2.2"
            strokeDasharray="4 5"
            strokeLinecap="round"
            mask={`url(#trail-mask-desktop-${id})`}
          />

          {/* End Dot */}
          <motion.circle
            cx={endDot.x}
            cy={endDot.y}
            r="3.5"
            style={{ fill: endDotFill }}
          />
        </svg>

        {/* Center Circular Marker: Transitions from neutral to gold with soft glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-7 rounded-full bg-[#FAF8F2] flex items-center justify-center transition-colors duration-300"
          style={{
            borderColor: markerBorder,
            borderWidth: "1.5px",
            borderStyle: "solid",
            color: markerColor,
            scale: markerScale,
            boxShadow: markerShadow,
          }}
        >
          <ChevronDown className="size-3.5" />
        </motion.div>
      </div>

      {/* Mobile Vertical SVG Connector */}
      <div className="sm:hidden relative w-8 h-20 flex items-center justify-center">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 32 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id={`trail-mask-mobile-${id}`}>
              <motion.path
                d="M 16 4 L 16 76"
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
            </mask>
          </defs>

          {/* Mobile Start Dot */}
          <motion.circle cx="16" cy="4" r="3" style={{ fill: startDotFill }} />

          {/* Neutral Track */}
          <path
            d="M 16 4 L 16 76"
            stroke="#E0D7C5"
            strokeWidth="1.75"
            strokeDasharray="4 5"
            strokeLinecap="round"
          />

          {/* Active Gold Line */}
          <path
            d="M 16 4 L 16 76"
            stroke="#B48A35"
            strokeWidth="2.2"
            strokeDasharray="4 5"
            strokeLinecap="round"
            mask={`url(#trail-mask-mobile-${id})`}
          />

          {/* Mobile End Dot */}
          <motion.circle cx="16" cy="76" r="3" style={{ fill: endDotFill }} />
        </svg>

        {/* Mobile Center Circular Marker */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-6 rounded-full bg-[#FAF8F2] flex items-center justify-center transition-colors duration-300"
          style={{
            borderColor: markerBorder,
            borderWidth: "1.5px",
            borderStyle: "solid",
            color: markerColor,
            scale: markerScale,
            boxShadow: markerShadow,
          }}
        >
          <ChevronDown className="size-3" />
        </motion.div>
      </div>
    </div>
  );
}

export function HeritageTrailShowcase({ locale = "vi", destinations = [] }: HeritageTrailShowcaseProps) {
  const isEn = locale === "en";
  const reduceMotion = useReducedMotion();
  const [savedStops, setSavedStops] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedStops((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async (id: string, title: string, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}${localePath(locale, href)}` : href;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {
        // fallback
      }
    }
  };

  const stops: TrailStop[] = [
    {
      id: "hoan-kiem",
      stepNumber: "ĐIỂM DỪNG 01",
      stepNumberEn: "STOP 01",
      titleVi: "Trái tim của thủ đô",
      titleEn: "Heart of the Capital",
      subtitleVi: "Hồ Hoàn Kiếm & Tháp Rùa",
      subtitleEn: "Hoan Kiem Lake & Turtle Tower",
      descVi:
        "Bắt đầu hành trình tại nơi lưu giữ truyền thuyết trả gươm và nhịp sống bình dị của người Hà Nội.",
      descEn:
        "Begin your journey where the legend of the restored sword lives on amidst the serene rhythm of Hanoi life.",
      image: "/images/trail-hoan-kiem-sunset.jpg",
      captionVi: "Hồ Hoàn Kiếm, Hà Nội",
      captionEn: "Hoan Kiem Lake, Hanoi",
      linkTextVi: "Khám phá địa danh",
      linkTextEn: "Explore destination",
      href: "/destinations/hoan-kiem-lake",
      reverse: false,
    },
    {
      id: "old-quarter",
      stepNumber: "ĐIỂM DỪNG 02",
      stepNumberEn: "STOP 02",
      titleVi: "Lạc bước giữa phố xưa",
      titleEn: "Wandering the Ancient Streets",
      subtitleVi: "36 phố phường Hà Nội",
      subtitleEn: "36 Guild Streets of Hanoi",
      descVi:
        "Dạo qua những con phố nghề, những mái nhà cổ và khám phá nhịp sống của đất Kẻ Chợ.",
      descEn:
        "Stroll through artisanal craft streets, ancient tube houses, and discover the vibrant soul of historic Ke Cho.",
      image: "/images/trail-old-quarter-street.jpg",
      captionVi: "36 phố phường Hà Nội",
      captionEn: "Hanoi Old Quarter",
      linkTextVi: "Khám phá phố cổ",
      linkTextEn: "Explore Old Quarter",
      href: "/destinations/hanoi-old-quarter",
      reverse: true,
    },
    {
      id: "van-mieu",
      stepNumber: "ĐIỂM DỪNG 03",
      stepNumberEn: "STOP 03",
      titleVi: "Nơi lưu dấu đạo học",
      titleEn: "Cradle of Erudition",
      subtitleVi: "Văn Miếu – Quốc Tử Giám",
      subtitleEn: "Temple of Literature",
      descVi:
        "Tìm hiểu truyền thống hiếu học và những giá trị tri thức được gìn giữ qua nhiều thế hệ.",
      descEn:
        "Uncover Vietnam's thousand-year tradition of learning and scholarly heritage preserved through generations.",
      image: "/images/trail-khue-van-cac.jpg",
      captionVi: "Văn Miếu – Quốc Tử Giám, Hà Nội",
      captionEn: "Temple of Literature, Hanoi",
      linkTextVi: "Khám phá di sản",
      linkTextEn: "Explore heritage",
      href: "/destinations/temple-of-literature",
      reverse: false,
    },
  ];

  return (
    <section
      id="heritage-trail"
      className="relative overflow-hidden bg-[#FAF8F2] pt-2 sm:pt-4 lg:pt-6 pb-16 sm:pb-20 lg:pb-24 text-[#1C2D27] scroll-mt-20"
    >
      {/* Background Subtle Watermark/Noise Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] bg-[radial-gradient(#1D3C34_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          {/* Overline */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs sm:text-[13px] font-medium tracking-[0.25em] text-[#987022] uppercase">
              {isEn ? "— EVERY STEP, A STORY —" : "— MỖI BƯỚC CHÂN, MỘT CÂU CHUYỆN —"}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#1D3C34] leading-[1.2]">
            {isEn ? (
              <>
                <span className="block">Journey of Discovery</span>
                <span className="block font-serif italic font-normal text-[#B48A35] mt-0.5">
                  the heart of Hanoi.
                </span>
              </>
            ) : (
              <>
                <span className="block">Hành trình khám phá</span>
                <span className="block font-serif italic font-normal text-[#B48A35] mt-0.5">
                  trái tim Hà Nội.
                </span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5A6860] font-light max-w-xl mx-auto">
            {isEn
              ? "Follow historic paths, listen to timeless tales, and embrace the essence of the capital at every stop."
              : "Theo dấu những con đường, lắng nghe những câu chuyện và cảm nhận vẻ đẹp của thủ đô qua từng điểm dừng."}
          </p>
        </motion.div>

        {/* Trail Stops List (Stops 01 - 03) */}
        <div className="space-y-6 sm:space-y-8">
          {stops.map((stop, idx) => {
            const isSaved = !!savedStops[stop.id];
            const isCopied = copiedId === stop.id;
            const facts = destinations.find((d) => stop.href.endsWith(`/${d.slug}`));

            return (
              <div key={stop.id} className="relative">
                {/* Row Grid with Smooth Scroll Entrance */}
                <div
                  className={`grid items-center gap-6 sm:gap-10 lg:gap-14 lg:grid-cols-12 ${
                    stop.reverse ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Column */}
                  <motion.div
                    initial={
                      reduceMotion
                        ? { opacity: 1, x: 0, y: 0 }
                        : { opacity: 0, x: stop.reverse ? 24 : -24, y: 16 }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.22, margin: "-20px" }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`lg:col-span-6 ${
                      stop.reverse ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="group block">
                      <div className="relative aspect-[16/10] sm:aspect-[16/10.5] overflow-hidden rounded-[20px] border border-[#E4DDD0] bg-[#EBE5D9] shadow-lg shadow-[#1D3C34]/8 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-[#1D3C34]/12 hover:border-[#D5CBB9]">
                        <Image
                          src={stop.image}
                          alt={isEn ? stop.captionEn : stop.captionVi}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Top-Right Quick Action Badge (Share & Bookmark) */}
                        <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 inline-flex items-center gap-1 rounded-full bg-black/45 backdrop-blur-md px-2.5 py-1 text-white shadow-sm transition-all duration-200 hover:bg-black/60">
                          <button
                            type="button"
                            onClick={(e) =>
                              handleShare(
                                stop.id,
                                isEn ? stop.titleEn : stop.titleVi,
                                stop.href,
                                e
                              )
                            }
                            aria-label={isEn ? "Share destination" : "Chia sẻ địa danh"}
                            className="p-1 rounded-full text-white/90 hover:text-[#E5B34E] active:scale-90 transition-all"
                            title={isCopied ? (isEn ? "Link copied!" : "Đã sao chép link!") : (isEn ? "Share" : "Chia sẻ")}
                          >
                            <Share2 className="size-3.5" />
                          </button>
                          <span className="h-3 w-px bg-white/20" />
                          <button
                            type="button"
                            onClick={(e) => toggleSave(stop.id, e)}
                            aria-label={isEn ? "Bookmark destination" : "Lưu địa danh"}
                            className={`p-1 rounded-full active:scale-90 transition-all ${
                              isSaved ? "text-[#E5B34E]" : "text-white/90 hover:text-[#E5B34E]"
                            }`}
                            title={isSaved ? (isEn ? "Saved" : "Đã lưu") : (isEn ? "Save" : "Lưu")}
                          >
                            <Bookmark
                              className={`size-3.5 ${isSaved ? "fill-[#E5B34E]" : ""}`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Image Caption Underneath */}
                      <p className="mt-2.5 text-xs text-[#7A6C5D] font-medium tracking-wide pl-1">
                        {isEn ? stop.captionEn : stop.captionVi}
                        {isCopied && (
                          <span className="ml-2 font-semibold text-[#6F5518]">
                            · {isEn ? "Link copied" : "Đã sao chép liên kết"}
                          </span>
                        )}
                      </p>
                      <p role="status" aria-live="polite" className="sr-only">
                        {isCopied ? (isEn ? "Link copied" : "Đã sao chép liên kết") : ""}
                      </p>
                    </div>
                  </motion.div>

                  {/* Text Column */}
                  <motion.div
                    initial={
                      reduceMotion
                        ? { opacity: 1, x: 0, y: 0 }
                        : { opacity: 0, x: stop.reverse ? -24 : 24, y: 16 }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.22, margin: "-20px" }}
                    transition={{
                      duration: 0.65,
                      delay: 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      stop.reverse
                        ? "lg:order-1 lg:pr-4"
                        : "lg:order-2 lg:pl-4"
                    }`}
                  >
                    {/* Step Overline */}
                    <span className="text-xs font-bold tracking-[0.2em] text-[#B48A35] uppercase mb-1.5">
                      {isEn ? stop.stepNumberEn : stop.stepNumber}
                    </span>

                    {/* Main Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D3C34] leading-snug mb-1">
                      {isEn ? stop.titleEn : stop.titleVi}
                    </h3>

                    {/* Location Subtitle */}
                    <p className="text-sm font-medium text-[#8C7A65] mb-3">
                      {isEn ? stop.subtitleEn : stop.subtitleVi}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#526159] font-normal mb-5 max-w-md">
                      {isEn ? stop.descEn : stop.descVi}
                    </p>

                    {/* Practical facts from the catalog (hours, tickets) */}
                    {(facts?.openingHours || facts?.ticketInfo) && (
                      <dl className="mb-5 max-w-md space-y-2 text-[13px] leading-snug text-[#526159]">
                        {facts.openingHours && (
                          <div className="flex gap-2">
                            <dt className="mt-0.5 shrink-0 text-[#8A6B32]">
                              <Clock className="size-3.5" aria-hidden="true" />
                              <span className="sr-only">{isEn ? "Opening hours" : "Giờ mở cửa"}</span>
                            </dt>
                            <dd className="line-clamp-2">{facts.openingHours}</dd>
                          </div>
                        )}
                        {facts.ticketInfo && (
                          <div className="flex gap-2">
                            <dt className="mt-0.5 shrink-0 text-[#8A6B32]">
                              <Ticket className="size-3.5" aria-hidden="true" />
                              <span className="sr-only">{isEn ? "Tickets" : "Vé tham quan"}</span>
                            </dt>
                            <dd className="line-clamp-2">{facts.ticketInfo}</dd>
                          </div>
                        )}
                      </dl>
                    )}

                    {/* Action Link */}
                    <div>
                      <Link
                        href={localePath(locale, stop.href)}
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#1D3C34] hover:text-[#B48A35] transition-colors relative"
                      >
                        <span className="relative">
                          {isEn ? stop.linkTextEn : stop.linkTextVi}
                          <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-[#B48A35] transition-all duration-300 group-hover/link:w-full" />
                        </span>
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1.5 text-[#B48A35]" />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Connecting Curved Dotted Path between stops: Scroll-driven progressive reveal */}
                {idx < stops.length - 1 && (
                  <TrailConnector id={stop.id} reverse={stop.reverse} />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button: Khám phá toàn bộ hành trình → */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <Link
            href={localePath(locale, "/destinations")}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-[#1D3C34] px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#FAF8F5] shadow-md shadow-[#1D3C34]/15 transition-all duration-300 hover:bg-[#142B24] hover:shadow-lg hover:shadow-[#1D3C34]/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{isEn ? "Explore full journey" : "Khám phá toàn bộ hành trình"}</span>
            <ArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1 text-[#E5B34E]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
