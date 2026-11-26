import type { Metadata } from "next";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export type StaticPageKey = "destinations" | "food" | "culture" | "stories" | "map" | "planner" | "about";

/** Canonical URL plus hreflang alternates for a locale-free path ("/food", "/"). */
export function alternatesFor(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(locale, path),
    languages: {
      vi: localePath("vi", path),
      en: localePath("en", path),
      "x-default": localePath("vi", path),
    },
  };
}

export function staticPageMetadata(locale: Locale, key: StaticPageKey): Metadata {
  const m = getMessages(locale);
  const page = m.pages[key];
  const description = key === "about" ? m.site.description : (m.pages[key] as { meta: string }).meta;
  return { title: page.eyebrow, description, alternates: alternatesFor(locale, `/${key}`) };
}

export function customPageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  return { title, description, alternates: alternatesFor(locale, path) };
}

export function homeMetadata(locale: Locale): Metadata {
  const m = getMessages(locale);
  return {
    title: { absolute: `${m.site.name} | ${m.site.tagline}` },
    description: m.site.description,
    alternates: alternatesFor(locale, "/"),
  };
}
