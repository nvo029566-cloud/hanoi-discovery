import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { getLocalPhoto } from "@/lib/local-photos";
import { cn } from "@/lib/utils";

const tones = [
  "from-[#123c38] to-[#2f6b63]",
  "from-[#2f6b63] to-[#e6a75d]",
  "from-[#1d4f49] to-[#8fb3a8]",
  "from-[#3b5b57] to-[#e5ebe8]",
];

export function ImagePlaceholder({
  slug,
  label,
  index = 0,
  className,
  locale = "vi",
  caption = false,
}: {
  slug?: string;
  label: string;
  index?: number;
  className?: string;
  locale?: Locale;
  caption?: boolean;
}) {
  const m = getMessages(locale);
  const photo = getLocalPhoto(slug);

  if (photo) {
    const picture = (
      <div className={cn("relative overflow-hidden bg-surface group", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={label}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {!caption && (
          <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate rounded bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-white shadow-xs">
            {m.common.photoCredit(photo.credit)}
          </span>
        )}
      </div>
    );

    if (!caption) return picture;

    return (
      <figure>
        {picture}
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {m.common.photoCredit(photo.credit)} · {photo.license}
          {" · "}
          <a
            href={photo.sourceUrl}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="underline underline-offset-4"
          >
            {m.common.sourceLabel}
          </a>
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      role="img"
      aria-label={m.common.placeholderImage(label)}
      className={cn(
        "relative flex items-end bg-gradient-to-br p-3",
        tones[index % tones.length],
        className,
      )}
    >
      <span className="rounded bg-black/35 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-white">
        {m.common.sampleBadge}
      </span>
    </div>
  );
}
