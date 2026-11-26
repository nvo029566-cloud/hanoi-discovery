import { matchesQuery } from "@/lib/search";
import type { Category, Destination, Food } from "@/types/content";

/** Pure helpers: they take the data as arguments so they work with any source. */

export function getBySlug<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  return items.find((item) => item.slug === slug);
}

export function getCategory(categories: Category[], slug: string): Category | undefined {
  return getBySlug(categories, slug);
}

export function isCategorySlug(categories: Category[], value: string): boolean {
  return categories.some((c) => c.slug === value);
}

/** Filters by accent-insensitive text query and optional category. */
export function filterDestinations(
  destinations: Destination[],
  categories: Category[],
  query: string,
  category?: string,
): Destination[] {
  return destinations.filter((d) => {
    if (category && d.category !== category) return false;
    if (!query.trim()) return true;
    const categoryName = getCategory(categories, d.category)?.name ?? "";
    return matchesQuery(`${d.name} ${d.summary} ${categoryName}`, query);
  });
}

export function relatedDestinations(destinations: Destination[], destination: Destination, limit = 3): Destination[] {
  return destinations
    .filter((d) => d.slug !== destination.slug && d.category === destination.category)
    .slice(0, limit);
}

export function filterFoods(foods: Food[], query: string): Food[] {
  if (!query.trim()) return foods;
  return foods.filter((f) => matchesQuery(`${f.name} ${f.englishName} ${f.summary}`, query));
}

export interface MappableDestination extends Destination {
  latitude: number;
  longitude: number;
}

/** Destinations that have valid, verified coordinates. Others are never placed on the map. */
export function withCoordinates(destinations: Destination[]): MappableDestination[] {
  return destinations.filter(
    (d): d is MappableDestination =>
      typeof d.latitude === "number" &&
      typeof d.longitude === "number" &&
      Math.abs(d.latitude) <= 90 &&
      Math.abs(d.longitude) <= 180,
  );
}
