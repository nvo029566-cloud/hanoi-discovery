"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, BookOpen, Headphones, Route } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import { Tour360Button } from "@/components/virtual-tour/tour-360-button";
import { WhyChooseUsBackground } from "./why-choose-us-background";

interface WhyChooseUsProps {
  locale?: Locale;
}

export function WhyChooseUs({ locale = "vi" }: WhyChooseUsProps) {
  const isEn = locale === "en";
  const reduce = useReducedMotion();

  const features = [
    {
      id: "custom-journey",
      icon: Route,
      image: "/images/feature-hoan-kiem-panoramic.jpg",
      // Harmonized color grading: calms intense sunset warmth to match daylight series
      imageFilter: "saturate(0.92) brightness(0.98) contrast(1.02)",
      titleVi: "Hành trình của riêng bạn",
      titleEn: "Your Custom Journey",
      descVi: "Lên kế hoạch tham quan phù hợp với thời gian và sở thích cá nhân.",
      descEn: "Plan your sightseeing itinerary tailored to your time and personal interests.",
      ctaVi: "Lập lịch trình",
      ctaEn: "Plan itinerary",
      href: "/planner",
    },
    {
      id: "heritage-insight",
      icon: BookOpen,
      image: "/images/feature-khue-van-cac-front.jpg",
      // Harmonized color grading: balanced warmth and foliage contrast
      imageFilter: "saturate(0.96) brightness(0.98) contrast(1.02)",
      titleVi: "Hiểu hơn về di sản",
      titleEn: "Deeper Heritage Insight",
      descVi: "Tìm hiểu lịch sử, kiến trúc và những câu chuyện văn hóa của Thủ đô.",
      descEn: "Discover the history, architecture, and cultural stories behind Hanoi's treasures.",
      ctaVi: "Đọc câu chuyện",
      ctaEn: "Read the stories",
      href: "/stories",
    },
    {
      id: "touch-stories",
      icon: Headphones,
      image: "/images/feature-doan-mon-citadel.jpg",
      // Harmonized color grading: softens saturated blue sky to match editorial tone
      imageFilter: "saturate(0.85) brightness(0.98) contrast(1.02)",
      titleVi: "Chạm vào từng câu chuyện",
      titleEn: "Touch Every Story",
      descVi: "Trải nghiệm không gian di sản qua hình ảnh 360° và thuyết minh.",
      descEn: "Immerse in heritage spaces through 360° virtual imagery and vivid storytelling.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="home-chapter-target relative isolate overflow-hidden py-16 text-[#F8F6F0] sm:py-20 lg:py-24"
    >
      {/* Rich Emerald & Gold Cultural Heritage Background */}
      <WhyChooseUsBackground isEn={isEn} />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header with Choreographed Scroll Entrance */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          {/* Overline with flanking gold rules */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 inline-flex items-center gap-2"
          >
            <span className="h-px w-5 bg-[#E8C77B]/60 sm:w-8" />
            <p className="text-xs font-semibold tracking-[0.25em] text-[#E8C77B] uppercase sm:text-[13px]">
              {isEn ? "DISTINCTIVE EXPERIENCES" : "TRẢI NGHIỆM KHÁC BIỆT"}
            </p>
            <span className="h-px w-5 bg-[#E8C77B]/60 sm:w-8" />
          </motion.div>

          {/* Heading with balanced line breaks */}
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl leading-tight font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] sm:text-4xl lg:text-[42px]"
          >
            {isEn ? (
              "Explore Hanoi on Your Own Terms"
            ) : (
              <>
                Khám phá Hà Nội{" "}
                <span className="whitespace-nowrap font-serif italic font-normal text-[#E8C77B]">
                  theo cách của bạn
                </span>
              </>
            )}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3.5 max-w-xl text-sm leading-relaxed text-[#E2E9DE]/90 font-light sm:text-base"
          >
            {isEn
              ? "From millennial heritage tales to familiar neighborhood alleys, Hanoi Discovery walks with you on every step of your journey."
              : "Từ những câu chuyện nghìn năm đến từng góc phố thân quen, Hanoi Discovery đồng hành cùng bạn trên mỗi hành trình khám phá Thủ đô."}
          </motion.p>
        </div>

        {/* 3 Real-photo Feature Cards with Flexbox & mt-auto CTA Alignment */}
        <div className="grid items-stretch gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 44, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.16 + 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <div
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#E4DFD4]/90 bg-[#FAF8F2] text-[#173D33] shadow-lg shadow-black/25 transition-all duration-500 ease-out hover:-translate-y-2.5 hover:border-[#E8C77B] hover:shadow-[0_22px_45px_-12px_rgba(232,199,123,0.28),0_12px_24px_-6px_rgba(0,0,0,0.5)]"
                >
                  {/* Photo Header with Synchronized Color Grading & Shimmer Gleam */}
                  <div className="relative aspect-[16/10.5] w-full shrink-0 overflow-hidden bg-stone-100">
                    <Image
                      src={item.image}
                      alt={isEn ? item.titleEn : item.titleVi}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      style={{ filter: item.imageFilter }}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 group-focus-within:scale-106"
                    />
                    {/* Atmospheric unifying tint */}
                    <div className="absolute inset-0 bg-[#2D2A24]/[0.03] mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                    {/* Diagonal Light Shimmer Beam across image on card hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full"
                    />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-lg border border-white/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
                  </div>

                  {/* Card Content with Flex Column for Precise Alignment */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex flex-col flex-1">
                      {/* Interactive Icon Badge */}
                      <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-[#B09255]/25 bg-[#E8C77B]/15 text-[#8F7032] shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:border-[#E8C77B] group-hover:bg-[#E8C77B] group-hover:text-[#102B24] group-hover:shadow-[0_0_16px_rgba(232,199,123,0.45)]">
                        <Icon className="size-5 stroke-[1.9]" />
                      </div>

                      {/* Unified Title Color */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173D33] group-hover:text-[#102B24] transition-colors duration-200 mb-2.5 leading-snug min-h-[56px] sm:min-h-[64px] flex items-center">
                        {isEn ? item.titleEn : item.titleVi}
                      </h3>

                      {/* Description filling available space */}
                      <p className="text-xs sm:text-sm leading-relaxed text-[#65736C] font-normal mb-6 flex-1">
                        {isEn ? item.descEn : item.descVi}
                      </p>
                    </div>

                    {/* Guaranteed Aligned CTA Link via mt-auto & Flexbox */}
                    <div className="mt-auto pt-4 border-t border-[#E4DFD4]/80">
                      {item.href ? (
                        <Link
                          href={localePath(locale, item.href)}
                          className="group/cta inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#173D33] group-hover:text-[#8F7032] transition-colors"
                        >
                          <span className="relative">
                            {isEn ? item.ctaEn : item.ctaVi}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#8F7032] transition-all duration-300 group-hover/cta:w-full" />
                          </span>
                          <ArrowRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#B09255]" />
                        </Link>
                      ) : (
                        <Tour360Button slug="imperial-citadel-of-thang-long" locale={locale} />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
