"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Navigation } from "lucide-react";
import { localePath, type Locale } from "@/i18n/locales";
import { ThreeDCard } from "@/components/ui/three-d-card";

interface ItineraryStackedShowcaseProps {
  locale?: Locale;
}

export function ItineraryStackedShowcase({ locale = "vi" }: ItineraryStackedShowcaseProps) {
  const isEn = locale === "en";

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 text-[#1c2421]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        {/* BLOCK 1: Lịch trình mẫu được thiết kế bởi chuyên gia (Matching 00:06 - 00:07) */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Text & Checklist */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-2.5">
              {isEn ? "CURATED FOR YOU" : "DÀNH RIÊNG CHO BẠN"}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#103C34] leading-tight mb-4">
              {isEn
                ? "Curated Itineraries Designed by Cultural Experts"
                : "Lịch trình mẫu được thiết kế bởi chuyên gia"}
            </h2>

            <p className="text-sm sm:text-base text-[#526159] font-light leading-relaxed mb-6">
              {isEn
                ? "Don't know where to begin? Explore our curated heritage itineraries, tailor-made for your schedule and personal passions."
                : "Không biết bắt đầu từ đâu? Hãy tham khảo các lịch trình di sản được tính toán khoa học cho từng đối tượng và thời gian của bạn."}
            </p>

            <ul className="space-y-3.5 mb-8">
              {[
                isEn ? "Save planning time with optimal sequencing" : "Tiết kiệm thời gian lên kế hoạch",
                isEn ? "Transparent costs & verified monument hours" : "Tối ưu hóa quãng đường & thời gian di chuyển",
                isEn ? "Experience the most iconic heritage highlights" : "Trải nghiệm được những điểm đến tinh hoa nhất",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#233B32]">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <Check className="size-3 stroke-[2.5]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <Link
                href={localePath(locale, "/planner")}
                className="inline-flex h-11 sm:h-12 items-center gap-2 rounded-full bg-[#103C34] hover:bg-[#195247] px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-950/20 transition-all hover:shadow-lg hover:scale-102 active:scale-95"
              >
                <span>{isEn ? "View Curated Itineraries" : "Xem Lịch Trình Mẫu"}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Right: 3D Offset Layered Card Stack (Matching 00:07) */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-8">
            <div className="relative w-full max-w-[440px] aspect-[4/3]">
              {/* Card 1 (Bottom Back: Temple of Literature, tilted -5deg) */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-[-5deg] scale-95 translate-x-[-15px] translate-y-[-10px] bg-stone-200 transition-transform duration-300 hover:rotate-[-7deg]">
                <Image
                  src="/images/temple-of-literature.jpg"
                  alt="Văn Miếu – Quốc Tử Giám"
                  fill
                  sizes="400px"
                  className="size-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white drop-shadow">
                  Văn Miếu – Quốc Tử Giám
                </span>
              </div>

              {/* Card 2 (Middle: Egg Coffee / Old Quarter, tilted 4deg) */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-2xl rotate-[4deg] scale-98 translate-x-[15px] translate-y-[10px] bg-stone-200 transition-transform duration-300 hover:rotate-[6deg]">
                <Image
                  src="/images/egg-coffee.jpg"
                  alt="Cà phê trứng phố cổ"
                  fill
                  sizes="400px"
                  className="size-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-bold text-white drop-shadow">
                  Cà phê Giảng phố cổ
                </span>
              </div>

              {/* Card 3 (Top Front: Long Bien Bridge, center tilted -1deg) */}
              <ThreeDCard maxRotate={6} scale={1.03} className="relative z-10 size-full">
                <div className="size-full rounded-2xl overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] rotate-[-1deg] bg-stone-100 transition-transform duration-300">
                  <Image
                    src="/images/long-bien-bridge.jpg"
                    alt="Cầu Long Biên lịch sử"
                    fill
                    sizes="400px"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        {isEn ? "1-Day Itinerary" : "Lịch trình 1 ngày"}
                      </p>
                      <h4 className="text-sm font-bold text-white drop-shadow-md">
                        Cầu Long Biên hoàng hôn
                      </h4>
                    </div>
                    <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
                      1 Day
                    </span>
                  </div>
                </div>
              </ThreeDCard>
            </div>
          </div>
        </div>

        {/* BLOCK 2: Bản đồ tương tác - Định hình chuyến đi (Matching 00:08) */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 pt-8">
          {/* Left: 3D Interactive Map Preview Card (Matching 00:08) */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-4 order-2 lg:order-1">
            <ThreeDCard maxRotate={6} scale={1.02} className="w-full max-w-[480px]">
              <div className="rounded-3xl border border-stone-200 bg-[#FAF8F3] p-4 sm:p-5 shadow-2xl shadow-stone-900/10">
                {/* Simulated Map Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="flex size-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-[#103C34]">
                      {isEn ? "Live Route Navigation" : "Định tuyến di sản trực quan"}
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    GPS Active
                  </span>
                </div>

                {/* Stylized Vector Map Preview */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 to-emerald-50/50 border border-stone-200/80 p-4">
                  {/* Street grid background lines */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

                  {/* Route Polyline (Dashed path) */}
                  <svg className="absolute inset-0 size-full" viewBox="0 0 320 200" fill="none">
                    <path
                      d="M 40 160 Q 120 120, 160 80 T 280 40"
                      stroke="#059669"
                      strokeWidth="3.5"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Pin 1: Hoan Kiem */}
                  <div className="absolute left-[30px] top-[140px] flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md border border-emerald-200 animate-bounce">
                    <span className="flex size-4 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                      1
                    </span>
                    <span className="text-[10px] font-bold text-[#103C34]">Hồ Gươm</span>
                  </div>

                  {/* Pin 2: Old Quarter */}
                  <div className="absolute left-[140px] top-[60px] flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md border border-emerald-200">
                    <span className="flex size-4 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                      2
                    </span>
                    <span className="text-[10px] font-bold text-[#103C34]">Phố Cổ</span>
                  </div>

                  {/* Pin 3: Citadel */}
                  <div className="absolute right-[25px] top-[20px] flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md border border-emerald-200">
                    <span className="flex size-4 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                      3
                    </span>
                    <span className="text-[10px] font-bold text-[#103C34]">Hoàng Thành</span>
                  </div>

                  {/* Distance Pill */}
                  <div className="absolute bottom-3 right-3 rounded-lg bg-black/75 backdrop-blur-md px-3 py-1.5 text-white text-[11px] font-medium shadow-sm flex items-center gap-1.5">
                    <Navigation className="size-3 text-amber-300" />
                    <span>{isEn ? "Total route: 4.8 km" : "Tổng lộ trình: 4.8 km"}</span>
                  </div>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* Right Text & Checklist */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 mb-2.5">
              {isEn ? "SMART NAVIGATION" : "BẢN ĐỒ TƯƠNG TÁC"}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#103C34] leading-tight mb-4">
              {isEn
                ? "Interactive Map – Shape Your Journey"
                : "Bản đồ tương tác – Định hình chuyến đi"}
            </h2>

            <p className="text-sm sm:text-base text-[#526159] font-light leading-relaxed mb-6">
              {isEn
                ? "Giao diện trực quan giúp bạn dễ dàng theo dõi các địa điểm yêu thích vào lộ trình. Tự động tính toán thời gian di chuyển và gợi ý các điểm dừng chân thú vị dọc đường."
                : "Giao diện trực quan giúp bạn dễ dàng theo dõi các địa điểm yêu thích vào lộ trình. Tự động tính toán thời gian di chuyển và gợi ý các điểm dừng chân thú vị dọc đường."}
            </p>

            <ul className="space-y-3.5 mb-8">
              {[
                isEn ? "Optimize your travel distance & avoid rush hours" : "Tối ưu hóa quãng đường & thời gian di chuyển",
                isEn ? "Real-time updates on opening hours & weather" : "Cập nhật giờ mở cửa & thông tin thực tế",
                isEn ? "Integrated Google Maps navigation with 1 click" : "Tích hợp chỉ đường Google Maps & chia sẻ lộ trình",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#233B32]">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <Check className="size-3 stroke-[2.5]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <Link
                href={localePath(locale, "/map")}
                className="inline-flex h-11 sm:h-12 items-center gap-2 rounded-full border border-[#103C34] bg-white px-6 text-xs sm:text-sm font-bold text-[#103C34] shadow-xs transition-all hover:bg-[#103C34] hover:text-white hover:shadow-md active:scale-95"
              >
                <span>{isEn ? "Open Interactive Map" : "Mở Bản Đồ Tương Tác"}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
