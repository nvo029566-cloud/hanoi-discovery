"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import { HeritageIcon } from "./heritage-icon";
import "./heritage-stats-section.css";
import { ThreeDCard } from "@/components/ui/three-d-card";

const restingPanel = { opacity: 1, y: 0, z: 0, rotateX: 0, scale: 1 };
const entranceStart = { opacity: 0.45, y: 86, z: -145, rotateX: -16, scale: 0.94 };
const panelEntrance: Variants = {
  waiting: entranceStart,
  resting: { ...restingPanel, transition: { duration: 0 } },
  jumping: {
    opacity: [entranceStart.opacity, 1, 1, 1],
    y: [entranceStart.y, -18, 5, 0],
    z: [entranceStart.z, 24, -7, 0],
    rotateX: [entranceStart.rotateX, 2, -1, 0],
    scale: [entranceStart.scale, 1.01, 0.998, 1],
    transition: { duration: 0.85, times: [0, 0.6, 0.83, 1], ease: "easeOut" },
  },
};

interface HeritageStatsSectionProps {
  locale?: Locale;
  /** Published items behind each pillar, shown as a small badge. Omitted values hide the badge. */
  counts?: { history?: number; oldQuarter?: number; heritage?: number; cuisine?: number };
}

export function HeritageStatsSection({ locale = "vi", counts }: HeritageStatsSectionProps) {
  const isEn = locale === "en";
  const reduce = useReducedMotion();
  const panelRegion = useRef<HTMLDivElement>(null);
  const panelInView = useInView(panelRegion, { once: true, margin: "0px 0px -80px 0px" });

  const { scrollYProgress } = useScroll({ target: panelRegion, offset: ["start end", "end start"] });
  const patternTurn = useTransform(scrollYProgress, [0, 1], [-12, 22]);
  const patternOffset = useTransform(scrollYProgress, [0, 1], [32, -36]);

  const items = [
    {
      id: "history",
      title: isEn ? "Historical Flow" : "Dòng chảy lịch sử",
      desc: isEn
        ? "From the ancient Thang Long citadel to the thousand-year-old capital."
        : "Từ kinh thành Thăng Long đến thủ đô nghìn năm tuổi.",
      count: counts?.history,
      unit: isEn ? "stories" : "bài viết",
      cta: isEn ? "Discover history" : "Khám phá lịch sử",
      href: "/culture",
    },
    {
      id: "old-quarter",
      title: isEn ? "Old Quarter Soul" : "Hồn cốt phố phường",
      desc: isEn
        ? "The way of life, artisan craft guilds, and timeless memories of ancient Ke Cho."
        : "Nếp sống, phố nghề và những ký ức đất Kẻ Chợ.",
      count: counts?.oldQuarter,
      unit: isEn ? "experiences" : "trải nghiệm",
      cta: isEn ? "Discover culture" : "Khám phá văn hóa",
      href: "/destinations?category=local-experiences",
    },
    {
      id: "heritage-land",
      title: isEn ? "Khue Van Pavilion" : "Khuê Văn Các",
      desc: isEn
        ? "Monuments and landmarks preserving cultural footprints across generations."
        : "Những công trình lưu giữ dấu ấn qua nhiều thế hệ.",
      count: counts?.heritage,
      unit: isEn ? "landmarks" : "địa danh",
      cta: isEn ? "Discover heritage" : "Khám phá di sản",
      href: "/destinations",
    },
    {
      id: "cuisine",
      title: isEn ? "Flavors of the Capital" : "Hương vị kinh kỳ",
      desc: isEn
        ? "The quintessence of culinary arts captured in each humble, authentic flavor."
        : "Tinh hoa ẩm thực trong từng hương vị bình dị.",
      count: counts?.cuisine,
      unit: isEn ? "dishes" : "món ăn",
      cta: isEn ? "Discover cuisine" : "Khám phá ẩm thực",
      href: "/food",
    },
  ] as const;

  return (
    <section
      id="heritage-stats"
      aria-labelledby="heritage-stats-title"
      className="home-chapter-target heritage-section relative isolate pt-12 pb-6 sm:pt-16 lg:pt-20 lg:pb-10"
    >
      <div className="heritage-pattern-frame" aria-hidden="true">
        <motion.div className="heritage-pattern heritage-pattern-top" style={reduce ? undefined : { y: patternOffset, rotateZ: patternTurn }} />
        <motion.div className="heritage-pattern heritage-pattern-bottom" style={reduce ? undefined : { y: patternOffset, rotateZ: patternTurn }} />
      </div>
      <div ref={panelRegion} className="mx-auto w-full max-w-[1516px] px-4 sm:px-6 lg:px-9">
        {/* Main Elegant Card Container */}
        <motion.div
          initial={reduce ? false : "waiting"}
          animate={reduce ? "resting" : panelInView ? "jumping" : "waiting"}
          variants={panelEntrance}
          style={{ transformPerspective: 1050, transformOrigin: "50% 0%" }}
          className="heritage-panel-reveal relative"
        >
          <header className="mb-9 text-center sm:mb-12 lg:mb-15">
            <h2
              id="heritage-stats-title"
              className="font-serif text-3xl leading-tight font-bold tracking-tight text-[#193831] sm:text-4xl lg:text-[52px]"
            >
              {isEn ? "Hanoi Heritage Footprints" : "Dấu ấn di sản thủ đô"}
            </h2>

            {/* Subtitle */}
            <p className="heritage-section-subtitle mt-3.5 text-sm leading-relaxed text-[#645C50] sm:text-base lg:text-lg">
              {isEn
                ? "Over a thousand years of history, four colors shaping Hanoi's authentic identity."
                : "Hơn một nghìn năm lịch sử, bốn sắc màu làm nên bản sắc Hà Nội."}
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
            {items.map((item, index) => (
              <div key={item.id} className="min-w-0 [perspective:1000px]">
                <motion.div
                  className="heritage-page-turn h-full [transform-origin:left_center]"
                  initial={reduce ? false : { rotateY: -25, y: 16 }}
                  whileInView={{ rotateY: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.14 }}
                  transition={{ duration: reduce ? 0 : 0.64, delay: reduce ? 0 : 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ThreeDCard maxRotate={7} scale={1.02} glareTint="rgb(227 182 77 / 0.25)" className="rounded-[20px]">
                    <Link
                      href={localePath(locale, item.href)}
                      className="heritage-depth-link flex h-full flex-col items-center rounded-[20px] border border-[#e3dacc] bg-[#fcfbf7]/95 px-3.5 pt-7 pb-6 text-center transition-colors sm:px-4 sm:pt-8 sm:pb-7 lg:min-h-[29rem] xl:min-h-[33rem] xl:pt-10 xl:pb-8"
                    >
                      <div className="heritage-depth-content flex w-full flex-col items-center">
                        <HeritageIcon kind={item.id} />

                        <h3 className="heritage-card-title mt-5 flex min-h-[2lh] items-center justify-center font-serif text-[clamp(1.22rem,1.95vw,1.8rem)] leading-tight font-bold text-[#254139]">
                          {item.title}
                        </h3>

                        <p className="heritage-card-desc mt-2 min-h-[3lh] text-sm leading-relaxed text-[#3C3730] xl:min-h-[2lh] xl:text-base">
                          {item.desc}
                        </p>
                        {item.count ? (
                          <span className="heritage-card-count mt-3 inline-flex items-center rounded-full border border-[#ded4c5] bg-[#fcfaf5] px-4 py-1.5 text-sm font-semibold text-[#69563c]">
                            {item.count} {item.unit}
                          </span>
                        ) : null}
                      </div>

                      <div className="heritage-card-cta mt-auto flex w-full justify-center pt-8">
                        <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#20443D] transition-colors duration-300">
                          <span className="heritage-cta-label relative pb-0.5">
                            {item.cta}
                          </span>
                          <ArrowRight className="heritage-cta-arrow size-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </ThreeDCard>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#DCD8CB]/60 pt-5 text-center sm:mt-8">
            <a href="#heritage-trail" className="group inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#6F5518] transition-colors hover:bg-[#EFE9DB]">
              {isEn ? "Explore the heritage trail" : "Xem hành trình di sản"}
              <ChevronDown className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-y-1" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
