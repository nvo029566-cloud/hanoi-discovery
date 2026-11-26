import { describe, expect, it } from "vitest";
import { mapDestination, mapFood, mapStory, present } from "./catalog-mappers";

describe("catalog mappers", () => {
  it("maps a destination using the Vietnamese translation", () => {
    const result = mapDestination({
      slug: "west-lake",
      category: { slug: "photography-spots" },
      translations: [
        { locale: "en", name: "West Lake", summary: "English" },
        { locale: "vi", name: "Hồ Tây", summary: "Tóm tắt" },
      ],
    });
    expect(result).toEqual({
      slug: "west-lake",
      name: "Hồ Tây",
      category: "photography-spots",
      summary: "Tóm tắt",
      latitude: null,
      longitude: null,
      sourceUrl: null,
    });
  });

  it("keeps coordinates and source when present", () => {
    const result = mapDestination({
      slug: "x",
      category: { slug: "c" },
      latitude: 21.02861,
      longitude: 105.83556,
      openingHours: "08:00 - 17:00",
      ticketInfo: "30.000 VNĐ",
      sourceUrl: "https://example.org/source",
      translations: [{ locale: "vi", name: "X", summary: "S" }],
    });
    expect(result).toMatchObject({
      latitude: 21.02861,
      longitude: 105.83556,
      openingHours: "08:00 - 17:00",
      ticketInfo: "30.000 VNĐ",
      sourceUrl: "https://example.org/source",
    });
  });

  it("skips rows without a Vietnamese translation", () => {
    const rows = [
      mapDestination({ slug: "a", category: { slug: "c" }, translations: [{ locale: "en", name: "A", summary: "s" }] }),
    ];
    expect(rows.filter(present)).toHaveLength(0);
  });

  it("maps food with the English name when available and no invented summary", () => {
    const food = mapFood({
      slug: "pho",
      translations: [
        { locale: "vi", name: "Phở", summary: "Món sáng" },
        { locale: "en", name: "Pho", summary: null },
      ],
    });
    expect(food).toEqual({ slug: "pho", name: "Phở", englishName: "Pho", summary: "Món sáng" });
  });

  it("maps story body paragraphs", () => {
    const story = mapStory({
      slug: "s",
      translations: [{ locale: "vi", title: "T", excerpt: "E", body: ["p1", "p2"] }],
    });
    expect(story?.body).toEqual(["p1", "p2"]);
  });
});

describe("catalog mappers (English)", () => {
  it("uses the English translation when it exists and falls back to Vietnamese otherwise", () => {
    const row = {
      slug: "west-lake",
      category: { slug: "photography-spots" },
      translations: [
        { locale: "vi", name: "Hồ Tây", summary: "Tóm tắt" },
        { locale: "en", name: "West Lake", summary: "Summary" },
      ],
    };
    expect(mapDestination(row, "en")).toMatchObject({ name: "West Lake", summary: "Summary" });
    expect(mapDestination({ ...row, translations: [row.translations[0]] }, "en")).toMatchObject({
      name: "Hồ Tây",
      summary: "Tóm tắt",
    });
  });

  it("still skips rows that have no Vietnamese translation", () => {
    const row = { slug: "a", category: { slug: "c" }, translations: [{ locale: "en", name: "A", summary: "s" }] };
    expect(mapDestination(row, "en")).toBeNull();
  });

  it("leads with the English food name on English pages", () => {
    const food = mapFood(
      {
        slug: "pho",
        translations: [
          { locale: "vi", name: "Phở", summary: "Món sáng" },
          { locale: "en", name: "Pho", summary: "A breakfast dish" },
        ],
      },
      "en",
    );
    expect(food).toEqual({ slug: "pho", name: "Pho", englishName: "", summary: "A breakfast dish" });
  });
});
