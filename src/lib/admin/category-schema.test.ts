import { describe, expect, it } from "vitest";
import { parseCategoryForm } from "./category-schema";

const base = {
  slug: "di-tich",
  sortOrder: "3",
  nameVi: "Di tích",
  descriptionVi: "Các di tích lịch sử của Hà Nội.",
  nameEn: "",
  descriptionEn: "",
};

describe("parseCategoryForm", () => {
  it("accepts a Vietnamese-only category and parses the sort order", () => {
    const r = parseCategoryForm(base);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.sortOrder).toBe(3);
      expect(r.data.nameEn).toBeNull();
    }
  });

  it("rejects an invalid slug and a non-numeric sort order", () => {
    const r = parseCategoryForm({ ...base, slug: "Di Tích", sortOrder: "abc" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.fieldErrors.slug).toBeDefined();
      expect(r.fieldErrors.sortOrder).toBeDefined();
    }
  });

  it("requires a Vietnamese description", () => {
    const r = parseCategoryForm({ ...base, descriptionVi: "ngắn" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.fieldErrors.descriptionVi).toBeDefined();
  });

  it("requires English name and description together", () => {
    const onlyName = parseCategoryForm({ ...base, nameEn: "Heritage" });
    expect(onlyName.success).toBe(false);
    if (!onlyName.success) expect(onlyName.fieldErrors.descriptionEn).toBeDefined();

    const both = parseCategoryForm({ ...base, nameEn: "Heritage", descriptionEn: "Historic sites of Hanoi." });
    expect(both.success).toBe(true);
  });
});
