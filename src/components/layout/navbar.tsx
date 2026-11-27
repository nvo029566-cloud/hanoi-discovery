"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Search, ChevronDown } from "lucide-react";
import { mainNav } from "@/config/site";
import { localeFromPathname, localePath, stripLocale, switchLocalePath } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { MegaMenu } from "./mega-menu";
import { LanguageDropdown } from "./language-dropdown";
import { CommandPalette } from "@/components/search/command-palette";

export function Navbar({ authSlot }: { authSlot?: ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const m = getMessages(locale).nav;
  const base = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menu, setMenu] = useState<{ href: string; pathname: string } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openHref = menu?.pathname === pathname ? menu.href : null;
  const isSolid = base !== "/" || scrolled;
  const isActive = (href: string) => base === href || (href !== "/" && base.startsWith(href + "/"));

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const openSearch = () => {
      setMenu(null);
      setPaletteOpen(true);
    };
    window.addEventListener("open-command-palette", openSearch);
    return () => window.removeEventListener("open-command-palette", openSearch);
  }, []);

  useEffect(() => {
    if (!openHref) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setMenu(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenu(null);
      triggerRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnResize = () => setMenu(null);
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnResize);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnResize);
    };
  }, [openHref]);

  const textColor = isSolid ? "text-[#1D3C34] hover:text-[#775718]" : "text-[#F5F1E8] hover:text-[#F7D78A]";
  const activeColor = isSolid ? "text-[#775718] decoration-[#987022]" : "text-[#F7D78A] decoration-[#E5B34E]";

  return (
    <>
      <header className={`header-sticky-nav ${isSolid ? "header-mode-solid" : "header-mode-transparent"}`}>
        <div className="mx-auto flex h-18 w-full max-w-[1440px] items-center justify-between gap-2 px-3 sm:h-20 sm:px-6">
          <Logo isDark={!isSolid} locale={locale} />

          <nav
            ref={navRef}
            aria-label={m.mainMenu}
            className="hidden xl:block"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setMenu(null);
            }}
          >
            <ul className="flex items-center gap-2">
              {mainNav.map(({ href, key }) => {
                const active = isActive(href);
                const hasMenu = ["/destinations", "/food", "/culture"].includes(href);
                const expanded = openHref === href;
                const submenuId = `submenu-${key}`;
                return (
                  <li key={href}>
                    <div className="flex items-center">
                      <Link
                        href={localePath(locale, href)}
                        onClick={() => setMenu(null)}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-2 text-sm font-semibold transition-colors ${active ? `underline decoration-2 underline-offset-8 ${activeColor}` : textColor}`}
                      >
                        {m[key]}
                      </Link>
                      {hasMenu && (
                        <button
                          type="button"
                          aria-label={locale === "en" ? `${m[key]} submenu` : `Menu ${m[key]}`}
                          aria-expanded={expanded}
                          aria-controls={expanded ? submenuId : undefined}
                          className={`grid min-h-11 w-8 place-items-center rounded-md transition-colors ${textColor}`}
                          onClick={(event) => {
                            triggerRef.current = event.currentTarget;
                            setMenu(expanded ? null : { href, pathname });
                          }}
                        >
                          <ChevronDown className={`size-4 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    {expanded && <MegaMenu id={submenuId} activeHref={href} locale={locale} onClose={() => setMenu(null)} />}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <button
              type="button"
              aria-label={locale === "en" ? "Search (Ctrl+K)" : "Tìm kiếm (Ctrl+K)"}
              onClick={() => {
                setMenu(null);
                setPaletteOpen(true);
              }}
              className={`grid size-11 place-items-center rounded-lg transition-colors ${textColor}`}
            >
              <Search className="size-5" aria-hidden="true" />
            </button>
            <div className="hidden sm:block">
              <LanguageDropdown isDark={!isSolid} locale={locale} pathname={pathname} />
            </div>
            <div className="hidden sm:block">{authSlot}</div>
            <MobileNav
              isActive={isActive}
              locale={locale}
              switchHref={switchLocalePath(pathname, locale === "vi" ? "en" : "vi")}
              onOpenSearch={() => setPaletteOpen(true)}
              authSlot={authSlot}
              isDark={!isSolid}
            />
          </div>
        </div>
      </header>
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} locale={locale} />
    </>
  );
}
