import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Headphones, Route } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";

interface WhyChooseUsProps {
  locale?: Locale;
}

export function WhyChooseUs({ locale = "vi" }: WhyChooseUsProps) {
  const isEn = locale === "en";

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
      ctaVi: "Trải nghiệm ngay",
      ctaEn: "Experience now",
      href: "/destinations",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="bg-[#F8F6F0] py-16 sm:py-20 lg:py-24 border-y border-[#E4DFD4] text-[#173D33]"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header matching Image 2 */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Overline */}
          <p className="text-xs sm:text-[13px] font-semibold text-[#B09255] uppercase tracking-[0.2em] mb-2.5">
            {isEn ? "DISTINCTIVE EXPERIENCES" : "TRẢI NGHIỆM KHÁC BIỆT"}
          </p>

          {/* Heading with balanced line breaks */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-tight text-[#173D33] leading-tight">
            {isEn ? (
              "Explore Hanoi on Your Own Terms"
            ) : (
              <>
                Khám phá Hà Nội{" "}
                <span className="whitespace-nowrap">theo cách của bạn</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#65736C] font-normal">
            {isEn
              ? "From millennial heritage tales to familiar neighborhood alleys, Hanoi Discovery walks with you on every step of your journey."
              : "Từ những câu chuyện nghìn năm đến từng góc phố thân quen, Hanoi Discovery đồng hành cùng bạn trên mỗi hành trình khám phá Thủ đô."}
          </p>

          {/* Decorative Divider with Centered Diamond */}
          <div className="flex items-center justify-center gap-3 mt-6 mb-12 sm:mb-14">
            <span className="h-px w-12 bg-[#B09255]/40" />
            <span className="size-2 rotate-45 border border-[#B09255] bg-[#F8F6F0]" />
            <span className="h-px w-12 bg-[#B09255]/40" />
          </div>
        </div>

        {/* 3 Real-photo Feature Cards with Flexbox & mt-auto CTA Alignment */}
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group flex flex-col h-full rounded-[20px] border border-[#E4DFD4] bg-[#FFFFFF] overflow-hidden shadow-[0_4px_20px_rgba(23,61,51,0.03)] transition-all duration-300 hover:border-[#D5CBB9] hover:shadow-[0_12px_28px_rgba(23,61,51,0.07)] hover:-translate-y-1"
              >
                {/* Photo Header with Synchronized Color Grading & Subtle Editorial Tint */}
                <div className="relative aspect-[16/10.5] w-full shrink-0 overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt={isEn ? item.titleEn : item.titleVi}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    style={{ filter: item.imageFilter }}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                  />
                  {/* Atmospheric unifying tint to bind all 3 photos into a single collection */}
                  <div className="absolute inset-0 bg-[#2D2A24]/[0.03] mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Card Content with Flex Column for Precise Alignment */}
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div className="flex flex-col flex-1">
                    {/* Icon */}
                    <div className="mb-3 text-[#B09255] flex items-center">
                      <Icon className="size-5 sm:size-5.5 stroke-[1.8]" />
                    </div>

                    {/* Unified Title Color: Consistently #173D33 across all cards */}
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
                    <Link
                      href={localePath(locale, item.href)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#173D33] group-hover:text-[#B09255] transition-colors"
                    >
                      <span>{isEn ? item.ctaEn : item.ctaVi}</span>
                      <ArrowRight className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#B09255]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
