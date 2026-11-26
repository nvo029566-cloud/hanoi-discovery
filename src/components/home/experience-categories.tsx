import Link from "next/link";
import {
  ArrowUpRight,
  Landmark,
  UtensilsCrossed,
  Camera,
  Trees,
  Compass,
  Palette,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import type { Category } from "@/types/content";
import { ThreeDCard } from "@/components/ui/three-d-card";

function getCategoryIcon(slug: string) {
  switch (slug) {
    case "history-heritage":
      return <Landmark className="size-5" />;
    case "food-drink":
      return <UtensilsCrossed className="size-5" />;
    case "photography-spots":
      return <Camera className="size-5" />;
    case "nature-relaxation":
      return <Trees className="size-5" />;
    case "local-experiences":
      return <Compass className="size-5" />;
    case "museums-art":
      return <Palette className="size-5" />;
    default:
      return <Sparkles className="size-5" />;
  }
}

export function ExperienceCategories({
  categories,
  locale = "vi",
}: {
  categories: Category[];
  locale?: Locale;
}) {
  const m = getMessages(locale).home;
  const isEn = locale === "en";

  return (
    <section aria-labelledby="experience-title" className="bg-[#f3f0e8]/80 dark:bg-[#071f1c]/50 py-16 md:py-24 border-y border-border/80">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <SectionHeading
          id="experience-title"
          eyebrow={m.experienceEyebrow}
          title={m.experienceTitle}
          description={
            isEn
              ? "Tailor your journey across 6 distinctive thematic lenses: from ancient imperial shrines to vibrant street food and quiet lakes."
              : "Lựa chọn hành trình theo 6 chủ đề trải nghiệm đặc trưng: từ di sản nghìn năm, ẩm thực tinh hoa đến không gian nghệ thuật và thiên nhiên thư thái."
          }
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <ThreeDCard maxRotate={4} scale={1.012} className="rounded-[20px]">
              <Link
                href={localePath(locale, `/destinations?category=${c.slug}`)}
                className="group relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-[20px] border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-xl hover:-translate-y-1"
              >
                {/* Category Header with Icon */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-[#0a2e2a] group-hover:text-amber-300 transition-colors">
                      {getCategoryIcon(c.slug)}
                    </span>
                    <span className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {c.name}
                    </span>
                  </div>

                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground font-light line-clamp-2">
                  {c.description}
                </p>

                {/* Action Link Footer */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="font-semibold text-secondary group-hover:underline">
                    {isEn ? "View places" : "Khám phá danh mục"} &rarr;
                  </span>
                  <span className="text-[11px] text-muted-foreground/70">
                    {isEn ? "Curated" : "Tuyển chọn"}
                  </span>
                </div>
              </Link>
              </ThreeDCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
