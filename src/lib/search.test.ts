import { describe, expect, it } from "vitest";
import { matchesQuery, normalizeVietnamese } from "./search";

describe("normalizeVietnamese", () => {
  it("removes diacritics and lowercases", () => {
    expect(normalizeVietnamese("Hồ Hoàn Kiếm")).toBe("ho hoan kiem");
  });
  it("maps đ and Đ to d", () => {
    expect(normalizeVietnamese("Đường Đê La Thành")).toBe("duong de la thanh");
  });
  it("collapses whitespace and trims", () => {
    expect(normalizeVietnamese("  Văn   Miếu ")).toBe("van mieu");
  });
  it("returns empty string for empty input", () => {
    expect(normalizeVietnamese("")).toBe("");
  });
});

describe("matchesQuery", () => {
  it("matches without accents", () => {
    expect(matchesQuery("Văn Miếu - Quốc Tử Giám", "van mieu")).toBe(true);
  });
  it("matches with accents against plain text", () => {
    expect(matchesQuery("Pho Bat Dan", "phở")).toBe(true);
  });
  it("requires every word to match", () => {
    expect(matchesQuery("Hồ Tây", "ho kiem")).toBe(false);
  });
  it("matches everything for an empty query", () => {
    expect(matchesQuery("Hồ Tây", "")).toBe(true);
  });
});
