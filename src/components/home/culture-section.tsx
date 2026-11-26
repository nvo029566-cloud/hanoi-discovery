import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContentCard } from "@/components/ui/content-card";
import { localePath, type Locale } from "@/i18n/locales";
import type { CultureItem } from "@/types/content";

export function CultureSection({
  culture,
  locale = "vi",
}: {
  culture: CultureItem[];
  locale?: Locale;
}) {
  const isEn = locale === "en";

  // Spotlight: 3 signature living heritage treasures for home landing page
  const spotlightCulture = culture.slice(0, 3);

  return (
    <section
      aria-labelledby="home-culture-title"
      className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <SectionHeading
          id="home-culture-title"
          eyebrow={isEn ? "HERITAGE & ARTISAN CRAFTS" : "DI SẢN & PHƯỜNG NGHỀ"}
          title={isEn ? "Living Soul of Thang Long Heritage" : "Tinh Hoa Văn Hóa Ngàn Năm Thăng Long"}
          description={
            isEn
              ? "From millennium-old water puppetry on sacred waters to prestigious silk looms and century-old pottery wheels."
              : "Từ làn điệu múa rối nước trên hồ cổ kính, phách ca trù tao nhã đến những bàn xoay gốm Bát Tràng và nón Chuông thanh lịch."
          }
        />
        <Link
          href={localePath(locale, "/culture")}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-bold text-primary hover:border-secondary hover:text-secondary hover:shadow-md transition-all shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="size-3.5 text-amber-500" />
          <span>
            {isEn
              ? `Explore all ${culture.length} heritage items`
              : `Khám phá toàn bộ ${culture.length} di sản`}
          </span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spotlightCulture.map((c, i) => (
          <li key={c.slug}>
            <ContentCard
              href={localePath(locale, `/culture/${c.slug}`)}
              title={c.name}
              summary={c.summary}
              image={c.image}
              index={i}
              locale={locale}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
