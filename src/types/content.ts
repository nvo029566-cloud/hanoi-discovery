export type CategorySlug =
  | "history-heritage"
  | "food-drink"
  | "photography-spots"
  | "nature-relaxation"
  | "local-experiences"
  | "museums-art";

export interface Category {
  slug: string;
  name: string;
  description: string;
}

/** A cover image with the attribution that must be shown next to it. */
export interface CoverImage {
  id: string;
  alt: string;
  credit: string;
  license: string;
  sourceUrl: string | null;
}

export interface Destination {
  slug: string;
  name: string;
  category: string;
  summary: string;
  isSample?: boolean;
  /** Only set when a verified source exists (see sourceUrl). */
  latitude?: number | null;
  longitude?: number | null;
  openingHours?: string | null;
  ticketInfo?: string | null;
  sourceUrl?: string | null;
  image?: CoverImage;
}

export interface Food {
  slug: string;
  name: string;
  englishName: string;
  summary: string;
  image?: CoverImage;
}

export interface CultureItem {
  slug: string;
  name: string;
  summary: string;
  image?: CoverImage;
}

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image?: CoverImage;
}
