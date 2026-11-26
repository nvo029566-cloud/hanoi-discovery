import type { Locale } from "@/i18n/locales";
import { localePath } from "@/i18n/locales";
import type { Destination, Food, Story } from "@/types/content";
import { getLocalPhoto } from "@/lib/local-photos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hanoidiscovery.vn";

export function StructuredData({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function buildDestinationJsonLd(destination: Destination, locale: Locale) {
  const photo = getLocalPhoto(destination.slug);
  const imageUrl = photo ? `${SITE_URL}${photo.src}` : undefined;
  const url = `${SITE_URL}${localePath(locale, `/destinations/${destination.slug}`)}`;

  const isFree =
    destination.ticketInfo?.toLowerCase().includes("miễn phí") ||
    destination.ticketInfo?.toLowerCase().includes("free");

  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": url,
    name: destination.name,
    description: destination.summary,
    url,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(destination.latitude && destination.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: destination.latitude,
            longitude: destination.longitude,
          },
        }
      : {}),
    ...(destination.openingHours
      ? {
          openingHours: destination.openingHours,
        }
      : {}),
    ...(destination.ticketInfo
      ? {
          isAccessibleForFree: isFree,
          priceRange: destination.ticketInfo,
        }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
  };
}

export function buildFoodJsonLd(food: Food, locale: Locale) {
  const photo = getLocalPhoto(food.slug);
  const imageUrl = photo ? `${SITE_URL}${photo.src}` : undefined;
  const url = `${SITE_URL}${localePath(locale, `/food/${food.slug}`)}`;

  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    "@id": url,
    name: food.name,
    description: food.summary,
    url,
    ...(imageUrl ? { image: imageUrl } : {}),
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
  };
}

export function buildCultureJsonLd(culture: { slug: string; name: string; summary: string }, locale: Locale) {
  const photo = getLocalPhoto(culture.slug);
  const imageUrl = photo ? `${SITE_URL}${photo.src}` : undefined;
  const url = `${SITE_URL}${localePath(locale, `/culture/${culture.slug}`)}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": url,
    name: culture.name,
    description: culture.summary,
    url,
    ...(imageUrl ? { image: imageUrl } : {}),
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
  };
}

export function buildStoryJsonLd(story: Story, locale: Locale) {
  const photo = getLocalPhoto(story.slug);
  const imageUrl = photo ? `${SITE_URL}${photo.src}` : undefined;
  const url = `${SITE_URL}${localePath(locale, `/stories/${story.slug}`)}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: story.title,
    description: story.excerpt,
    articleBody: story.body.join("\n\n"),
    url,
    ...(imageUrl ? { image: imageUrl } : {}),
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
    publisher: {
      "@type": "Organization",
      name: "HANOI DISCOVERY",
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${localePath(locale, item.path)}`,
    })),
  };
}
