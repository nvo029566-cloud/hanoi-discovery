"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bus,
  Sparkles,
  Moon,
  Ship,
  Plane,
  Clock,
  MapPin,
  CheckCircle2,
  ExternalLink,
  PhoneCall,
  Search,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { sampleServices, type TourismService } from "@/data/sample-services";
import { localePath, type Locale } from "@/i18n/locales";

export function ServicesView({ locale = "vi" }: { locale?: Locale }) {
  const isEn = locale === "en";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    return [
      { key: "all", vi: "Tất cả dịch vụ", en: "All Services" },
      { key: "transport", vi: "Xe buýt & Vận chuyển", en: "Buses & Transport" },
      { key: "night", vi: "Tour đêm di tích", en: "Night Heritage Tours" },
      { key: "arts", vi: "Nghệ thuật truyền thống", en: "Traditional Arts" },
      { key: "craft", vi: "Làng nghề & Sông nước", en: "Crafts & Red River" },
    ];
  }, []);

  const filteredServices = useMemo(() => {
    return sampleServices.filter((s) => {
      // Category filter
      if (selectedCategory === "transport" && s.iconName !== "bus" && s.iconName !== "plane")
        return false;
      if (selectedCategory === "night" && s.iconName !== "moon") return false;
      if (selectedCategory === "arts" && s.iconName !== "theater") return false;
      if (selectedCategory === "craft" && s.iconName !== "ship") return false;

      // Query filter
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      const haystack = `${s.nameVi} ${s.nameEn} ${s.providerVi} ${s.providerEn} ${s.categoryVi} ${s.categoryEn}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [selectedCategory, query]);

  const renderIcon = (name: TourismService["iconName"]) => {
    switch (name) {
      case "bus":
        return <Bus className="size-5" />;
      case "theater":
        return <Sparkles className="size-5" />;
      case "moon":
        return <Moon className="size-5" />;
      case "ship":
        return <Ship className="size-5" />;
      case "plane":
        return <Plane className="size-5" />;
    }
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary mb-3">
          <ShieldCheck className="size-3.5" />
          {isEn ? "Official Municipal Partners" : "Dịch vụ & Vé tham quan Chính thức"}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {isEn ? "Hanoi Tourism Services & E-Tickets" : "Cổng Dịch Vụ & Đặt Vé Du Lịch Thủ Đô"}
        </h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          {isEn
            ? "Book authorized double-decker city tour buses, world-renowned water puppet shows, nighttime heritage tours, and direct airport express transfers with verified operators."
            : "Đặt trước các tuyến xe buýt 2 tầng Hop-On Hop-Off, vé xem múa rối nước Thăng Long, tour đêm di tích huyền ảo và phương tiện kết nối sân bay từ các đơn vị vận hành uy tín."}
        </p>

        {/* Tourist Hotline Banner */}
        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-brand-emerald-dark px-4 py-2.5 text-xs text-brand-cream border border-amber-500/30 shadow-md">
          <span className="flex size-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
            <PhoneCall className="size-3.5" />
          </span>
          <span>
            {isEn
              ? "Hanoi Tourism Support & Emergency Hotline:"
              : "Tổng đài Hỗ trợ Du khách Thủ đô (Sở Du lịch Hà Nội):"}
          </span>
          <a
            href="tel:1800556896"
            className="font-bold text-amber-300 hover:underline tracking-wider"
          >
            1800 556 896 (Miễn phí 24/7)
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedCategory(c.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.key
                  ? "bg-brand-emerald-dark text-brand-cream shadow-md"
                  : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {isEn ? c.en : c.vi}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEn ? "Search services..." : "Tìm vé, tour, xe buýt..."}
            className="w-full rounded-full border border-border bg-surface pl-9 pr-4 py-2 text-xs md:text-sm outline-none focus:border-brand-emerald-dark"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <article
            key={service.id}
            className="group flex flex-col justify-between rounded-3xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-secondary hover:shadow-xl"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {renderIcon(service.iconName)}
                  <span>{isEn ? service.categoryEn : service.categoryVi}</span>
                </span>
                <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-bold text-secondary uppercase tracking-wider">
                  {isEn ? service.badgeEn : service.badgeVi}
                </span>
              </div>

              {/* Title & Operator */}
              <h2 className="font-serif text-lg font-bold text-foreground group-hover:text-secondary transition-colors leading-snug">
                {isEn ? service.nameEn : service.nameVi}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {isEn ? `Operator: ${service.providerEn}` : `Đơn vị: ${service.providerVi}`}
              </p>

              {/* Price Banner */}
              <div className="my-4 rounded-2xl bg-brand-emerald-dark/5 dark:bg-white/5 border border-brand-emerald-dark/15 p-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground block">
                  {isEn ? "Official Price" : "Giá niêm yết chính thức"}
                </span>
                <span className="font-serif text-base font-bold text-secondary mt-0.5 block">
                  {isEn ? service.priceEn : service.priceVi}
                </span>
              </div>

              {/* Highlights Checklist */}
              <div className="space-y-2 mb-4">
                <span className="text-xs font-semibold text-foreground">
                  {isEn ? "Key Experience Highlights:" : "Đặc điểm nổi bật:"}
                </span>
                <ul className="space-y-1.5">
                  {(isEn ? service.highlightsEn : service.highlightsVi).map((hl) => (
                    <li key={hl} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule & Location */}
              <div className="space-y-1.5 pt-3 border-t border-border/80 text-xs text-muted-foreground">
                <div className="flex items-start gap-1.5">
                  <Clock className="size-3.5 shrink-0 mt-0.5 text-secondary" />
                  <span>{isEn ? service.scheduleEn : service.scheduleVi}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="size-3.5 shrink-0 mt-0.5 text-secondary" />
                  <span className="line-clamp-2">
                    {isEn ? service.departureEn : service.departureVi}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3">
              <Link
                href={localePath(locale, "/planner")}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Calendar className="size-3.5" />
                <span>{isEn ? "Add to Planner" : "Thêm vào lịch trình"}</span>
              </Link>

              <a
                href={service.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-emerald-dark px-4 py-2 text-xs font-bold text-brand-cream hover:bg-brand-emerald-light transition-all shadow-sm"
              >
                <span>{isEn ? "Book Ticket" : "Đặt vé trực tiếp"}</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
