import Link from "next/link";
import type { ReactNode } from "react";
import { CoverImage } from "@/components/ui/cover-image";
import { PageShell } from "@/components/ui/page-shell";
import { ShareButtons } from "@/components/ui/share-buttons";
import { AudioGuidePlayer } from "@/components/audio/audio-guide-player";
import { TouristCardModal } from "@/components/social/tourist-card-modal";
import { getLocalPhoto } from "@/lib/local-photos";
import { StructuredData } from "@/components/seo/structured-data";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import type { CoverImage as CoverImageData } from "@/types/content";

export function ContentDetail({
  slug,
  eyebrow,
  title,
  summary,
  body,
  notice,
  backHref,
  backLabel,
  related,
  image,
  locale = "vi",
  jsonLd,
}: {
  slug?: string;
  eyebrow?: string;
  title: string;
  summary: string;
  body?: string[];
  notice?: { title: string; text: string };
  backHref: string;
  backLabel: string;
  related?: ReactNode;
  image?: CoverImageData | null;
  locale?: Locale;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  const m = getMessages(locale);
  return (
    <PageShell variant="wide">
      {jsonLd && <StructuredData data={jsonLd} />}
      <article>
        <nav aria-label={m.common.breadcrumb} className="text-sm text-muted-foreground">
          <Link href={backHref} className="underline underline-offset-4 hover:text-primary transition-colors">
            {backLabel}
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-foreground font-medium">{title}</span>
        </nav>

        <header className="mt-6 max-w-4xl">
          {eyebrow && <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
          <h1 className="mt-3 font-serif text-[length:var(--text-hero)] leading-tight text-foreground">{title}</h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{summary}</p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Main Column (8 cols): Media, Audio, Article Body */}
          <div className="lg:col-span-8 space-y-8">
            <div className="overflow-hidden rounded-[14px] border border-border/80 bg-surface shadow-sm">
              <CoverImage
                slug={slug}
                image={image}
                label={title}
                index={0}
                locale={locale}
                caption
                className="aspect-[16/9] w-full"
              />
            </div>

            <AudioGuidePlayer title={title} narrative={body ? body.join(". ") : summary} locale={locale} />

            {body && body.length > 0 && (
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-foreground/90 font-light pt-2">
                {body.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Sidebar (4 cols): Notice / Highlights, Share & Tourist Card, Navigation */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {notice && (
              <section aria-labelledby="notice-title" className="rounded-[14px] border border-border bg-surface p-6 shadow-sm">
                <h2 id="notice-title" className="font-serif text-xl sm:text-2xl font-bold text-foreground">{notice.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{notice.text}</p>
              </section>
            )}

            {/* Sharing & Tourist Card Card */}
            <div className="rounded-[14px] border border-border bg-surface p-5 shadow-sm space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {locale === "vi" ? "Lưu giữ & Chia sẻ" : "Save & Share"}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ShareButtons title={title} locale={locale} />
                <TouristCardModal
                  title={title}
                  subtitle={summary}
                  imageSrc={slug ? getLocalPhoto(slug)?.src : undefined}
                  locale={locale}
                />
              </div>
            </div>

            {/* Quick Link back */}
            <div className="rounded-[14px] border border-border/60 bg-muted/40 p-5">
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
              >
                <span>← {locale === "vi" ? `Xem thêm trong ${backLabel}` : `More in ${backLabel}`}</span>
              </Link>
            </div>
          </div>
        </div>

        {related && (
          <div className="mt-16 pt-12 border-t border-border">
            {related}
          </div>
        )}
      </article>
    </PageShell>
  );
}
