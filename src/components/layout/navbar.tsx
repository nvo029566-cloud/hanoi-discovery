"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Search, ChevronDown, Sun } from "lucide-react";
import { mainNav } from "@/config/site";
import { localeFromPathname, localePath, stripLocale, switchLocalePath } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { MegaMenu } from "./mega-menu";
import { LanguageDropdown } from "./language-dropdown";
import { CommandPalette } from "@/components/search/command-palette";

/** `authSlot` is a server-rendered element (sign-in link or profile link) passed in from the layout. */
export function Navbar({ authSlot }: { authSlot?: ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const m = getMessages(locale).nav;
  const base = stripLocale(pathname);
  const isHome = base === "/";
  const switchHref = switchLocalePath(pathname, locale === "vi" ? "en" : "vi");

  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("/");
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Subpages without Hero section use solid ivory header immediately
  const isSolid = !isHome || scrolled;

  // Center navigation items: All 7 items
  const centerNavItems = mainNav;

  // Passive scroll listener: only trigger state update when crossing 60px threshold
  useEffect(() => {
    let lastScrolled = window.scrollY > 60;
    if (lastScrolled) {
      requestAnimationFrame(() => setScrolled(true));
    }

    const onScroll = () => {
      const isOver60 = window.scrollY > 60;
      if (isOver60 !== lastScrolled) {
        lastScrolled = isOver60;
        setScrolled(isOver60);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On homepage, track visible section for accurate active menu state
  useEffect(() => {
    if (!isHome) {
      return;
    }

    const sectionElements = Array.from(
      document.querySelectorAll<HTMLElement>("[id]")
    ).filter((el) =>
      ["hero", "destinations", "food", "culture", "guide", "about"].includes(el.id)
    );

    if (sectionElements.length === 0) return;

    const updateActiveNav = () => {
      const scrollY = window.scrollY;
      if (scrollY < 120) {
        setActiveSection("/");
        return;
      }

      const detectionLine = 120;
      let matchedHref = "/";

      for (const section of sectionElements) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= detectionLine && rect.bottom > detectionLine) {
          const map: Record<string, string> = {
            hero: "/",
            destinations: "/destinations",
            food: "/food",
            culture: "/culture",
            guide: "/guide",
            about: "/about",
          };
          matchedHref = map[section.id] ?? "/";
          break;
        }
      }

      setActiveSection(matchedHref);
    };

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveNav);
  }, [isHome]);

  // Listen to open-command-palette event from anywhere (e.g. keyboard shortcuts Ctrl+K)
  useEffect(() => {
    function handleOpen() {
      setPaletteOpen(true);
    }
    window.addEventListener("open-command-palette", handleOpen);
    return () => window.removeEventListener("open-command-palette", handleOpen);
  }, []);

  // Reset mega menu on route change without effect cascading setState
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setHoveredNav(null);
  }

  // Determine active status: dynamically matches current section on home, or route on subpages
  const isActive = (href: string) => {
    if (isHome) {
      return activeSection === href;
    }
    return href === "/" ? base === "/" : base.startsWith(href);
  };

  // Smooth scroll handler on homepage menu clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome) {
      const sectionMap: Record<string, string> = {
        "/": "hero",
        "/destinations": "destinations",
        "/food": "food",
        "/culture": "culture",
        "/planner": "planner",
        "/guide": "guide",
        "/about": "about",
      };
      const targetId = sectionMap[href];
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
          setHoveredNav(null);
        }
      }
    }
  };

  // Hover handlers for Mega Menu with debounce buffer
  const handleNavItemMouseEnter = (href: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (["/destinations", "/food", "/culture"].includes(href)) {
      setHoveredNav(href);
    } else {
      setHoveredNav(null);
    }
  };

  const handleNavItemMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setHoveredNav(null);
    }, 180);
  };

  const handleMegaMenuMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handleMegaMenuMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setHoveredNav(null);
    }, 180);
  };

  return (
    <>
      <header
        className={`header-sticky-nav ${
          isSolid ? "header-mode-solid" : "header-mode-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] w-full items-center justify-between gap-2 px-3 sm:px-4 md:px-5 lg:px-6 h-18 sm:h-20">
          {/* Brand Logo & Crest */}
          <div className="flex items-center justify-start shrink-0">
            <Logo isDark={!isSolid} locale={locale} />
          </div>

          {/* Center Navigation Links: Flat elegant typography with animated golden underline */}
          <nav aria-label={m.mainMenu} className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4">
            <ul className="flex items-center justify-center gap-1 xl:gap-2">
              {centerNavItems.map((item) => {
                const active = isActive(item.href);
                const hasMegaMenu = ["/destinations", "/food", "/culture"].includes(item.href);
                const isMenuOpen = hoveredNav === item.href;

                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => handleNavItemMouseEnter(item.href)}
                    onMouseLeave={handleNavItemMouseLeave}
                    className="relative"
                  >
                    <Link
                      href={localePath(locale, item.href)}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[14px] xl:text-[15px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 rounded-md ${
                        isSolid
                          ? active
                            ? "text-[#987022] font-semibold"
                            : isMenuOpen
                              ? "text-[#987022]"
                              : "text-[#1D3C34] hover:text-[#987022]"
                          : active
                            ? "text-[#E5B34E] font-semibold"
                            : isMenuOpen
                              ? "text-[#E5B34E]"
                              : "text-[#F5F1E8] hover:text-[#E5B34E]"
                      }`}
                    >
                      <span>{m[item.key]}</span>
                      {hasMegaMenu && (
                        <ChevronDown
                          className={`size-3.5 transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isMenuOpen ? "rotate-180" : ""
                          } ${
                            isSolid
                              ? active || isMenuOpen
                                ? "text-[#987022]"
                                : "text-[#1D3C34]/60 group-hover:text-[#987022]"
                              : active || isMenuOpen
                                ? "text-[#E5B34E]"
                                : "text-[#F5F1E8]/70 group-hover:text-[#E5B34E]"
                          }`}
                          aria-hidden="true"
                        />
                      )}

                      {/* Animated Golden Underline (extends left to right on hover, persists on active) */}
                      <span
                        className={`absolute bottom-0.5 inset-x-3 h-[2px] rounded-full transition-transform duration-300 ease-out origin-left pointer-events-none ${
                          isSolid ? "bg-[#987022]" : "bg-[#E5B34E]"
                        } ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Tools: Search, Weather, Language Dropdown, Divider, Auth CTA, Mobile Nav (Section 3.3) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Icon Button - unboxed, ample hit area */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label={locale === "en" ? "Search destinations & stories (Ctrl+K)" : "Tìm kiếm điểm đến & cẩm nang (Ctrl+K)"}
              title={locale === "en" ? "Search (Ctrl+K)" : "Tìm kiếm (Ctrl+K)"}
              className={`inline-flex size-9 sm:size-10 items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 shrink-0 cursor-pointer ${
                isSolid
                  ? "text-[#1D3C34] hover:text-[#987022] hover:bg-[#1D3C34]/5 focus-visible:outline-[#1D3C34]"
                  : "text-[#F5F1E8] hover:text-[#E5B34E] hover:bg-white/10 focus-visible:outline-white"
              }`}
            >
              <Search className="size-4.5" aria-hidden="true" />
            </button>

            {/* Weather Info - unboxed, clean minimal indicator */}
            <div
              className={`hidden xl:inline-flex items-center gap-1.5 px-2 py-1 text-xs pointer-events-none transition-colors duration-200 ${
                isSolid ? "text-[#1D3C34]" : "text-[#F5F1E8]/90"
              }`}
            >
              <Sun className={`size-3.5 ${isSolid ? "text-[#987022]" : "text-[#E5B34E]"}`} aria-hidden="true" />
              <span className="font-medium tracking-wide">24°C Hà Nội</span>
            </div>

            {/* Language Switcher - unboxed dropdown */}
            <div className="hidden sm:block">
              <LanguageDropdown isDark={!isSolid} locale={locale} pathname={pathname} />
            </div>

            {/* Subtle Vertical Divider between utilities and primary Auth CTA */}
            <div
              className={`hidden sm:block h-4 w-px transition-colors duration-200 ${
                isSolid ? "bg-[#1D3C34]/15" : "bg-white/20"
              }`}
              aria-hidden="true"
            />

            {/* Primary Action Auth Button */}
            <div className="hidden sm:block">
              {authSlot}
            </div>

            {/* Mobile Nav Drawer Button */}
            <MobileNav
              isActive={isActive}
              locale={locale}
              switchHref={switchHref}
              onOpenSearch={() => setPaletteOpen(true)}
              authSlot={authSlot}
              isDark={!isSolid}
            />
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <div className="hidden lg:block">
          <MegaMenu
            activeHref={hoveredNav}
            locale={locale}
            onClose={() => setHoveredNav(null)}
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
          />
        </div>
      </header>

      {/* Global Command Palette Dialog (accessible via search button & Ctrl+K) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        locale={locale}
      />
    </>
  );
}
