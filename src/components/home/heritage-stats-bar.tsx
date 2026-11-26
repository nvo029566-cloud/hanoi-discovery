"use client";

import Link from "next/link";
import { Award, MapPin, Sparkles, Utensils, ArrowRight } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";

interface HeritageStatsBarProps {
  locale?: Locale;
}

export function HeritageStatsBar({ locale = "vi" }: HeritageStatsBarProps) {
  const isEn = locale === "en";

  const stats = [
    {
      id: "thang-long",
      number: "1010+",
      label: isEn ? "Years of History" : "Năm Thăng Long",
      badge: null,
      description: isEn
        ? "Foundation of millennial Thang Long capital under the Ly dynasty."
        : "Dấu mốc hình thành kinh đô Thăng Long dưới triều Lý.",
      cta: isEn ? "Explore culture" : "Xem lịch sử văn hóa",
      href: "/culture",
      icon: Award,
      accentColor: "text-[#9C4838]",
      iconBg: "bg-[#9C4838]/10 text-[#9C4838]",
    },
    {
      id: "guild-streets",
      number: "36",
      label: isEn ? "Artisan Quarters" : "Phố Phường Nghề",
      badge: isEn ? "Historic Guilds" : "Ước lệ lịch sử",
      description: isEn
        ? "Historic artisan guild quarters of ancient merchant Ke Cho."
        : "Khu phố nghề thủ công truyền thống lâu đời đất Kẻ Chợ.",
      cta: isEn ? "Explore guild streets" : "Xem các phố nghề",
      href: "/destinations?category=local-experiences",
      icon: MapPin,
      accentColor: "text-[#233B32]",
      iconBg: "bg-[#233B32]/10 text-[#233B32]",
    },
    {
      id: "heritage-sites",
      number: "18+",
      label: isEn ? "Heritage Sites" : "Di Tích Trọng Điểm",
      badge: null,
      description: isEn
        ? "UNESCO World Heritage and Special National Relics system."
        : "Hệ thống Di sản UNESCO và Di tích quốc gia đặc biệt.",
      cta: isEn ? "Browse 26 relics" : "Xem 26 địa danh di sản",
      href: "/destinations",
      icon: Sparkles,
      accentColor: "text-[#8A661C]",
      iconBg: "bg-[#8A661C]/10 text-[#8A661C]",
    },
    {
      id: "food-capital",
      number: "Top 10",
      label: isEn ? "Global Food Capital" : "Ẩm Thực Thế Giới",
      badge: null,
      description: isEn
        ? "World culinary capital voted by TripAdvisor travelers."
        : "Thủ đô ẩm thực toàn cầu do TripAdvisor bình chọn.",
      cta: isEn ? "Explore cuisine" : "Xem bản đồ món ngon",
      href: "/food",
      icon: Utensils,
      accentColor: "text-[#9C4838]",
      iconBg: "bg-[#9C4838]/10 text-[#9C4838]",
    },
  ];

  return (
    <section
      aria-label={isEn ? "Hanoi Heritage Highlights" : "Dấu ấn di sản Thủ đô"}
      className="border-y border-[#DEDAD1] bg-[#FAF8F3] py-8 sm:py-10 text-[#233B32]"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#DEDAD1]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-[#9C4838]" />
            <h2 className="font-serif text-sm sm:text-base font-bold tracking-wide uppercase text-[#233B32]">
              {isEn ? "Hanoi Heritage Highlights" : "Dấu Ấn Di Sản Thủ Đô"}
            </h2>
          </div>
          <p className="text-xs text-[#526159]">
            {isEn
              ? "Essential cultural milestones of millennial Hanoi"
              : "Những cột mốc văn hóa làm nên linh hồn ngàn năm của Thăng Long – Hà Nội"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={localePath(locale, item.href)}
                className="group flex flex-col justify-between rounded-xl border border-[#DEDAD1] bg-white p-5 shadow-xs transition-all duration-180 hover:-translate-y-1 hover:border-[#233B32]/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#233B32] focus-visible:outline-offset-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`flex size-9 items-center justify-center rounded-lg ${item.iconBg}`}>
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {item.badge && (
                      <span className="rounded bg-[#233B32]/10 px-2 py-0.5 text-[10px] font-semibold text-[#233B32] border border-[#233B32]/15">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#233B32] group-hover:text-[#9C4838] transition-colors duration-150">
                    {item.number}
                  </div>

                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#526159]">
                    {item.label}
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-[#526159] font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DEDAD1]/50 flex items-center justify-between text-xs font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors duration-150">
                  <span>{item.cta}</span>
                  <ArrowRight className="size-3.5 transition-transform duration-180 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
