import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import type { CoverImage as CoverImageData } from "@/types/content";

/**
 * The uploaded cover image with its attribution, or the labeled placeholder / curated photo when there is none.
 * `caption` (detail pages) shows credit, license and source under the image; cards show a short credit badge.
 */
export function CoverImage({
  image,
  slug,
  label,
  index = 0,
  className,
  locale = "vi",
  caption = false,
}: {
  image?: CoverImageData | null;
  slug?: string;
  label: string;
  index?: number;
  className?: string;
  locale?: Locale;
  caption?: boolean;
}) {
  if (!image) {
    return (
      <ImagePlaceholder
        slug={slug}
        label={label}
        index={index}
        locale={locale}
        className={className}
        caption={caption}
      />
    );
  }

  const m = getMessages(locale).common;
  const picture = (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/media/${image.id}`}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {!caption && (
        <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate rounded bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-white shadow-xs">
          {m.photoCredit(image.credit)}
        </span>
      )}
    </div>
  );
  if (!caption) return picture;

  return (
    <figure>
      {picture}
      <figcaption className="mt-2 text-sm text-muted-foreground">
        {m.photoCredit(image.credit)} · {image.license}
        {image.sourceUrl && (
          <>
            {" · "}
            <a
              href={image.sourceUrl}
              rel="noopener noreferrer nofollow"
              target="_blank"
              className="underline underline-offset-4"
            >
              {m.sourceLabel}
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
