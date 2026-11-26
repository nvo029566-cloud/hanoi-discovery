import { describe, expect, it } from "vitest";
import { sampleServices } from "@/data/sample-services";
import { TOUR_360_SCENES } from "@/components/virtual-tour/tour-360-modal";

describe("Tourism Services Hub Data", () => {
  it("contains at least 6 verified municipal tourism services", () => {
    expect(sampleServices.length).toBeGreaterThanOrEqual(6);
  });

  it("ensures each service has valid booking and price metadata", () => {
    for (const service of sampleServices) {
      expect(service.id).toBeTruthy();
      expect(service.nameVi).toBeTruthy();
      expect(service.nameEn).toBeTruthy();
      expect(service.priceVi).toBeTruthy();
      expect(service.priceEn).toBeTruthy();
      expect(service.bookingUrl).toMatch(/^https?:\/\//);
      expect(service.highlightsVi.length).toBeGreaterThan(0);
      expect(service.highlightsEn.length).toBeGreaterThan(0);
    }
  });

  it("covers both city tour transport, water puppet, and night tours", () => {
    const slugs = sampleServices.map((s) => s.slug);
    expect(slugs).toContain("hanoi-city-tour-bus");
    expect(slugs).toContain("thang-long-water-puppet");
    expect(slugs).toContain("hoang-thanh-night-tour");
    expect(slugs).toContain("hoa-lo-prison-night-tour");
  });
});

describe("Virtual Tour 360 Scenes", () => {
  it("defines iconic Hanoi heritage 360 scenes", () => {
    expect(TOUR_360_SCENES.length).toBeGreaterThanOrEqual(4);
    const sceneIds = TOUR_360_SCENES.map((s) => s.id);
    expect(sceneIds).toContain("van-mieu");
    expect(sceneIds).toContain("ho-hoan-kiem");
    expect(sceneIds).toContain("hoang-thanh");
    expect(sceneIds).toContain("chua-tran-quoc");
  });

  it("ensures hotspots have valid spherical coordinates", () => {
    for (const scene of TOUR_360_SCENES) {
      expect(scene.hotspots.length).toBeGreaterThan(0);
      for (const h of scene.hotspots) {
        expect(h.yaw).toBeGreaterThanOrEqual(-180);
        expect(h.yaw).toBeLessThanOrEqual(180);
        expect(h.pitch).toBeGreaterThanOrEqual(-45);
        expect(h.pitch).toBeLessThanOrEqual(45);
        expect(h.titleVi).toBeTruthy();
        expect(h.descVi).toBeTruthy();
      }
    }
  });
});
