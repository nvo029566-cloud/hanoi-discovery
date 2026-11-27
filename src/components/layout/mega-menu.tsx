"use client";

import Link from "next/link";
import {
  Landmark,
  Compass,
  UtensilsCrossed,
  Coffee,
  Sparkles,
  Palette,
  ArrowRight,
  MapPin,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";

interface MegaMenuProps {
  id: string;
  activeHref: string | null;
  locale: Locale;
  onClose: () => void;
}

export function MegaMenu({
  id,
  activeHref,
  locale,
  onClose,
}: MegaMenuProps) {
  const isEn = locale === "en";

  if (!activeHref || !["/destinations", "/food", "/culture"].includes(activeHref)) {
    return null;
  }

  return (
    <div
      id={id}
      role="region"
      aria-label={isEn ? "Submenu navigation" : "Menu điều hướng chuyên sâu"}
      className="absolute inset-x-0 top-full z-50 pt-2 dropdown-anim"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mega-menu-panel relative overflow-hidden rounded-xl border border-[#DEDAD1] bg-[#FAF8F3] p-6 shadow-2xl ring-1 ring-black/5 text-[#233B32]">
          {/* DESTINATIONS MEGA MENU */}
          {activeHref === "/destinations" && (
            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12">
              <Link href={localePath(locale, "/map")} onClick={onClose} className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 lg:col-span-12">
                <MapPin className="size-4" aria-hidden="true" />
                {isEn ? "Explore the map" : "Xem bản đồ Hà Nội"}
              </Link>
              {/* Column 1: Heritage & Monuments */}
              <div className="lg:col-span-4 flex flex-col space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-[#DEDAD1] text-xs font-bold uppercase tracking-wider text-[#233B32]">
                  <Landmark className="size-4 text-[#233B32]" />
                  <span>{isEn ? "Historic Monuments & Relics" : "Di tích & Danh thắng Lịch sử"}</span>
                </div>
                <div className="space-y-1">
                  <Link
                    href={localePath(locale, "/destinations/imperial-citadel-of-thang-long")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Landmark className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Imperial Citadel of Thang Long" : "Hoàng thành Thăng Long"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "UNESCO World Heritage Site with 13 centuries" : "Di sản thế giới UNESCO lưu giữ dấu ấn 13 thế kỷ"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/destinations/temple-of-literature")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <BookOpen className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Temple of Literature" : "Văn Miếu – Quốc Tử Giám"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Vietnam's first imperial university" : "Trường đại học đầu tiên, 82 bia tiến sĩ UNESCO"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/destinations/hoan-kiem-lake")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Compass className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Hoan Kiem Lake & Ngoc Son" : "Hồ Hoàn Kiếm & Đền Ngọc Sơn"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "The beating spiritual heart of Hanoi" : "Trái tim thủ đô gắn liền truyền thuyết Tháp Rùa"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/destinations/hoa-lo-prison")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Landmark className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Hoa Lo Prison Relic" : "Di tích Nhà tù Hỏa Lò"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Living historical landmark with night tour" : "Di tích lịch sử hào hùng cùng tour đêm xúc động"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 2: Living Heritage & Craft Villages */}
              <div className="lg:col-span-4 flex flex-col space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-[#DEDAD1] text-xs font-bold uppercase tracking-wider text-[#233B32]">
                  <MapPin className="size-4 text-[#233B32]" />
                  <span>{isEn ? "Living Heritage & Craft Villages" : "Không gian Sống & Làng nghề"}</span>
                </div>
                <div className="space-y-1">
                  <Link
                    href={localePath(locale, "/destinations/hanoi-old-quarter")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <MapPin className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Hanoi Old Quarter" : "Phố Cổ Hà Nội (36 Phố Phường)"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Historical streets and vibrant artisanal life" : "Mạng lưới phố nghề thủ công và kiến trúc nhà ống"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/destinations/long-bien-bridge")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Landmark className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Long Bien Historic Bridge" : "Cầu Long Biên Lịch Sử"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Iconic steel bridge over the Red River" : "Chứng nhân thế kỷ vắt ngang dòng sông Hồng"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/destinations/bat-trang-pottery-village")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Palette className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Bat Trang Pottery Village" : "Làng gốm cổ Bát Tràng"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "700 years of ceramic art and museum" : "700 năm tinh hoa gốm sứ và bảo tàng kiến trúc độc đáo"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/destinations/van-phuc-silk-village")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Van Phuc Silk Village" : "Làng lụa Vạn Phúc"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Millennium-old mulberry silk weaving" : "Cái nôi dệt lụa tơ tằm truyền thống hơn 1.000 năm"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 3: Featured Spotlight Card */}
              <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-[#DEDAD1] bg-white p-4 shadow-xs">
                <div>
                  <div className="relative mb-3 h-36 w-full overflow-hidden rounded-lg bg-emerald-950/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/imperial-citadel-of-thang-long.jpg"
                      alt={isEn ? "Imperial Citadel of Thang Long" : "Hoàng thành Thăng Long"}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-amber-400/90 px-2 py-0.5 text-[11px] font-bold text-stone-950">
                      <Sparkles className="size-3" />
                      {isEn ? "UNESCO Heritage" : "Di sản UNESCO"}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#233B32]">
                    {isEn ? "Hanoi Heritage Portal" : "Hành Trình Di Sản Thủ Đô"}
                  </h4>
                  <p className="mt-1 text-xs text-[#526159] leading-relaxed">
                    {isEn
                      ? "Explore 26 certified monuments, sacred temples, and artisan villages preserving Hanoi's thousand-year legacy."
                      : "Khám phá 26 di tích lịch sử, không gian kiến trúc và làng nghề cổ truyền gìn giữ hồn cốt Thăng Long."}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-[#DEDAD1]">
                  <Link
                    href={localePath(locale, "/destinations")}
                    onClick={onClose}
                    className="inline-flex items-center justify-between rounded-lg bg-[#2D4A3D] px-3.5 py-2 text-xs font-bold text-[#FAF8F3] transition-colors hover:bg-[#223C31]"
                  >
                    <span>{isEn ? "View all 26 destinations" : "Xem toàn bộ 26 điểm đến"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <Link
                    href={localePath(locale, "/map")}
                    onClick={onClose}
                    className="inline-flex items-center justify-between rounded-lg bg-[#FAF8F3] border border-[#DEDAD1] px-3.5 py-1.5 text-xs font-semibold text-[#233B32] hover:bg-[#E9EDE6] transition-colors"
                  >
                    <span>{isEn ? "Interactive Heritage Map" : "Bản đồ di sản tương tác"}</span>
                    <ChevronRight className="size-3.5 opacity-70" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* FOOD MEGA MENU */}
          {activeHref === "/food" && (
            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Column 1: Iconic Soups & Dishes */}
              <div className="lg:col-span-4 flex flex-col space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-[#DEDAD1] text-xs font-bold uppercase tracking-wider text-[#233B32]">
                  <UtensilsCrossed className="size-4 text-[#233B32]" />
                  <span>{isEn ? "Heritage Soups & Main Dishes" : "Hương vị Gia truyền Thăng Long"}</span>
                </div>
                <div className="space-y-1">
                  <Link
                    href={localePath(locale, "/food/pho")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <UtensilsCrossed className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Traditional Pho" : "Phở Bò & Phở Gà Hà Nội"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Rich simmered broth with star anise & cinnamon" : "Nước dùng thanh trong đượm hương hoa hồi, quế, gừng nướng"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/food/bun-cha")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <UtensilsCrossed className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Bun Cha Charcoal Pork" : "Bún chả nướng than hoa"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Smoky grilled pork in warm sweet-sour sauce" : "Chả nướng than hoa thơm lừng nước chấm chua ngọt ấm"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/food/cha-ca")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <UtensilsCrossed className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Cha Ca Lang Grilled Fish" : "Chả cá Lăng Hà Thành"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Sizzling pan with dill, scallions and shrimp paste" : "Chảo gang xào sục ngập thì là, hành hoa và mắm tôm"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/food/bun-thang")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <UtensilsCrossed className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Bun Thang Delicate Noodle" : "Bún thang thanh tao"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Sophisticated bowl with 20 finely shredded ingredients" : "Đỉnh cao tỉ mỉ ẩm thực Tràng An với gần 20 nguyên liệu thái chỉ"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 2: Coffee & Street Delights */}
              <div className="lg:col-span-4 flex flex-col space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-[#DEDAD1] text-xs font-bold uppercase tracking-wider text-[#233B32]">
                  <Coffee className="size-4 text-[#233B32]" />
                  <span>{isEn ? "Cafe Culture & Street Bites" : "Cà phê & Quà vặt Phố Cổ"}</span>
                </div>
                <div className="space-y-1">
                  <Link
                    href={localePath(locale, "/food/egg-coffee")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Coffee className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Hanoi Egg Coffee" : "Cà phê trứng Giảng (1946)"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Whipped egg yolk froth atop dark robusta" : "Lớp kem trứng đánh bông béo ngậy trên nền cà phê đậm đà"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/food/com")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Vong Village Green Rice" : "Cốm non làng Vòng"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Young sticky rice wrapped in fragrant lotus leaves" : "Hạt ngọc trời gói trọn hương vị mùa thu thanh tao đất Tràng An"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/food/banh-cuon")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <UtensilsCrossed className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Steamed Rice Crepes" : "Bánh cuốn Thanh Trì"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Silky rice sheets with crispy fried shallots" : "Lá bánh mỏng như lụa thoa mỡ hành phi giòn tan và chả quế"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/food/tra-sen-tay-ho")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Coffee className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "West Lake Scented Lotus Tea" : "Trà sen Tây Hồ Bách Diệp"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Ancient Shan Tuyet tea scented with lotus blossoms" : "Đỉnh cao nghệ thuật thưởng trà Tràng An ngọt thơm hậu vị"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 3: Featured Spotlight Card */}
              <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-[#DEDAD1] bg-white p-4 shadow-xs">
                <div>
                  <div className="relative mb-3 h-36 w-full overflow-hidden rounded-lg bg-emerald-950/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/pho.jpg"
                      alt={isEn ? "Hanoi Traditional Pho" : "Phở Bò Hà Nội"}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-amber-400/90 px-2 py-0.5 text-[11px] font-bold text-stone-950">
                      <Sparkles className="size-3" />
                      {isEn ? "Top 10 Global Food" : "Top 10 Ẩm Thực Thế Giới"}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#233B32]">
                    {isEn ? "TripAdvisor World Best of Best" : "Thiên Đường Ẩm Thực Hà Nội"}
                  </h4>
                  <p className="mt-1 text-xs text-[#526159] leading-relaxed">
                    {isEn
                      ? "Ranked among the world's top culinary destinations for authentic street flavors, heritage broths, and historic cafes."
                      : "Trải nghiệm tinh hoa ẩm thực đường phố, những quán phở gia truyền trăm năm và thức quà nức tiếng đất kinh kỳ."}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-[#DEDAD1]">
                  <Link
                    href={localePath(locale, "/food")}
                    onClick={onClose}
                    className="inline-flex items-center justify-between rounded-lg bg-[#2D4A3D] px-3.5 py-2 text-xs font-bold text-[#FAF8F3] transition-colors hover:bg-[#223C31]"
                  >
                    <span>{isEn ? "Explore all 20+ food specialties" : "Xem tất cả 20+ món ngon"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <Link
                    href={localePath(locale, "/food")}
                    onClick={onClose}
                    className="inline-flex items-center justify-between rounded-lg bg-[#FAF8F3] border border-[#DEDAD1] px-3.5 py-1.5 text-xs font-semibold text-[#233B32] hover:bg-[#E9EDE6] transition-colors"
                  >
                    <span>{isEn ? "Culinary map & authentic eateries" : "Bản đồ quán ăn gia truyền"}</span>
                    <ChevronRight className="size-3.5 opacity-70" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* CULTURE MEGA MENU */}
          {activeHref === "/culture" && (
            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Column 1: Performing Arts & Folk Heritage */}
              <div className="lg:col-span-4 flex flex-col space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-[#DEDAD1] text-xs font-bold uppercase tracking-wider text-[#233B32]">
                  <Sparkles className="size-4 text-[#233B32]" />
                  <span>{isEn ? "Performing Arts & Oral Traditions" : "Nghệ thuật Diễn xướng & Di sản"}</span>
                </div>
                <div className="space-y-1">
                  <Link
                    href={localePath(locale, "/culture/water-puppetry")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Water Puppetry Art" : "Múa rối nước Thăng Long"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "11th-century indigenous performing art on water" : "Nghệ thuật diễn xướng độc nhất vô nhị từ thế kỷ 11 bên Hồ Gươm"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/culture/ca-tru")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Landmark className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Ca Tru Chamber Music" : "Nghệ thuật Hát Ca Trù"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "UNESCO Intangible Cultural Heritage" : "Di sản phi vật thể nhân loại cần bảo vệ khẩn cấp"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/culture/hat-xam-ha-noi")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Hanoi Xam Street Singing" : "Hát Xẩm Hà Thành"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Folk tunes once echoing along the tramways" : "Âm vang tiếng đàn nhị hè phố Đồng Xuân và tàu điện xưa"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/culture/the-quintessence-of-tonkin")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Palette className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "The Quintessence of Tonkin" : "Vở diễn Tinh hoa Bắc Bộ"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Grand real-scene water performance" : "Show thực cảnh ngoài trời hoành tráng tái hiện thi ca Bắc Bộ"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 2: Crafts & Historic Festivals */}
              <div className="lg:col-span-4 flex flex-col space-y-3">
                <div className="flex items-center gap-2 pb-1 border-b border-[#DEDAD1] text-xs font-bold uppercase tracking-wider text-[#233B32]">
                  <Palette className="size-4 text-[#233B32]" />
                  <span>{isEn ? "Craft Guilds & Historic Festivals" : "Làng nghề & Lễ hội Nghìn Năm"}</span>
                </div>
                <div className="space-y-1">
                  <Link
                    href={localePath(locale, "/culture/bat-trang-ceramics")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Palette className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Bat Trang Ceramics" : "Kỹ nghệ Gốm Bát Tràng"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Rare crackle glaze technique and pottery craft" : "Bảo tồn dòng men rạn cổ truyền và kỹ thuật vuốt gốm thủ công"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/culture/ngu-xa-bronze-casting")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Landmark className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Ngu Xa Bronze Casting" : "Đúc đồng Ngũ Xã"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "500-year bronze sculpting tradition" : "500 năm đúc pho tượng Trấn Vũ và bảo vật đồng cổ kính"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/culture/huong-pagoda-festival")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Landmark className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Huong Pagoda Spring Pilgrimage" : "Lễ hội Chùa Hương"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Longest Buddhist festival with Yen Stream boat rides" : "Lễ hội hành hương Phật giáo dài ngày nhất, xuôi dòng suối Yến"}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={localePath(locale, "/culture/mid-autumn-festival")}
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-[#E9EDE6]"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#233B32]/10 text-[#233B32] group-hover:bg-[#233B32] group-hover:text-[#FAF8F3] transition-colors">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#233B32] group-hover:text-[#9C4838] transition-colors">
                        {isEn ? "Mid-Autumn in Old Quarter" : "Tết Trung thu Phố Cổ"}
                      </h4>
                      <p className="line-clamp-1 text-xs text-[#526159]">
                        {isEn ? "Hang Ma street glowing with lanterns & lion dances" : "Rực rỡ sắc màu lồng đèn ông sao, đầu lân và tiếng trống hội"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 3: Featured Spotlight Card */}
              <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-[#DEDAD1] bg-white p-4 shadow-xs">
                <div>
                  <div className="relative mb-3 h-36 w-full overflow-hidden rounded-lg bg-emerald-950/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/water-puppetry.jpg"
                      alt={isEn ? "Water Puppetry" : "Múa rối nước"}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-amber-400/90 px-2 py-0.5 text-[11px] font-bold text-stone-950">
                      <Sparkles className="size-3" />
                      {isEn ? "Living Culture" : "Di sản Sống"}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#233B32]">
                    {isEn ? "Thang Long Soul & Stories" : "Dòng Chảy Di Sản Thăng Long"}
                  </h4>
                  <p className="mt-1 text-xs text-[#526159] leading-relaxed">
                    {isEn
                      ? "Immerse in centuries of traditions, spiritual festivals, folk paintings, and master artisans defining Hanoi's identity."
                      : "Gìn giữ và tôn vinh những giá trị văn hóa phi vật thể, lễ hội truyền thống và tinh hoa thủ công Kẻ Chợ xưa."}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-[#DEDAD1]">
                  <Link
                    href={localePath(locale, "/culture")}
                    onClick={onClose}
                    className="inline-flex items-center justify-between rounded-lg bg-[#2D4A3D] px-3.5 py-2 text-xs font-bold text-[#FAF8F3] transition-colors hover:bg-[#223C31]"
                  >
                    <span>{isEn ? "Discover 12 cultural traditions" : "Xem 12 di sản văn hóa"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <Link
                    href={localePath(locale, "/stories")}
                    onClick={onClose}
                    className="inline-flex items-center justify-between rounded-lg bg-[#FAF8F3] border border-[#DEDAD1] px-3.5 py-1.5 text-xs font-semibold text-[#233B32] hover:bg-[#E9EDE6] transition-colors"
                  >
                    <span>{isEn ? "Read historic Hanoi stories" : "Đọc các câu chuyện Hà Nội xưa"}</span>
                    <ChevronRight className="size-3.5 opacity-70" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
