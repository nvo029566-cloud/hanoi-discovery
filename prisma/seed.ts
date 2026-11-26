/**
 * Seeds the database with the labeled SAMPLE content from src/data/sample.ts.
 * Every row is marked isSample = true. No coordinates, hours, prices or ratings
 * are invented. Safe to re-run: rows are upserted by slug.
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  sampleCategories,
  sampleCulture,
  sampleDestinations,
  sampleFoods,
  sampleStories,
} from "../src/data/sample";
import {
  sampleCategoriesEn,
  sampleCultureEn,
  sampleDestinationsEn,
  sampleFoodsEn,
  sampleStoriesEn,
} from "../src/data/sample-en";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

/**
 * Coordinates are set ONLY where a source states them (decimal degrees as printed by the source).
 * Places not listed here keep null coordinates and never appear on the map.
 * Source: the English Wikipedia article of each place (checked 2026-11-19).
 */
const verifiedCoordinates: Record<string, { latitude: number; longitude: number; sourceUrl: string }> = {
  "temple-of-literature": {
    latitude: 21.02861,
    longitude: 105.83556,
    sourceUrl: "https://en.wikipedia.org/wiki/Temple_of_Literature,_Hanoi",
  },
  "imperial-citadel-of-thang-long": {
    latitude: 21.03944,
    longitude: 105.83722,
    sourceUrl: "https://en.wikipedia.org/wiki/Imperial_Citadel_of_Th%C4%83ng_Long",
  },
  "vietnam-museum-of-ethnology": {
    latitude: 21.0406,
    longitude: 105.7987,
    sourceUrl: "https://en.wikipedia.org/wiki/Vietnam_Museum_of_Ethnology",
  },
};

async function main() {
  const categoryIds = new Map<string, string>();

  for (const [i, c] of sampleCategories.entries()) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { sortOrder: i },
      create: { slug: c.slug, sortOrder: i },
    });
    categoryIds.set(c.slug, row.id);
    await prisma.categoryTranslation.upsert({
      where: { categoryId_locale: { categoryId: row.id, locale: "vi" } },
      update: { name: c.name, description: c.description },
      create: { categoryId: row.id, locale: "vi", name: c.name, description: c.description },
    });
    const en = sampleCategoriesEn[c.slug];
    if (en) {
      await prisma.categoryTranslation.upsert({
        where: { categoryId_locale: { categoryId: row.id, locale: "en" } },
        update: en,
        create: { categoryId: row.id, locale: "en", ...en },
      });
    }
  }

  for (const d of sampleDestinations) {
    const categoryId = categoryIds.get(d.category);
    if (!categoryId) throw new Error(`Unknown category: ${d.category}`);
    const geo = verifiedCoordinates[d.slug] ?? (
      d.latitude !== null && d.longitude !== null
        ? { latitude: d.latitude, longitude: d.longitude }
        : { latitude: null, longitude: null }
    );
    const facts = {
      openingHours: d.openingHours ?? null,
      ticketInfo: d.ticketInfo ?? null,
      ...(d.sourceUrl ? { sourceUrl: d.sourceUrl } : {}),
    };
    const row = await prisma.destination.upsert({
      where: { slug: d.slug },
      update: { categoryId, status: "PUBLISHED", isSample: true, ...facts, ...geo },
      create: { slug: d.slug, categoryId, status: "PUBLISHED", isSample: true, ...facts, ...geo },
    });
    await prisma.destinationTranslation.upsert({
      where: { destinationId_locale: { destinationId: row.id, locale: "vi" } },
      update: { name: d.name, summary: d.summary },
      create: { destinationId: row.id, locale: "vi", name: d.name, summary: d.summary },
    });
    const en = sampleDestinationsEn[d.slug];
    if (en) {
      await prisma.destinationTranslation.upsert({
        where: { destinationId_locale: { destinationId: row.id, locale: "en" } },
        update: en,
        create: { destinationId: row.id, locale: "en", ...en },
      });
    }
  }

  for (const f of sampleFoods) {
    const row = await prisma.food.upsert({
      where: { slug: f.slug },
      update: { status: "PUBLISHED", isSample: true },
      create: { slug: f.slug, status: "PUBLISHED", isSample: true },
    });
    await prisma.foodTranslation.upsert({
      where: { foodId_locale: { foodId: row.id, locale: "vi" } },
      update: { name: f.name, summary: f.summary },
      create: { foodId: row.id, locale: "vi", name: f.name, summary: f.summary },
    });
    // English: the name plus a translation of the Vietnamese sample summary.
    const enSummary = sampleFoodsEn[f.slug] ?? null;
    await prisma.foodTranslation.upsert({
      where: { foodId_locale: { foodId: row.id, locale: "en" } },
      update: { name: f.englishName, summary: enSummary },
      create: { foodId: row.id, locale: "en", name: f.englishName, summary: enSummary },
    });
  }

  for (const c of sampleCulture) {
    const row = await prisma.cultureItem.upsert({
      where: { slug: c.slug },
      update: { status: "PUBLISHED", isSample: true },
      create: { slug: c.slug, status: "PUBLISHED", isSample: true },
    });
    await prisma.cultureItemTranslation.upsert({
      where: { cultureItemId_locale: { cultureItemId: row.id, locale: "vi" } },
      update: { name: c.name, summary: c.summary },
      create: { cultureItemId: row.id, locale: "vi", name: c.name, summary: c.summary },
    });
    const en = sampleCultureEn[c.slug];
    if (en) {
      await prisma.cultureItemTranslation.upsert({
        where: { cultureItemId_locale: { cultureItemId: row.id, locale: "en" } },
        update: en,
        create: { cultureItemId: row.id, locale: "en", ...en },
      });
    }
  }

  for (const s of sampleStories) {
    const row = await prisma.story.upsert({
      where: { slug: s.slug },
      update: { status: "PUBLISHED", isSample: true },
      create: { slug: s.slug, status: "PUBLISHED", isSample: true, publishedAt: new Date() },
    });
    await prisma.storyTranslation.upsert({
      where: { storyId_locale: { storyId: row.id, locale: "vi" } },
      update: { title: s.title, excerpt: s.excerpt, body: s.body },
      create: { storyId: row.id, locale: "vi", title: s.title, excerpt: s.excerpt, body: s.body },
    });
    const en = sampleStoriesEn[s.slug];
    if (en) {
      await prisma.storyTranslation.upsert({
        where: { storyId_locale: { storyId: row.id, locale: "en" } },
        update: en,
        create: { storyId: row.id, locale: "en", ...en },
      });
    }
  }

  console.log(
    `Seeded sample content: ${sampleCategories.length} categories, ${sampleDestinations.length} destinations, ` +
      `${sampleFoods.length} foods, ${sampleCulture.length} culture items, ${sampleStories.length} stories.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
