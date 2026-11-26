import { describe, expect, it } from "vitest";
import { withCoordinates } from "./content";

const base = { slug: "a", name: "A", category: "c", summary: "s" };

describe("withCoordinates", () => {
  it("keeps only destinations with valid numeric coordinates", () => {
    const result = withCoordinates([
      { ...base, slug: "ok", latitude: 21.03, longitude: 105.83 },
      { ...base, slug: "none" },
      { ...base, slug: "null", latitude: null, longitude: null },
      { ...base, slug: "half", latitude: 21.03, longitude: null },
      { ...base, slug: "out", latitude: 123, longitude: 105 },
    ]);
    expect(result.map((d) => d.slug)).toEqual(["ok"]);
  });
});
