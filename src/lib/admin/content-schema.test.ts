import { describe, expect, it } from "vitest";
import { parseContentForm } from "./content-schema";

const base = {
  slug: "pho-bo",
  status: "DRAFT",
  nameVi: "Phở bò",
  summaryVi: "",
  bodyVi: "",
  nameEn: "",
  summaryEn: "",
  bodyEn: "",
};

describe("parseContentForm", () => {
  it("accepts a minimal food (Vietnamese name only)", () => {
    const r = parseContentForm("food", base);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.summaryVi).toBeNull();
  });

  it("requires a Vietnamese summary for culture", () => {
    const r = parseContentForm("culture", base);
    expect(r.success).toBe(false);
    if (!r.success) expect(r.fieldErrors.summaryVi).toBeDefined();
  });

  it("requires body paragraphs for a story and splits them on blank lines", () => {
    const empty = parseContentForm("story", { ...base, summaryVi: "Một đoạn trích đủ dài." });
    expect(empty.success).toBe(false);
    const ok = parseContentForm("story", {
      ...base,
      summaryVi: "Một đoạn trích đủ dài.",
      bodyVi: "Đoạn một.\n\nĐoạn hai.\n \n\nĐoạn ba.",
    });
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data.bodyVi).toEqual(["Đoạn một.", "Đoạn hai.", "Đoạn ba."]);
  });

  it("treats the English version of culture as all-or-nothing", () => {
    const half = parseContentForm("culture", { ...base, summaryVi: "Mô tả đủ dài rồi.", nameEn: "Water puppetry" });
    expect(half.success).toBe(false);
    if (!half.success) expect(half.fieldErrors.summaryEn).toBeDefined();
  });

  it("allows an English food name without a summary, but not a summary without a name", () => {
    expect(parseContentForm("food", { ...base, nameEn: "Beef noodle soup" }).success).toBe(true);
    const r = parseContentForm("food", { ...base, summaryEn: "A soup." });
    expect(r.success).toBe(false);
  });

  it("rejects an invalid slug", () => {
    const r = parseContentForm("food", { ...base, slug: "Phở Bò" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.fieldErrors.slug).toBeDefined();
  });
});
