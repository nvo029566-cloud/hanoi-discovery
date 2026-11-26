import { describe, expect, it } from "vitest";
import { sampleDestinations } from "@/data/sample";
import {
  buildItinerary,
  calculateDistanceKm,
  calculateTotalRouteDistance,
  estimateTravelTimeMinutes,
} from "./planner";

describe("distance calculations", () => {
  it("calculates accurate distance between coordinates", () => {
    // Hoan Kiem (21.0285, 105.8542) to Van Mieu (21.0286, 105.8356) is ~1.9 km
    const dist = calculateDistanceKm(21.0285, 105.8542, 21.0286, 105.8356);
    expect(dist).toBeGreaterThan(1.5);
    expect(dist).toBeLessThan(2.5);
  });

  it("calculates total route distance across destinations", () => {
    const subset = sampleDestinations.filter((d) => d.latitude && d.longitude).slice(0, 3);
    const total = calculateTotalRouteDistance(subset);
    expect(total).toBeGreaterThan(0);
  });

  it("estimates walking and vehicle time", () => {
    const time = estimateTravelTimeMinutes(2);
    expect(time.walking).toBeGreaterThan(time.vehicle);
  });
});

describe("buildItinerary", () => {
  it("splits all destinations across days without losing any", () => {
    const plan = buildItinerary(sampleDestinations, 2);
    expect(plan).toHaveLength(2);
    expect(plan.flatMap((d) => d.items)).toHaveLength(sampleDestinations.length);
  });

  it("filters by interests", () => {
    const plan = buildItinerary(sampleDestinations, 3, ["history-heritage"]);
    const all = plan.flatMap((d) => d.items);
    expect(all.length).toBeGreaterThan(0);
    expect(all.every((d) => d.category === "history-heritage")).toBe(true);
  });

  it("clamps invalid day counts and returns no empty days", () => {
    expect(buildItinerary(sampleDestinations, 0)).toHaveLength(1);
    expect(buildItinerary(sampleDestinations.slice(0, 1), 5)).toHaveLength(1);
  });

  it("returns an empty plan when nothing matches", () => {
    expect(buildItinerary([], 2)).toEqual([]);
  });
});
