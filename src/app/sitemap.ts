import type { MetadataRoute } from "next";
import { localePath } from "@/i18n/locales";
import { getCatalog } from "@/lib/catalog";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { destinations, foods, culture, stories } = await getCatalog("vi");
  const staticPaths = [
    "/",
    "/destinations",
    "/food",
    "/culture",
    "/stories",
    "/map",
    "/planner",
    "/guide",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ];
  const dynamicPaths = [
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...foods.map((f) => `/food/${f.slug}`),
    ...culture.map((c) => `/culture/${c.slug}`),
    ...stories.map((s) => `/stories/${s.slug}`),
  ];
  // Every public page exists in both languages; each entry lists its alternates.
  return [...staticPaths, ...dynamicPaths].flatMap((path) =>
    (["vi", "en"] as const).map((locale) => ({
      url: `${base}${localePath(locale, path)}`,
      alternates: {
        languages: { vi: `${base}${localePath("vi", path)}`, en: `${base}${localePath("en", path)}` },
      },
    })),
  );
}
