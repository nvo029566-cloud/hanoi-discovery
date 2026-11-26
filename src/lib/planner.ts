import type { Destination } from "@/types/content";

export interface ItineraryDay {
  day: number;
  items: Destination[];
}

/**
 * Calculates the great-circle distance between two geographic coordinates in kilometers (Haversine formula).
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Calculates total route distance across a sequence of destinations with verified coordinates.
 */
export function calculateTotalRouteDistance(items: Destination[]): number {
  let total = 0;
  for (let i = 0; i < items.length - 1; i++) {
    const cur = items[i];
    const next = items[i + 1];
    if (cur.latitude && cur.longitude && next.latitude && next.longitude) {
      total += calculateDistanceKm(cur.latitude, cur.longitude, next.latitude, next.longitude);
    }
  }
  return Math.round(total * 10) / 10;
}

/**
 * Estimated travel time in minutes based on urban Hanoi speed (~15 km/h taxi or ~4.5 km/h walking).
 */
export function estimateTravelTimeMinutes(distanceKm: number): { walking: number; vehicle: number } {
  const walking = Math.max(Math.round((distanceKm / 4.5) * 60), 5);
  const vehicle = Math.max(Math.round((distanceKm / 18) * 60), 3);
  return { walking, vehicle };
}

/**
 * Planner: picks destinations that match the chosen categories and splits them evenly across the requested days.
 */
export function buildItinerary(
  destinations: Destination[],
  days: number,
  interests: string[] = [],
): ItineraryDay[] {
  const totalDays = Math.min(Math.max(Math.floor(days) || 1, 1), 7);
  const pool = interests.length ? destinations.filter((d) => interests.includes(d.category)) : destinations;
  const perDay = Math.max(Math.ceil(pool.length / totalDays), 1);
  return Array.from({ length: totalDays }, (_, i) => ({
    day: i + 1,
    items: pool.slice(i * perDay, (i + 1) * perDay),
  })).filter((d) => d.items.length > 0);
}
