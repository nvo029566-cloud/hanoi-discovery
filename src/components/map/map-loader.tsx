"use client";

import dynamic from "next/dynamic";
import { getMessages } from "@/i18n/messages";
import type { Locale } from "@/i18n/locales";
import type { MappableDestination } from "@/lib/content";

// Leaflet touches `window`, so it must only load in the browser.
const HanoiMap = dynamic(() => import("./hanoi-map").then((m) => m.HanoiMap), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

// The loading placeholder has no props, so it reads the language from the page URL.
function MapSkeleton() {
  const path = typeof window === "undefined" ? "" : window.location.pathname;
  const locale: Locale = path === "/en" || path.startsWith("/en/") ? "en" : "vi";
  return (
    <div
      role="status"
      aria-label={getMessages(locale).map.loading}
      className="h-[32rem] w-full animate-pulse rounded-[16px] bg-muted"
    />
  );
}

export function MapLoader({
  points,
  locale = "vi",
  selectedSlug,
  showRoute,
  onSelectPoint,
}: {
  points: MappableDestination[];
  locale?: Locale;
  selectedSlug?: string;
  showRoute?: boolean;
  onSelectPoint?: (slug: string) => void;
}) {
  return (
    <HanoiMap
      points={points}
      locale={locale}
      selectedSlug={selectedSlug}
      showRoute={showRoute}
      onSelectPoint={onSelectPoint}
    />
  );
}
