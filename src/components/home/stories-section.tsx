import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { CoverImage } from "@/components/ui/cover-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import type { Story } from "@/types/content";

export function StoriesSection({ stories, locale = "vi" }: { stories: Story[]; locale?: Locale }) {
  const m = getMessages(locale);
  const isEn = locale === "en";

  return (
    <section aria-labelledby="stories-title" className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
      {/* Header with Read All Stories CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <SectionHeading
          id="stories-title"
          eyebrow={m.home.storiesEyebrow}
          title={m.home.storiesTitle}
          description={
            isEn
              ? "Deep cultural chronicles and personal walking memoirs exploring the poetic soul of Thang Long - Hanoi."
              : "Những bài viết ký sự sâu lắng, câu chuyện lịch sử và tản văn văn hóa chắp cánh cho hành trình khám phá Thủ đô."
          }
        />
        <Link
          href={localePath(locale, "/stories")}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-bold text-primary hover:border-secondary hover:text-secondary hover:shadow-md transition-all shrink-0 self-start sm:self-auto"
        >
          <BookOpen className="size-3.5" />
          <span>{isEn ? "All Cultural Stories" : "Xem tất cả câu chuyện"}</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Grid of Magazine Stories */}
      <ul className="grid gap-6 md:grid-cols-3">
        {stories.slice(0, 3).map((s, i) => (
          <li key={s.slug}>
            <Link
              href={localePath(locale, `/stories/${s.slug}`)}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <CoverImage
                  image={s.image}
                  slug={s.slug}
                  label={s.title}
                  index={i + 1}
                  locale={locale}
                  className="size-full transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-white/90">
                  <Clock className="size-3 text-amber-300" />
                  <span>{isEn ? "4 min read" : "4 phút đọc"}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                    {isEn ? "Heritage Essay" : "Ký sự Thăng Long"}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-xs md:text-sm leading-relaxed text-muted-foreground font-light line-clamp-3">
                    {s.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-primary group-hover:text-secondary transition-colors inline-flex items-center gap-1">
                    <span>{m.common.readStory}</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-muted-foreground/70">
                    Hanoi Discovery
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
