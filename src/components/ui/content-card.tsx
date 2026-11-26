import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CoverImage } from "@/components/ui/cover-image";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import type { CoverImage as CoverImageData } from "@/types/content";

export function ContentCard({
  href,
  eyebrow,
  title,
  summary,
  index,
  linkText,
  image,
  locale = "vi",
}: {
  href: string;
  eyebrow?: string;
  title: string;
  summary: string;
  index: number;
  linkText?: string;
  image?: CoverImageData | null;
  locale?: Locale;
}) {
  const link = linkText ?? getMessages(locale).common.viewDetails;
  const slug = href.split("/").filter(Boolean).pop();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-surface shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-xl hover:-translate-y-1 focus-within:border-secondary">
      <div className="relative overflow-hidden aspect-[16/10]">
        <CoverImage
          image={image}
          slug={slug}
          label={title}
          index={index}
          locale={locale}
          className="size-full transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        {eyebrow && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center rounded-full bg-black/65 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 border border-amber-400/30 shadow-xs">
              {eyebrow}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-serif text-[length:var(--text-card)] font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-3 font-light">
            {summary}
          </p>
        </div>
        <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between">
          <Link
            href={href}
            aria-label={`${link} ${title}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary transition-colors after:absolute after:inset-0"
          >
            <span>{link}</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
