import { describe, expect, it } from "vitest";
import { sampleCulture, sampleFoods, sampleStories } from "@/data/sample";
import { filterFoods, getBySlug } from "./content";

describe("foods, culture, stories", () => {
  it("filters foods without accents and by English name", () => {
    expect(filterFoods(sampleFoods, "ca phe trung").map((f) => f.slug)).toContain("egg-coffee");
    expect(filterFoods(sampleFoods, "pho").map((f) => f.slug)).toContain("pho");
    expect(filterFoods(sampleFoods, "")).toHaveLength(sampleFoods.length);
  });

  it("looks up by slug and returns undefined for unknown", () => {
    expect(getBySlug(sampleFoods, "pho")?.name).toBe("Phở");
    expect(getBySlug(sampleCulture, "ca-tru")?.name).toBe("Ca trù");
    expect(getBySlug(sampleStories, "walking-the-old-quarter")?.body.length).toBeGreaterThan(0);
    expect(getBySlug(sampleFoods, "x")).toBeUndefined();
  });
});
