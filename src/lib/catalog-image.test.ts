import { describe, expect, it } from "vitest";
import { mapCulture, mapDestination, mapFood, mapStory, withImage } from "./catalog-mappers";

const image = {
  id: "img1",
  altVi: "Hồ Gươm buổi sáng",
  altEn: "Hoan Kiem Lake in the morning",
  credit: "Nguyễn Văn A",
  license: "CC BY 4.0",
  sourceUrl: "https://example.org/photo",
};

describe("withImage", () => {
  it("returns nothing when there is no image", () => {
    expect(withImage(null, "vi")).toEqual({});
    expect(withImage(undefined, "en")).toEqual({});
  });

  it("uses the Vietnamese alt text, and the English one on English pages when present", () => {
    expect(withImage(image, "vi").image?.alt).toBe("Hồ Gươm buổi sáng");
    expect(withImage(image, "en").image?.alt).toBe("Hoan Kiem Lake in the morning");
    expect(withImage({ ...image, altEn: null }, "en").image?.alt).toBe("Hồ Gươm buổi sáng");
  });

  it("keeps the attribution", () => {
    expect(withImage(image, "vi").image).toMatchObject({ id: "img1", credit: "Nguyễn Văn A", license: "CC BY 4.0" });
  });
});

describe("mappers pass the cover image through", () => {
  it("maps it for destinations, food, culture and stories", () => {
    const vi = { locale: "vi" };
    expect(mapDestination({ slug: "a", category: { slug: "c" }, image, translations: [{ ...vi, name: "A", summary: "s" }] })?.image?.id).toBe("img1");
    expect(mapFood({ slug: "f", image, translations: [{ ...vi, name: "F", summary: null }] })?.image?.id).toBe("img1");
    expect(mapCulture({ slug: "c", image, translations: [{ ...vi, name: "C", summary: "s" }] })?.image?.id).toBe("img1");
    expect(mapStory({ slug: "s", image, translations: [{ ...vi, title: "S", excerpt: "e", body: [] }] })?.image?.id).toBe("img1");
  });

  it("leaves items without an image unchanged", () => {
    const food = mapFood({ slug: "f", translations: [{ locale: "vi", name: "F", summary: null }] });
    expect(food).toEqual({ slug: "f", name: "F", englishName: "", summary: "" });
  });
});
