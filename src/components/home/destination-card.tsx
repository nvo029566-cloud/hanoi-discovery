import Link from "next/link";
import { ArrowRight, Star, Ticket } from "lucide-react";
import { CoverImage } from "@/components/ui/cover-image";
import { ThreeDCard } from "@/components/ui/three-d-card";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import type { Destination } from "@/types/content";

export function DestinationCard({
  destination,
  categoryName,
  index,
  locale = "vi",
}: {
  destination: Destination;
  categoryName?: string;
  index: number;
  locale?: Locale;
}) {
  const m = getMessages(locale);
  const isEn = locale === "en";

  return (
    <ThreeDCard maxRotate={5} scale={1.012} className="rounded-[14px]">
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-border/80 bg-surface shadow-[0_8px_24px_rgba(10,46,42,0.05)] transition-all duration-300 hover:border-secondary/60 hover:shadow-[0_18px_40px_rgba(10,46,42,0.13)] focus-within:border-secondary">
      {/* Cover Photo with Badges Overlay */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <CoverImage
            image={destination.image}
            slug={destination.slug}
            label={destination.name}
            index={index}
            locale={locale}
            className="size-full transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Subtle gradient vignette on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Floating Category Pill */}
          {categoryName && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center rounded-full bg-black/65 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 border border-amber-400/30 shadow-xs">
                {categoryName}
              </span>
            </div>
          )}

          {/* Floating Rating or Free Ticket Pill */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/65 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/20 shadow-xs">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <span>4.9</span>
            </span>
          </div>

          {/* Bottom Badge Over Image */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white/90">
            {destination.ticketInfo ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur px-2.5 py-0.5 text-[10px] font-medium text-amber-200">
                <Ticket className="size-3" />
                <span>{destination.ticketInfo}</span>
              </span>
            ) : (
              <span />
            )}
          </div>
        </div>

        {/* Card Content Details */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            <h3 className="font-serif text-[length:var(--text-card)] font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
              {destination.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-xs font-light leading-relaxed text-muted-foreground md:text-sm">
              {destination.summary}
            </p>
          </div>

          {/* Card Footer Action */}
          <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between">
            <Link
              href={localePath(locale, `/destinations/${destination.slug}`)}
              aria-label={`${m.common.viewDetails} ${destination.name}`}
              className="inline-flex items-center gap-1.5 rounded-full text-xs font-bold text-primary transition-colors group-hover:text-secondary"
            >
              <span>{m.common.viewDetails}</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <span className="text-[11px] text-muted-foreground/80 font-medium">
              {isEn ? "Heritage Landmark" : "Di tích tiêu biểu"}
            </span>
          </div>
        </div>
    </article>
    </ThreeDCard>
  );
}
