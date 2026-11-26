import { describe, expect, it } from "vitest";
import { parseDestinationForm } from "./destination-schema";

const base = {
  slug: "ho-hoan-kiem",
  categoryId: "cat1",
  status: "DRAFT",
  nameVi: "Hồ Hoàn Kiếm",
  summaryVi: "Hồ nước nằm giữa trung tâm Hà Nội.",
  nameEn: "",
  summaryEn: "",
  latitude: "",
  longitude: "",
  openingHours: "",
  ticketInfo: "",
  sourceUrl: "",
};

describe("parseDestinationForm", () => {
  it("accepts a minimal draft and turns blanks into null", () => {
    const r = parseDestinationForm(base);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.nameEn).toBeNull();
      expect(r.data.latitude).toBeNull();
      expect(r.data.sourceUrl).toBeNull();
    }
  });

  it("normalizes slug case and rejects invalid slugs", () => {
    const ok = parseDestinationForm({ ...base, slug: "  Ho-Hoan-Kiem " });
    expect(ok.success && ok.data.slug).toBe("ho-hoan-kiem");
    for (const bad of ["ho hoan kiem", "hồ-hoàn-kiếm", "-abc", "abc-", "a"]) {
      const r = parseDestinationForm({ ...base, slug: bad });
      expect(r.success).toBe(false);
      if (!r.success) expect(r.fieldErrors.slug).toBeTruthy();
    }
  });

  it("requires a source URL when coordinates, hours or tickets are given", () => {
    for (const extra of [
      { latitude: "21.0285", longitude: "105.8542" },
      { openingHours: "08:00-17:00" },
      { ticketInfo: "Miễn phí" },
    ]) {
      const r = parseDestinationForm({ ...base, ...extra });
      expect(r.success).toBe(false);
      if (!r.success) expect(r.fieldErrors.sourceUrl).toBeTruthy();
    }
    const withSource = parseDestinationForm({
      ...base,
      latitude: "21.0285",
      longitude: "105.8542",
      sourceUrl: "https://example.org/source",
    });
    expect(withSource.success).toBe(true);
    if (withSource.success) expect(withSource.data.latitude).toBe(21.0285);
  });

  it("needs both latitude and longitude, within range, as numbers", () => {
    const onlyLat = parseDestinationForm({ ...base, latitude: "21.0", sourceUrl: "https://example.org" });
    expect(onlyLat.success).toBe(false);
    if (!onlyLat.success) expect(onlyLat.fieldErrors.longitude).toBeTruthy();

    const outOfRange = parseDestinationForm({
      ...base,
      latitude: "95",
      longitude: "105",
      sourceUrl: "https://example.org",
    });
    expect(outOfRange.success).toBe(false);
    if (!outOfRange.success) expect(outOfRange.fieldErrors.latitude).toBeTruthy();

    const comma = parseDestinationForm({
      ...base,
      latitude: "21,0285",
      longitude: "105.8",
      sourceUrl: "https://example.org",
    });
    expect(comma.success).toBe(false);
  });

  it("requires English name and summary together", () => {
    const r = parseDestinationForm({ ...base, nameEn: "Hoan Kiem Lake" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.fieldErrors.summaryEn).toBeTruthy();
    const both = parseDestinationForm({
      ...base,
      nameEn: "Hoan Kiem Lake",
      summaryEn: "A lake in the center of Hanoi.",
    });
    expect(both.success).toBe(true);
  });

  it("rejects non-http source URLs and short required text", () => {
    const badUrl = parseDestinationForm({ ...base, openingHours: "x", sourceUrl: "ftp://example.org/a" });
    expect(badUrl.success).toBe(false);
    const short = parseDestinationForm({ ...base, nameVi: "A", summaryVi: "ngắn" });
    expect(short.success).toBe(false);
    if (!short.success) {
      expect(short.fieldErrors.nameVi).toBeTruthy();
      expect(short.fieldErrors.summaryVi).toBeTruthy();
    }
  });
});
