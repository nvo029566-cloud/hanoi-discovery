import { cacheLife, cacheTag } from "next/cache";
import type { Locale } from "@/i18n/locales";
import { prisma } from "@/lib/prisma";
import {
  mapCategory,
  mapCulture,
  mapDestination,
  mapFood,
  mapStory,
  present,
} from "@/lib/catalog-mappers";
import type { Category, CultureItem, Destination, Food, Story } from "@/types/content";

/** Image metadata only: never select the bytes in a catalog query. */
const imageSelect = { id: true, altVi: true, altEn: true, credit: true, license: true, sourceUrl: true } as const;

export interface Catalog {
  categories: Category[];
  destinations: Destination[];
  foods: Food[];
  culture: CultureItem[];
  stories: Story[];
}

/**
 * Published content from PostgreSQL in the requested language (Vietnamese fallback per item).
 * Cached with Cache Components (one entry per locale); the database must be reachable at build time.
 * Server-only.
 */
export async function getCatalog(locale: Locale = "vi"): Promise<Catalog> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");

  const published = { status: "PUBLISHED" as const };
  const order = [{ createdAt: "asc" as const }, { slug: "asc" as const }];

  const [categories, destinations, foods, culture, stories] = await Promise.all([
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
      include: { translations: true },
    }),
    prisma.destination.findMany({
      where: published,
      orderBy: order,
      include: { category: { select: { slug: true } }, translations: true, image: { select: imageSelect } },
    }),
    prisma.food.findMany({
      where: published,
      orderBy: order,
      include: { translations: true, image: { select: imageSelect } },
    }),
    prisma.cultureItem.findMany({
      where: published,
      orderBy: order,
      include: { translations: true, image: { select: imageSelect } },
    }),
    prisma.story.findMany({
      where: published,
      orderBy: order,
      include: { translations: true, image: { select: imageSelect } },
    }),
  ]);

  return {
    categories: categories.map((r) => mapCategory(r, locale)).filter(present),
    destinations: destinations.map((r) => mapDestination(r, locale)).filter(present),
    foods: foods.map((r) => mapFood(r, locale)).filter(present),
    culture: culture.map((r) => mapCulture(r, locale)).filter(present),
    stories: stories.map((r) => mapStory(r, locale)).filter(present),
  };
}
