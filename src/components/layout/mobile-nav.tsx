"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Search, Calendar, ChevronRight } from "lucide-react";
import { mainNav } from "@/config/site";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function MobileNav({
  isActive,
  locale,
  switchHref,
  onOpenSearch,
  authSlot,
  isDark = false,
}: {
  isActive: (href: string) => boolean;
  locale: Locale;
  switchHref: string;
  onOpenSearch?: () => void;
  authSlot?: ReactNode;
  isDark?: boolean;
}) {
  const m = getMessages(locale).nav;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? m.closeMenu : m.openMenu}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex size-9 items-center justify-center rounded-lg border shadow-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 ${
          isDark
            ? "border-white/20 bg-white/10 text-[#F5F1E8] hover:bg-white/20 focus-visible:outline-white"
            : "border-[#DEDAD1] bg-[#FAF8F3] text-[#1D3C34] hover:bg-[#E9EDE6] focus-visible:outline-[#1D3C34]"
        }`}
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-y-auto bg-[#FAF8F3] p-5 text-[#233B32] md:top-20 md:h-[calc(100dvh-5rem)] border-t border-[#DEDAD1] shadow-2xl"
        >
          {/* Quick Search in Mobile Drawer */}
          {onOpenSearch && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenSearch();
                }}
                className="flex w-full items-center justify-between rounded-lg border border-[#DEDAD1] bg-white px-3.5 py-2.5 text-xs text-[#526159] transition-colors hover:bg-[#E9EDE6] focus-visible:outline-2 focus-visible:outline-[#233B32] focus-visible:outline-offset-2"
              >
                <span className="flex items-center gap-2">
                  <Search className="size-4 text-[#233B32]" aria-hidden="true" />
                  <span>{locale === "en" ? "Search destinations & stories…" : "Tìm kiếm điểm đến & cẩm nang…"}</span>
                </span>
                <span className="rounded bg-[#E9EDE6] px-1.5 py-0.5 text-[10px] font-semibold text-[#526159]">
                  Ctrl K
                </span>
              </button>
            </div>
          )}

          {/* Prominent "Lập lịch trình" Button on Mobile */}
          <div className="mb-5">
            <Link
              href={localePath(locale, "/planner")}
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2D4A3D] py-3 text-xs font-semibold text-[#FAF8F3] shadow-xs transition-colors hover:bg-[#223C31] focus-visible:outline-2 focus-visible:outline-[#233B32] focus-visible:outline-offset-2"
            >
              <Calendar className="size-4" aria-hidden="true" />
              <span>{locale === "en" ? "Make Your Trip" : "Lập lịch trình Hà Nội"}</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav aria-label={m.mobileMenu}>
            <ul className="flex flex-col space-y-1">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="border-b border-[#DEDAD1]/50">
                    <Link
                      href={localePath(locale, item.href)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-12 items-center justify-between px-2 font-serif text-lg transition-colors ${
                        active
                          ? "text-[#233B32] font-bold underline decoration-[#9C4838] decoration-2 underline-offset-4"
                          : "text-[#233B32] hover:text-[#9C4838]"
                      }`}
                    >
                      <span>{m[item.key]}</span>
                      <ChevronRight className="size-4 text-[#526159] opacity-60" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Action Section: Language Switch & Auth */}
          <div className="mt-6 pt-5 border-t border-[#DEDAD1] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#526159]">
                {locale === "vi" ? "Ngôn ngữ:" : "Language:"}
              </span>
              <Link
                href={switchHref}
                hrefLang={m.switchLang}
                lang={m.switchLang}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#DEDAD1] bg-white px-3 py-1.5 text-xs font-bold text-[#233B32] hover:bg-[#E9EDE6] transition-colors"
              >
                <span>{m.switchLabel}</span>
              </Link>
            </div>

            {authSlot && (
              <div className="pt-2">
                {authSlot}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
