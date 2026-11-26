import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { getCategory } from "@/lib/content";
import type { Category, Destination } from "@/types/content";
import { DestinationCard } from "./destination-card";

export function FeaturedDestinations({
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

  // Spotlight: 6 signature destinations to keep the landing page striking and clean
  const spotlightDestinations = destinations.slice(0, 6);

  return (
    <section aria-labelledby="featured-title" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
      {/* Section Header with View All Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <SectionHeading
          id="featured-title"
          eyebrow={m.featuredEyebrow}
          title={m.featuredTitle}
          description={
            isEn
              ? "Discover the most revered historical sanctuaries, architectural marvels, and cultural hearts of Hanoi."
              : "Những danh thắng lịch sử tiêu biểu, kiệt tác kiến trúc cổ kính và không gian văn hóa đặc sắc nhất Thủ đô."
          }
        />
        <Link
          href={localePath(locale, "/destinations")}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-bold text-primary hover:border-secondary hover:text-secondary hover:shadow-md transition-all shrink-0 self-start sm:self-auto"
        >
          <span>
            {isEn
              ? `Explore all ${destinations.length} destinations`
              : `Xem tất cả ${destinations.length} địa danh`}
          </span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Grid of Cards */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spotlightDestinations.map((d, i) => (
          <li key={d.slug}>
            <DestinationCard
              destination={d}
              categoryName={getCategory(categories, d.category)?.name}
              index={i}
              locale={locale}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
