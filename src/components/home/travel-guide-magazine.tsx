"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import { Reveal } from "@/components/ui/reveal";
import {
  GUIDE_CATEGORIES,
  TRAVEL_GUIDE_ARTICLES,
  type GuideCategoryKey,
} from "@/data/travel-guide-articles";

interface TravelGuideMagazineProps {
  locale?: Locale;
}

interface CategoryDetail {
  taglineVi: string;
  taglineEn: string;
  tagsVi: string[];
  tagsEn: string[];
  tipVi: string;
  tipEn: string;
}

const CATEGORY_DETAILS: Record<GuideCategoryKey, CategoryDetail> = {
  all: {
    taglineVi:
      "Tuyển tập những câu chuyện di sản, cẩm nang trải nghiệm và hành trình khám phá chiều sâu văn hóa Thăng Long nghìn năm.",
    taglineEn:
      "Curated anthology of millennial heritage stories, practical guidance, and deep cultural Hanoi journeys.",
    tagsVi: ["#PhốCổ36Phường", "#HồGươm", "#ẨmThựcKinhKỳ", "#DiSảnNghìnNăm"],
    tagsEn: ["#OldQuarter", "#SwordLake", "#HanoiCuisine", "#MillennialHeritage"],
    tipVi:
      "Khung giờ vàng khám phá: 06:00 – 08:30 sáng khi nắng sớm rọi qua tán cây cổ thụ và 16:30 – 18:00 chiều ngắm hoàng hôn buông trên mặt hồ.",
    tipEn:
      "Golden exploration windows: 06:00 – 08:30 AM when early sunbeams pierce ancient canopies, and 16:30 – 18:00 PM for sunset.",
  },
  experience: {
    taglineVi:
      "Kinh nghiệm thực tế từ người Hà Nội: nếp văn hóa ứng xử, bí kíp chụp ảnh cổ kính, mặc áo dài truyền thống và chọn quà lưu niệm thủ công tinh xảo.",
    taglineEn:
      "Local insider guidance: temple etiquette, heritage photography tips, Ao Dai styling, and authentic artisanal souvenir curation.",
    tagsVi: ["#MặcÁoDài", "#SănẢnhDiSản", "#LưuNiệmThủCông", "#NếpSốngTràngAn"],
    tagsEn: ["#AoDaiElegance", "#HeritagePhotos", "#CraftSouvenirs", "#TrangAnTradition"],
    tipVi:
      "Khi tham quan các di tích tôn nghiêm (Văn Miếu, Đền Ngọc Sơn), hãy chuẩn bị trang phục kín đáo che vai và đầu gối; chuẩn bị giày đế bệt êm chân để thảnh thơi tản bộ ngõ nhỏ.",
    tipEn:
      "Wear modest attire covering shoulders and knees at sacred temples; choose cushioned flat shoes for cobblestone alleys.",
  },
  transport: {
    taglineVi:
      "Cẩm nang chuyển động xanh: từ tuyến tàu điện trên cao Cát Linh phóng tầm mắt đô thị, xe buýt 2 tầng lộng gió đến vòng xe đạp Hồ Tây thanh bình.",
    taglineEn:
      "Urban mobility guide: Cat Linh elevated metro panoramas, open-top City Tour buses, eco electric buggies, and West Lake cycling.",
    tagsVi: ["#TàuĐiệnCátLinh", "#XeBuýt2Tầng", "#XeĐiệnPhốCổ", "#ĐạpXeHồTây"],
    tagsEn: ["#CatLinhMetro", "#CityTourBus", "#OldQuarterElectric", "#WestLakeCycling"],
    tipVi:
      "Trải nghiệm tuyến tàu điện Cát Linh – Hà Đông vào khung giờ 09:30 – 11:30 ngày thường để có chỗ ngồi bên cửa sổ ngắm trọn vẹn toàn cảnh phố thị từ trên cao.",
    tipEn:
      "Board the Cat Linh – Ha Dong elevated metro between 09:30 and 11:30 AM on weekdays to secure a scenic window view over city boulevards.",
  },
  cuisine: {
    taglineVi:
      "Bản đồ phong vị ẩm thực kinh kỳ: bát phở bò gia truyền nước trong veo, đĩa bún chả que tre nướng than hoa, chảo chả cá Lã Vọng và gói cốm thơm lá sen.",
    taglineEn:
      "Culinary map of imperial delicacies: clear-broth beef pho, charcoal-grilled bamboo skewer bun cha, sizzling Cha Ca, and aromatic green rice.",
    tagsVi: ["#PhởGiaTruyền", "#ChảCáLãVọng", "#BúnThangKinhKỳ", "#CốmLàngVòng"],
    tagsEn: ["#HeirloomPho", "#ChaCaLaVong", "#ArtfulBunThang", "#VongGreenRice"],
    tipVi:
      "Các quán phở và bún chả phố cổ ngon nức tiếng thường đông khách nhất vào 07:00 – 08:30 sáng và 11:30 – 12:30 trưa; hãy ghé sớm 15 phút để thưởng thức nước dùng đầu nồi ngọt thanh.",
    tipEn:
      "Famous Old Quarter noodle stalls peak between 07:00 – 08:30 AM and 11:30 AM – 12:30 PM; arrive 15 minutes early for the sweetest first-pot broth.",
  },
  seasons: {
    taglineVi:
      "Bức họa bốn mùa luân chuyển: sắc xuân chợ hoa đào rực rỡ, mùa hạ đầm sen ngát hương, mùa thu rải lá vàng Phan Đình Phùng và mùa đông ấm nồng bên quán ăn đêm.",
    taglineEn:
      "Poetic seasonal chronicles: vibrant spring peach blossoms, fragrant summer lotuses, golden autumn foliage avenues, and heartwarming winter street food.",
    tagsVi: ["#MùaThuHàNội", "#ĐầmSenTâyHồ", "#ChợHoaQuảngBá", "#MùaHoaSấu"],
    tagsEn: ["#HanoiAutumn", "#WestLakeLotus", "#QuangBaFlowerMarket", "#DracontomelonSeason"],
    tipVi:
      "Mùa thu (tháng 9 – 11) là thời điểm khí hậu đẹp nhất trong năm với nắng vàng hanh hao và gió heo may se lạnh; đừng bỏ lỡ sớm mai dạo bộ dưới vòm cây sấu phố Phan Đình Phùng.",
    tipEn:
      "Autumn (September to November) offers the most poetic weather with crisp breezes and honeyed sunbeams; early walks under Phan Dinh Phung trees are essential.",
  },
  corners: {
    taglineVi:
      "Những khoảng lặng trầm mặc giữa lòng phố thị: quán cà phê trứng căn gác nhỏ, hoàng hôn bảng lảng mặt nước Tây Hồ, cầu Long Biên trăm năm và phố sách 19/12.",
    taglineEn:
      "Quiet sanctuaries within urban rhythms: cozy attic egg coffee corners, twilight reflections over West Lake, historic Long Bien Bridge, and 19/12 Book Street.",
    tagsVi: ["#SốngChậmPhốCổ", "#CàPhêTrứng", "#CầuLongBiên", "#PhốSách1912", "#NgõNhỏHàNội"],
    tagsEn: ["#SlowHanoi", "#EggCoffee", "#LongBienBridge", "#BookStreet1912", "#HistoricAlleys"],
    tipVi:
      "Hãy chọn một quán cà phê có ban công tầng 2 trên phố Hàng Gai hoặc Nguyễn Hữu Huân lúc 07:00 sáng để nhâm nhi ly cà phê trứng và ngắm nhịp thức giấc bình yên của 36 phố phường.",
    tipEn:
      "Choose a second-floor wooden balcony cafe on Hang Gai or Nguyen Huu Huan at 07:00 AM to sip velvety egg coffee and watch the Old Quarter gently awaken.",
  },
};

