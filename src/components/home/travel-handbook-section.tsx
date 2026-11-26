import Link from "next/link";
import { Bus, CloudSun, HeartHandshake, PhoneCall, ArrowRight, Compass } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";

export function TravelHandbookSection({ locale = "vi" }: { locale?: Locale }) {
  const isEn = locale === "en";

  const HANDBOOK_TOPICS = [
    {
      icon: Bus,
      titleVi: "Phương Tiện Di Chuyển Thông Minh",
      titleEn: "Smart Urban Transit Options",
      descVi: "Trải nghiệm xe buýt 2 tầng ngắm phố từ trên cao, tàu điện trên cao Cát Linh và xe điện thân thiện môi trường trong lòng 36 phố phường.",
      descEn: "Hop on the double-decker open-top bus, Cat Linh elevated metro line, and clean eco-trams cruising the historic Old Quarter alleys.",
      badgeVi: "Giao thông công cộng",
      badgeEn: "Public Transit",
      href: "/guide",
    },
    {
      icon: CloudSun,
      titleVi: "Mùa Đẹp Nhất & Thời Tiết Hà Nội",
      titleEn: "Best Travel Seasons & Weather",
      descVi: "Mùa thu tháng 9 – 11 với nắng vàng như mật, làn gió heo may và hương hoa sữa nồng nàn; mùa xuân trẩy hội Chùa Hương và chùa cổ linh thiêng.",
      descEn: "Autumn from Sep to Nov with golden sunshine, crisp breezes and milk-blossom perfumes; springtime sacred mountain pilgrimages.",
      badgeVi: "Bốn mùa Kinh kỳ",
      badgeEn: "Four Seasons",
      href: "/guide",
    },
    {
      icon: HeartHandshake,
      titleVi: "Văn Hóa Ứng Xử & Mẹo Du Lịch",
      titleEn: "Cultural Etiquette & Local Tips",
      descVi: "Quy tắc trang phục tôn nghiêm tại đền chùa, bí quyết thưởng thức trà sen Hồ Tây đúng điệu và nghệ thuật mua sắm văn minh nơi chợ phố.",
      descEn: "Dress codes at venerated sanctuaries, rituals of savoring authentic lotus tea, and savvy tips for browsing street merchant guilds.",
      badgeVi: "Nếp sống Tràng An",
      badgeEn: "Local Etiquette",
      href: "/guide",
    },
    {
      icon: PhoneCall,
      titleVi: "Hỗ Trợ Du Khách 24/7 & SOS",
      titleEn: "24/7 Visitor Support & SOS",
      descVi: "Tổng đài hỗ trợ du khách 1800 556 896 (miễn phí), trung tâm cung cấp thông tin 28 Hàng Dầu và các trạm hỗ trợ y tế, an ninh du lịch.",
      descEn: "Toll-free tourist hotline 1800 556 896, official visitor center at 28 Hang Dau, and designated tourist safety contact points.",
      badgeVi: "An tâm tuyệt đối",
      badgeEn: "Safety & Assistance",
      href: "/contact",
    },
  ];

  return (
    <section aria-labelledby="handbook-title" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <SectionHeading
          id="handbook-title"
          eyebrow={isEn ? "PRACTICAL TRAVEL HANDBOOK" : "CẨM NANG & KINH NGHIỆM BỎ TÚI"}
          title={isEn ? "Essential Guide for Hanoi Explorers" : "Cẩm Nang Du Lịch Thủ Đô Thực Tế"}
          description={
            isEn
              ? "All essential advice curated by local culture experts: transit, seasons, customs, and safety hotlines."
              : "Hành trang trọn vẹn được tổng hợp bởi các chuyên gia văn hóa bản địa: đi lại, thời tiết, phong tục và hỗ trợ du khách."
          }
        />
        <Link
          href={localePath(locale, "/guide")}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-bold text-primary hover:border-secondary hover:text-secondary hover:shadow-md transition-all shrink-0 self-start sm:self-auto"
        >
          <Compass className="size-3.5 text-amber-500" />
          <span>{isEn ? "Full Travel Handbook" : "Xem trọn bộ cẩm nang"}</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Grid of 4 Handbook Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HANDBOOK_TOPICS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={localePath(locale, item.href)}
              className="group flex flex-col justify-between rounded-[22px] border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon className="size-6" />
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {isEn ? item.badgeEn : item.badgeVi}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {isEn ? item.titleEn : item.titleVi}
                </h3>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed font-light">
                  {isEn ? item.descEn : item.descVi}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary group-hover:text-secondary transition-colors">
                <span>{isEn ? "Read guidance" : "Xem chi tiết"}</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
