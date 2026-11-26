import { describe, expect, it } from "vitest";
import { sampleDestinations } from "@/data/sample";
import {
  filterDestinationsAdvanced,
  getDestinationDistrict,
  isFreeAdmission,
} from "./destination-filters";

describe("destination-filters", () => {
  it("resolves district for known destinations", () => {
    expect(getDestinationDistrict("hoan-kiem-lake")).toBe("hoan-kiem");
    expect(getDestinationDistrict("ho-chi-minh-mausoleum")).toBe("ba-dinh");
    expect(getDestinationDistrict("west-lake")).toBe("tay-ho");
  });

  it("identifies free and paid admission", () => {
    const hoanKiem = sampleDestinations.find((d) => d.slug === "hoan-kiem-lake")!;
    const vanMieu = sampleDestinations.find((d) => d.slug === "temple-of-literature")!;
    expect(isFreeAdmission(hoanKiem)).toBe(true);
    expect(isFreeAdmission(vanMieu)).toBe(false);
  });

  it("filters by district and fee", () => {
    const hoanKiemDestinations = filterDestinationsAdvanced(sampleDestinations, { district: "hoan-kiem" });
    expect(hoanKiemDestinations.length).toBeGreaterThan(0);
    expect(hoanKiemDestinations.every((d) => getDestinationDistrict(d.slug) === "hoan-kiem")).toBe(true);

    const freeDestinations = filterDestinationsAdvanced(sampleDestinations, { fee: "free" });
    expect(freeDestinations.every((d) => isFreeAdmission(d))).toBe(true);

    const paidDestinations = filterDestinationsAdvanced(sampleDestinations, { fee: "paid" });
    expect(paidDestinations.every((d) => !isFreeAdmission(d))).toBe(true);
  });
});
