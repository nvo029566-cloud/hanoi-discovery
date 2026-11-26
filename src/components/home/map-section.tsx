import Link from "next/link";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import { PlacesMap } from "@/components/map/places-map";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import type { Category, Destination } from "@/types/content";

export function MapSection({
  destinations,
  categories,
  locale = "vi",
}: {
  destinations: Destination[];
  categories: Category[];
  locale?: Locale;
}) {
  const m = getMessages(locale).home;
  const isEn = locale === "en";

  return (
    <section aria-labelledby="map-title" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
      {/* Header with Direct Fullscreen Map Link */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <SectionHeading
          id="map-title"
          eyebrow={m.mapEyebrow}
          title={m.mapTitle}
          description={
            isEn
              ? "Locate 18 millennial destinations across Hanoi's historic districts. Filter by theme, check opening hours, and get live GPS navigation."
              : "Khám phá 18 tọa độ di sản trải dài khắp các quận Ba Đình, Hoàn Kiếm, Tây Hồ. Lọc theo chủ đề, tra cứu giờ mở cửa và định vị vị trí của bạn."
          }
        />
        <Link
          href={localePath(locale, "/map")}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-bold text-primary hover:border-secondary hover:text-secondary hover:shadow-md transition-all shrink-0 self-start sm:self-auto"
        >
          <Compass className="size-4 text-secondary" />
          <span>{m.mapCta}</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Luxury Map Container */}
      <div className="rounded-[24px] overflow-hidden border border-border shadow-xl bg-surface">
        <PlacesMap destinations={destinations} categories={categories} locale={locale} />
      </div>

      {/* Map Footer Note */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-muted-foreground px-2">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5 text-emerald-600" />
          <span>
            {isEn
              ? "100% verified GPS coordinates · OpenStreetMap contributors"
              : "100% tọa độ thực địa đã xác thực · Tích hợp chỉ đường Google Maps"}
          </span>
        </span>
        <span className="hidden sm:inline font-medium text-secondary">
          {isEn ? "Click pins for hours & tickets" : "Nhấp vào điểm ghim để xem giờ & vé"}
        </span>
      </div>
    </section>
  );
}
