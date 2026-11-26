/**
 * Locale helpers. Vietnamese is the default and lives at the site root ("/destinations").
 * English lives under a prefix ("/en/destinations"). Account and admin pages are Vietnamese only for now.
 */
export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** "/en" and "/en/..." are English; everything else is Vietnamese. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "vi";
}

/** Removes the locale prefix: "/en/food" -> "/food", "/en" -> "/". */
export function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

/** Builds a path in the given locale from a locale-free path ("/food", "/destinations?q=a", "/"). */
export function localePath(locale: Locale, path: string): string {
  if (locale === "vi") return path;
  if (path === "/") return "/en";
  return `/en${path.startsWith("/") ? path : `/${path}`}`;
}

/** The same page in the other language (query string is not carried over). */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocale(pathname));
}