export function TravelGuideMagazine({ locale = "vi" }: TravelGuideMagazineProps) {
  const isEn = locale === "en";
  const [activeCategory, setActiveCategory] = useState<GuideCategoryKey>("all");

  // Filtered articles according to active category
  const { featuredArticle, sideArticles, categoryDetail } = useMemo(() => {
    let filtered = TRAVEL_GUIDE_ARTICLES;

    if (activeCategory !== "all") {
      filtered = TRAVEL_GUIDE_ARTICLES.filter(
        (article) => article.categoryKey === activeCategory,
      );
    }

    const detail = CATEGORY_DETAILS[activeCategory] || CATEGORY_DETAILS.all;

    if (activeCategory === "all") {
      // In "all", the default featured is the autumn story, and the 4 side articles match the curated overview
      const featured =
        TRAVEL_GUIDE_ARTICLES.find((a) => a.isFeaturedDefault) || TRAVEL_GUIDE_ARTICLES[0];
      const sides = TRAVEL_GUIDE_ARTICLES.filter((a) => a.id !== featured.id).slice(0, 4);
      return { featuredArticle: featured, sideArticles: sides, categoryDetail: detail };
    }

    // When a specific category is chosen:
    const featured = filtered[0];
    const sides = filtered.slice(1, 5);
    return { featuredArticle: featured, sideArticles: sides, categoryDetail: detail };
  }, [activeCategory]);

  return (
    <section
      id="handbook"
      aria-labelledby="travel-magazine-heading"
      className="home-chapter-target relative bg-[#FDFCF8] py-12 text-[#263B34] sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            1. SECTION HEADER (Editorial Asymmetric Layout)
        ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 pb-6 border-b border-[#DED9CC]">
          <Reveal className="max-w-[620px]">
            {/* Eyebrow */}
            <span className="block text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#8A6B32] mb-3">
              {isEn ? "VISITOR HANDBOOK" : "SỔ TAY DU KHÁCH"}
            </span>

            {/* Main Heading */}
            <h2
              id="travel-magazine-heading"
              className="font-serif text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.18] font-bold text-[#173D33] tracking-tight"
            >
              {isEn ? "Hanoi Through Written Pages" : "Hà Nội trong từng trang viết"}
            </h2>

            {/* Description */}
            <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#65736C] leading-relaxed max-w-[580px]">
              {isEn
                ? "Curated stories, authentic guidance, and local perspectives for those who hold Hanoi dear."
                : "Những câu chuyện, kinh nghiệm và góc nhìn dành cho người yêu Hà Nội."}
            </p>
          </Reveal>

          {/* Right Header Navigation Link */}
          <div className="hidden md:block shrink-0 self-start md:self-end">
            <Link
              href={localePath(locale, "/guide") + "#guide-articles"}
              className="group inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-medium text-[#173D33] hover:text-[#8A6B32] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
            >
              <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#8A6B32] after:transition-all after:duration-300 group-hover:after:w-full">
                {isEn ? "All articles" : "Tất cả bài viết"}
              </span>
              <span className="text-[15px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* =========================================================
            2. CATEGORY NAVIGATION BAR (Editorial Filter Bar)
        ========================================================= */}
        <nav
          aria-label={isEn ? "Handbook topic filter" : "Bộ lọc chủ đề cẩm nang"}
          className="relative mt-6 sm:mt-7 mb-6"
        >
          <div className="flex flex-wrap items-center gap-2 border-b border-[#DED9CC]/60 pb-4 sm:gap-3">
            {GUIDE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex min-h-10 items-center rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#173D33] focus-visible:ring-offset-2 sm:min-h-11 ${
                    isActive
                      ? "border-[#173D33] bg-[#173D33] text-white"
                      : "border-[#DED9CC] bg-white text-[#53645A] hover:border-[#A48C55] hover:text-[#173D33]"
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{isEn ? cat.labelEn : cat.labelVi}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* =========================================================
            2B. CATEGORY CONTEXT & LOCAL INSIDER TIP STRIP
            (Adds rich thematic guidance & topics when a tab is selected)
        ========================================================= */}
        <div className="mb-8 hidden rounded-[12px] border border-[#EBE7DC] bg-[#FAF8F2] p-5 md:flex md:items-center md:justify-between md:gap-4">
          <div className="space-y-1.5 max-w-[720px]">
            <p className="text-[13px] sm:text-[14px] text-[#4F5E57] font-normal leading-relaxed">
              {isEn ? categoryDetail.taglineEn : categoryDetail.taglineVi}
            </p>
            {/* Thematic Topic Tags */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {(isEn ? categoryDetail.tagsEn : categoryDetail.tagsVi).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] bg-[#EDE9DF]/70 text-[#173D33] text-[11px] sm:text-[12px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Local Insider Tip Badge */}
          <div className="shrink-0 flex items-start gap-2.5 md:max-w-[380px] p-3 rounded-[8px] bg-white border border-[#E6E1D3] shadow-2xs text-[12px] leading-relaxed text-[#5C6E66]">
            <Lightbulb className="size-4 text-[#8A6B32] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#8A6B32] block uppercase tracking-wider text-[10px]">
                {isEn ? "Local Insider Tip" : "Mẹo trải nghiệm địa phương"}
              </span>
              <p className="mt-0.5">
                {isEn ? categoryDetail.tipEn : categoryDetail.tipVi}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. MAIN EDITORIAL CONTENT GRID (60:40 Desktop Ratio)
            (Rendered with unoptimized={true} to guarantee 100% sharpness)
        ========================================================= */}
        {featuredArticle ? (
          <div
            className="home-magazine-results grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12 xl:gap-14"
            key={activeCategory}
          >
            {/* ----------------- LEFT: FEATURED ARTICLE (60%) ----------------- */}
            <article className="group flex flex-col">
              <Link
                href={localePath(locale, featuredArticle.href)}
                className="block overflow-hidden rounded-[14px] sm:rounded-[18px] shadow-sm"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] sm:rounded-[18px] bg-[#FAF8F2]">
                  <Image
                    src={featuredArticle.coverImage}
                    alt={isEn ? featuredArticle.coverImageAltEn : featuredArticle.coverImageAltVi}
                    fill
                    unoptimized
                    priority
                    className="object-cover rounded-[14px] sm:rounded-[18px] transition-transform duration-400 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
                  />
                </div>
              </Link>

              {/* Metadata: Category & Reading Time */}
              <div className="mt-4 sm:mt-5 flex items-center justify-between text-[11px] sm:text-[12px]">
                <span className="font-semibold uppercase tracking-[0.16em] text-[#8A6B32]">
                  {isEn ? featuredArticle.categoryLabelEn : featuredArticle.categoryLabelVi}
                </span>
                <span className="text-[#65736C] font-normal text-[12px] sm:text-[13px]">
                  {isEn ? featuredArticle.readingTimeEn : featuredArticle.readingTimeVi}
                </span>
              </div>

              {/* Featured Title */}
              <h3 className="mt-2.5 font-serif text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.25] font-bold text-[#173D33] group-hover:text-[#8A6B32] transition-colors duration-250">
                <Link
                  href={localePath(locale, featuredArticle.href)}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
                >
                  {isEn ? featuredArticle.titleEn : featuredArticle.titleVi}
                </Link>
              </h3>

              {/* Description */}
              <p className="mt-3 text-[14px] sm:text-[15px] text-[#65736C] leading-relaxed line-clamp-3 font-normal">
                {isEn ? featuredArticle.descriptionEn : featuredArticle.descriptionVi}
              </p>

              {/* CTA Link */}
              <div className="mt-4">
                <Link
                  href={localePath(locale, featuredArticle.href)}
                  className="group/cta inline-flex items-center gap-1.5 text-[14px] font-medium text-[#173D33] hover:text-[#8A6B32] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
                >
                  <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#8A6B32] after:transition-all after:duration-300 group-hover/cta:after:w-full">
                    {isEn ? "Read story" : "Đọc câu chuyện"}
                  </span>
                  <span className="text-[14px] transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 motion-reduce:transform-none">
                    ↗
                  </span>
                </Link>
              </div>
            </article>

            {/* ----------------- RIGHT: SIDE ARTICLES LIST (40%) ----------------- */}
            <div className="flex flex-col divide-y divide-[#DED9CC]">
              {sideArticles.map((article, index) => (
                <Reveal key={article.id} delay={index * 0.08} y={16}>
                  <article className="group flex gap-4 sm:gap-5 py-4 sm:py-5 first:pt-0 last:pb-0 items-start">
                    {/* Thumbnail - unoptimized to guarantee crisp high-res rendering */}
                    <Link
                      href={localePath(locale, article.href)}
                      className="relative shrink-0 size-[96px] sm:size-[112px] lg:size-[120px] overflow-hidden rounded-[10px] sm:rounded-[12px] bg-[#FAF8F2] shadow-xs"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Image
                        src={article.coverImage}
                        alt={isEn ? article.coverImageAltEn : article.coverImageAltVi}
                        fill
                        unoptimized
                        className="object-cover rounded-[10px] sm:rounded-[12px] transition-transform duration-400 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
                      />
                    </Link>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A6B32] mb-1">
                          {isEn ? article.categoryLabelEn : article.categoryLabelVi}
                        </span>
                        <h4 className="font-serif text-[17px] sm:text-[19px] lg:text-[20px] font-bold text-[#173D33] leading-snug line-clamp-2 group-hover:text-[#8A6B32] transition-colors duration-250">
                          <Link
                            href={localePath(locale, article.href)}
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
                          >
                            {isEn ? article.titleEn : article.titleVi}
                          </Link>
                        </h4>
                        {/* Short description for side articles */}
                        <p className="mt-1 text-[13px] text-[#65736C] line-clamp-2 font-normal leading-relaxed">
                          {isEn ? article.descriptionEn : article.descriptionVi}
                        </p>
                      </div>

                      <div className="mt-2 text-[12px] text-[#65736C]">
                        <span>{isEn ? article.readingTimeEn : article.readingTimeVi}</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}

              {sideArticles.length === 0 && (
                <div className="py-8 text-center text-[#65736C] text-[14px]">
                  {isEn
                    ? "No additional articles in this category."
                    : "Không có bài viết phụ trong danh mục này."}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center text-[#65736C]">
            <p className="font-serif italic text-lg">
              {isEn
                ? "No articles found in this category."
                : "Chưa có bài viết trong danh mục này."}
            </p>
          </div>
        )}

        {/* =========================================================
            4. SECTION FOOTER (Bottom Tagline & Navigation CTA)
        ========================================================= */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-[#DED9CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Poetic Tagline */}
          <p className="font-serif italic text-[15px] sm:text-[17px] text-[#8A6B32] tracking-wide">
            {isEn ? "“Travel to understand, discover to cherish.”" : "“Đi để hiểu, khám phá để thêm yêu.”"}
          </p>

          {/* Bottom CTA Link */}
          <Link
            href={localePath(locale, "/guide")}
            className="group inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[#173D33] hover:text-[#8A6B32] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33] rounded-sm"
          >
            <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#8A6B32] after:transition-all after:duration-300 group-hover:after:w-full">
              {isEn ? "Explore full handbook" : "Khám phá cẩm nang"}
            </span>
            <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
