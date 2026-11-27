import type { Locale } from "@/i18n/locales";
import { oldQuarterLocation } from "@/data/old-quarter-location";
import type { Category, CoverImage, CultureItem, Destination, Food, Story } from "@/types/content";

/** Rows are described structurally so these mappers do not depend on the generated Prisma client. */
interface WithLocale {
  locale: string;
}

const PRIMARY_LOCALE = "vi";

export interface ImageRow {
  id: string;
  altVi: string;
  altEn: string | null;
  credit: string;
  license: string;
  sourceUrl: string | null;
}

/** `{ image }` when the row has a cover image, otherwise `{}` so items without one stay unchanged. */
export function withImage(row: ImageRow | null | undefined, locale: Locale): { image?: CoverImage } {
  if (!row) return {};
  return {
    image: {
      id: row.id,
      alt: locale === "en" && row.altEn ? row.altEn : row.altVi,
      credit: row.credit,
      license: row.license,
      sourceUrl: row.sourceUrl,
    },
  };
}

/**
 * The translation to show: the requested locale when it exists, otherwise Vietnamese (the primary,
 * always-present language). Returns undefined when even the Vietnamese translation is missing.
 */
function resolve<T extends WithLocale>(translations: T[], locale: Locale): T | undefined {
  const primary = pickTranslation(translations, PRIMARY_LOCALE);
  if (!primary) return undefined;
  return (locale !== PRIMARY_LOCALE ? pickTranslation(translations, locale) : undefined) ?? primary;
}

export function pickTranslation<T extends WithLocale>(translations: T[], locale: string): T | undefined {
  return translations.find((t) => t.locale === locale);
}

/** Every mapper returns null when the Vietnamese translation is missing, so the row is skipped. */

export function mapCategory(
  row: {
    slug: string;
    translations: (WithLocale & { name: string; description: string })[];
  },
  locale: Locale = "vi",
): Category | null {
  const t = resolve(row.translations, locale);
  return t ? { slug: row.slug, name: t.name, description: t.description } : null;
}

export function mapDestination(
  row: {
    slug: string;
    category: { slug: string };
    isSample?: boolean;
    latitude?: number | null;
    longitude?: number | null;
    openingHours?: string | null;
    ticketInfo?: string | null;
    sourceUrl?: string | null;
    image?: ImageRow | null;
    translations: (WithLocale & { name: string; summary: string })[];
  },
  locale: Locale = "vi",
): Destination | null {
  const t = resolve(row.translations, locale);
  const hasLegacyOldQuarterLocation = row.slug === "hanoi-old-quarter" && row.isSample === true
    && row.latitude == null && row.longitude == null
    && (row.sourceUrl == null || row.sourceUrl === "https://hanoi.gov.vn");
  const location = hasLegacyOldQuarterLocation ? oldQuarterLocation : row;
  return t
    ? {
        slug: row.slug,
        name: t.name,
        category: row.category.slug,
        summary: t.summary,
        ...(row.isSample !== undefined ? { isSample: row.isSample } : {}),
        latitude: location.latitude ?? null,
        longitude: location.longitude ?? null,
        ...(row.openingHours !== undefined ? { openingHours: row.openingHours } : {}),
        ...(row.ticketInfo !== undefined ? { ticketInfo: row.ticketInfo } : {}),
        sourceUrl: location.sourceUrl ?? null,
        ...withImage(row.image, locale),
      }
    : null;
}

export function mapFood(
  row: {
    slug: string;
    image?: ImageRow | null;
    translations: (WithLocale & { name: string; summary: string | null })[];
  },
  locale: Locale = "vi",
): Food | null {
  const vi = pickTranslation(row.translations, PRIMARY_LOCALE);
  if (!vi) return null;
  const en = pickTranslation(row.translations, "en");
  if (locale === "en") {
    // English page: the English name leads; there is no separate "English name" label.
    return {
      slug: row.slug,
      name: en?.name ?? vi.name,
      englishName: "",
      summary: en?.summary ?? vi.summary ?? "",
      ...withImage(row.image, locale),
    };
  }
  return {
    slug: row.slug,
    name: vi.name,
    englishName: en?.name ?? "",
    summary: vi.summary ?? "",
    ...withImage(row.image, locale),
  };
}

export function mapCulture(
  row: {
    slug: string;
    image?: ImageRow | null;
    translations: (WithLocale & { name: string; summary: string })[];
  },
  locale: Locale = "vi",
): CultureItem | null {
  const t = resolve(row.translations, locale);
  return t ? { slug: row.slug, name: t.name, summary: t.summary, ...withImage(row.image, locale) } : null;
}

export function mapStory(
  row: {
    slug: string;
    image?: ImageRow | null;
    translations: (WithLocale & { title: string; excerpt: string; body: string[] })[];
  },
  locale: Locale = "vi",
): Story | null {
  const t = resolve(row.translations, locale);
  return t
    ? { slug: row.slug, title: t.title, excerpt: t.excerpt, body: t.body, ...withImage(row.image, locale) }
    : null;
}

export function present<T>(value: T | null): value is T {
  return value !== null;
}
