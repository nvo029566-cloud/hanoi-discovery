"use client";

import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function SkipLink() {
  const m = getMessages(localeFromPathname(usePathname())).nav;
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[10px] focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
    >
      {m.skipToContent}
    </a>
  );
}
