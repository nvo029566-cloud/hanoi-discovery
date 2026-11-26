"use client";

import { useState } from "react";
import { Compass } from "lucide-react";
import { VirtualTour360Modal, TOUR_360_SCENES } from "./tour-360-modal";
import type { Locale } from "@/i18n/locales";

export function Tour360Button({
  slug,
  locale = "vi",
}: {
  slug: string;
  locale?: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Find matching scene for this destination slug
  const matchedScene = TOUR_360_SCENES.find((s) => s.destinationSlug === slug) ?? TOUR_360_SCENES[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-[8px] bg-amber-500/15 border border-amber-500/30 px-4 text-sm font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 transition-colors"
      >
        <Compass className="size-4 animate-spin-slow" />
        <span>{locale === "en" ? "Explore 360° VR Tour" : "Khám phá Tour 360° VR"}</span>
      </button>

      <VirtualTour360Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialSceneId={matchedScene.id}
        locale={locale}
      />
    </>
  );
}
