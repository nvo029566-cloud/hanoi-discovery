import Link from "next/link";
import { Clock, Bus, ArrowRight, Sparkles, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";

interface Trail {
  id: string;
  titleVi: string;
  titleEn: string;
  taglineVi: string;
  taglineEn: string;
  durationVi: string;
  durationEn: string;
  transportVi: string;
  transportEn: string;
  badgeVi: string;
  badgeEn: string;
  image: string;
  stops: { nameVi: string; nameEn: string }[];
  plannerQuery: string;
}

const TRAILS: Trail[] = [
  {
    id: "trail-imperial",
    titleVi: "Dấu Ấn Thăng Long Nghìn Năm",
    titleEn: "Millennial Imperial Thang Long",
    taglineVi: "Hành trình ngược dòng thời gian qua các vương triều Lý, Trần, Lê hào hùng.",
    taglineEn: "A journey back in time through the heroic Ly, Tran, and Le dynasties.",
    durationVi: "1 Ngày trọn vẹn",
    durationEn: "Full 1-Day",
    transportVi: "Xe buýt 2 tầng / Xe máy",
    transportEn: "Double-decker bus / Motorbike",
    badgeVi: "Di sản Kinh kỳ",
    badgeEn: "Imperial Heritage",
    image: "/images/imperial-citadel-of-thang-long.jpg",
    stops: [
      { nameVi: "Hoàng thành Thăng Long", nameEn: "Imperial Citadel" },
      { nameVi: "Văn Miếu – Quốc Tử Giám", nameEn: "Temple of Literature" },
      { nameVi: "Chùa Một Cột", nameEn: "One Pillar Pagoda" },
      { nameVi: "Lăng Chủ tịch Hồ Chí Minh", nameEn: "Ho Chi Minh Mausoleum" },
    ],
    plannerQuery: "duration=1day&theme=heritage",
  },
  {
    id: "trail-food",
    titleVi: "36 Phố Phường & Hương Vị Kẻ Chợ",
    titleEn: "36 Guild Streets & Old Hanoi Flavors",
    taglineVi: "Mê cung ngõ nhỏ, phở sớm thơm lừng, cà phê trứng ngậy béo và nếp sống Tràng An.",
    taglineEn: "A labyrinth of alleys, steaming dawn pho, velvety egg coffee, and merchant heritage.",
    durationVi: "Nửa ngày (4 tiếng)",
    durationEn: "Half-day (4 hours)",
    transportVi: "Đi bộ / Xe điện phố cổ",
    transportEn: "Walking / Old Quarter Tram",
    badgeVi: "Food Tour Trứ Danh",
    badgeEn: "Signature Food Tour",
    image: "/images/hanoi-old-quarter.jpg",
    stops: [
      { nameVi: "Hồ Hoàn Kiếm & Đền Ngọc Sơn", nameEn: "Hoan Kiem Lake" },
      { nameVi: "Cà phê Giảng (Trứng 1946)", nameEn: "Giang Egg Coffee" },
      { nameVi: "Chợ Đồng Xuân & Ô Quan Chưởng", nameEn: "Dong Xuan & Old Gate" },
      { nameVi: "Phở Bát Đàn & Kem Tràng Tiền", nameEn: "Bat Dan Pho & Ice Cream" },
    ],
    plannerQuery: "duration=half&theme=food",
  },
  {
    id: "trail-crafts",
    titleVi: "Vành Đai Làng Nghề Ven Sông Hồng",
    titleEn: "Red River Artisan Craft Guilds",
    taglineVi: "Chiêm ngưỡng bàn xoay gốm cổ, lụa Vạn Phúc mượt mà và nón lá trắng ven sông.",
    taglineEn: "Marvel at ancient pottery wheels, shimmering Van Phuc silks, and palm leaf hats.",
    durationVi: "1 Ngày (Ngoại thành)",
    durationEn: "Full 1-Day (Outskirts)",
    transportVi: "Xe ô tô / Xe buýt",
    transportEn: "Car / Public Bus",
    badgeVi: "Thủ Công Tinh Xảo",
    badgeEn: "Master Handicrafts",
    image: "/images/bat-trang-ceramics.jpg",
    stops: [
      { nameVi: "Bảo tàng Gốm Bát Tràng", nameEn: "Bat Trang Ceramic Museum" },
      { nameVi: "Làng lụa tơ tằm Vạn Phúc", nameEn: "Van Phuc Silk Village" },
      { nameVi: "Làng nón lá Chuông Thanh Oai", nameEn: "Chuong Conical Hat Hamlet" },
    ],
    plannerQuery: "duration=1day&theme=crafts",
  },
  {
    id: "trail-night",
    titleVi: "Hà Nội Về Đêm – Ký Ức Thiêng Liêng",
    titleEn: "Nocturnal Hanoi & Sacred Memories",
    taglineVi: "Trải nghiệm tour đêm xúc động, ẩm thực ngõ không ngủ và gió lộng cầu Long Biên.",
    taglineEn: "An evocative night tour, midnight culinary alleys, and breezes over Long Bien Bridge.",
    durationVi: "Buổi tối (18:30 – 22:30)",
    durationEn: "Evening (18:30 – 22:30)",
    transportVi: "Xe máy / Taxi",
    transportEn: "Motorbike / Taxi",
    badgeVi: "Trải Nghiệm Đêm Hot",
    badgeEn: "Top Night Experience",
    image: "/images/hoa-lo-prison.jpg",
    stops: [
      { nameVi: "Tour đêm Di tích Nhà tù Hỏa Lò", nameEn: "Hoa Lo Sacred Night Tour" },
      { nameVi: "Phố ẩm thực Tống Duy Tân", nameEn: "Tong Duy Tan Night Food Lane" },
      { nameVi: "Ngắm trăng Cầu Long Biên", nameEn: "Long Bien Bridge Moonrise" },
    ],
    plannerQuery: "duration=half&theme=night",
  },
];

export function CuratedTrailsSection({ locale = "vi" }: { locale?: Locale }) {
  const isEn = locale === "en";

  return (
    <section id="curated-trails" aria-labelledby="curated-trails-title" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <SectionHeading
          id="curated-trails-title"
          eyebrow={isEn ? "THEMATIC TRAVEL CIRCUITS" : "GỢI Ý LỘ TRÌNH KHÁM PHÁ"}
          title={isEn ? "Curated Cultural Trails of Hanoi" : "Những Hành Trình Du Lịch Tiêu Biểu"}
          description={
            isEn
              ? "Designed like full package itineraries for independent travelers: balanced timing, optimal transit, and authentic highlights."
              : "Được thiết kế tỉ mỉ như những tour chuyên nghiệp: tối ưu hóa thời gian, phương tiện di chuyển và trọn vẹn điểm nhấn văn hiến."
          }
        />
        <Link
          href={localePath(locale, "/planner")}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-bold text-primary hover:border-secondary hover:text-secondary hover:shadow-md transition-all shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="size-3.5 text-amber-500" />
          <span>{isEn ? "Custom Itinerary Planner" : "Tự tạo lịch trình riêng"}</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Grid of Trails (Curated cultural tours) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TRAILS.map((trail) => (
          <article
            key={trail.id}
            className="group flex flex-col overflow-hidden rounded-[24px] border border-border bg-surface shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5"
          >
            {/* Image Header with Badge */}
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={trail.image}
                alt={isEn ? trail.titleEn : trail.titleVi}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              
              {/* Badge */}
              <span className="absolute top-3 left-3 rounded-full bg-[#0a2e2a]/90 text-[#f5e8b8] border border-amber-300/30 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                {isEn ? trail.badgeEn : trail.badgeVi}
              </span>

              {/* Duration Tag */}
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white">
                <Clock className="size-3 text-stone-200" />
                <span>{isEn ? trail.durationEn : trail.durationVi}</span>
              </span>
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {isEn ? trail.titleEn : trail.titleVi}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {isEn ? trail.taglineEn : trail.taglineVi}
                </p>

                {/* Stops Timeline */}
                <div className="mt-4 border-t border-border/70 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                    <Navigation className="size-3 text-primary" />
                    <span>{isEn ? "Highlights itinerary:" : "Lộ trình gợi ý:"}</span>
                  </p>
                  <ul className="space-y-1.5 text-xs text-foreground/90">
                    {trail.stops.map((stop, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 truncate">
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {sIdx + 1}
                        </span>
                        <span className="truncate">{isEn ? stop.nameEn : stop.nameVi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Transit & Action */}
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground truncate">
                  <Bus className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">{isEn ? trail.transportEn : trail.transportVi}</span>
                </div>
                <Link
                  href={localePath(locale, `/planner?${trail.plannerQuery}`)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-secondary transition-colors shrink-0"
                >
                  <span>{isEn ? "View route" : "Lộ trình"}</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
