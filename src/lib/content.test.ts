import { describe, expect, it } from "vitest";
import { sampleCategories, sampleDestinations } from "@/data/sample";
import { filterDestinations, getBySlug, isCategorySlug, relatedDestinations } from "./content";

describe("filterDestinations", () => {
  it("returns everything with no filters", () => {
    expect(filterDestinations(sampleDestinations, sampleCategories, "")).toHaveLength(sampleDestinations.length);
  });

  it("matches without accents", () => {
    const names = filterDestinations(sampleDestinations, sampleCategories, "ho hoan kiem").map((d) => d.name);
    expect(names).toContain("Hồ Hoàn Kiếm");
  });

  it("filters by category", () => {
    const result = filterDestinations(sampleDestinations, sampleCategories, "", "history-heritage");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((d) => d.category === "history-heritage")).toBe(true);
  });

  it("combines query and category", () => {
    expect(filterDestinations(sampleDestinations, sampleCategories, "ho tay", "history-heritage")).toHaveLength(0);
  });
});

describe("lookups", () => {
  it("finds by slug and returns undefined for unknown", () => {
    expect(getBySlug(sampleDestinations, "west-lake")?.name).toBe("Hồ Tây");
    expect(getBySlug(sampleDestinations, "nope")).toBeUndefined();
  });

  it("validates category slugs against the given categories", () => {
    expect(isCategorySlug(sampleCategories, "food-drink")).toBe(true);
    expect(isCategorySlug(sampleCategories, "nope")).toBe(false);
  });

  it("related destinations share the category and exclude itself", () => {
    const d = getBySlug(sampleDestinations, "temple-of-literature")!;
    const related = relatedDestinations(sampleDestinations, d);
    expect(related.every((r) => r.category === d.category && r.slug !== d.slug)).toBe(true);
  });
});
