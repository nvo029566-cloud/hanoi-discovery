"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPathname } from "@/i18n/locales";

/**
 * The root layout is shared by both languages, so the server renders lang="vi".
 * This keeps <html lang> in step with the page language after hydration.
 */
export function HtmlLang() {
  const locale = localeFromPathname(usePathname());
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
