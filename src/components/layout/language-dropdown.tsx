"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Check, Globe } from "lucide-react";
import { localePath, stripLocale, type Locale } from "@/i18n/locales";

interface LanguageDropdownProps {
  locale: Locale;
  pathname: string;
  isDark?: boolean;
}

export function LanguageDropdown({ locale, pathname, isDark = true }: LanguageDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const base = stripLocale(pathname);

  // Close when clicking outside or pressing Escape (and return focus to button)
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const languages = [
    {
      code: "vi" as const,
      label: "Tiếng Việt",
      short: "VI",
      href: localePath("vi", base),
    },
    {
      code: "en" as const,
      label: "English",
      short: "EN",
      href: localePath("en", base),
    },
  ];

  return (
    <div ref={containerRef} className="relative inline-block text-left shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={locale === "vi" ? "Chọn ngôn ngữ" : "Select language"}
        className={`inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 cursor-pointer ${
          isDark
            ? "text-[#F5F1E8] hover:text-[#E5B34E] hover:bg-white/10 focus-visible:outline-white"
            : "text-[#1D3C34] hover:text-[#987022] hover:bg-[#1D3C34]/5 focus-visible:outline-[#1D3C34]"
        }`}
      >
        <Globe
          className={`size-3.5 shrink-0 ${isDark ? "text-[#E5B34E]" : "text-[#1D3C34]"}`}
          aria-hidden="true"
        />
        <span className="font-bold tracking-wider">{locale.toUpperCase()}</span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open
              ? isDark ? "rotate-180 text-[#E5B34E]" : "rotate-180 text-[#B48A35]"
              : isDark ? "text-white/70" : "text-[#1D3C34]/70"
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute right-0 top-full mt-2 w-44 origin-top-right rounded-xl border p-1.5 shadow-2xl ring-1 ring-black/5 z-50 dropdown-anim ${
            isDark
              ? "border-white/15 bg-[#0a2620]/95 text-white backdrop-blur-xl"
              : "border-[#DEDAD1] bg-[#FAF8F3] text-[#1D3C34]"
          }`}
        >
          <div
            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border-b mb-1 flex items-center gap-1.5 ${
              isDark ? "border-white/15 text-white/70" : "border-[#DEDAD1] text-[#526159]"
            }`}
          >
            <Globe className={`size-3 ${isDark ? "text-[#E5B34E]" : "text-[#1D3C34]"}`} aria-hidden="true" />
            <span>{locale === "vi" ? "Ngôn ngữ / Language" : "Language / Ngôn ngữ"}</span>
          </div>

          <div className="space-y-0.5">
            {languages.map((item) => {
              const active = locale === item.code;
              return (
                <Link
                  key={item.code}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors duration-150 ${
                    active
                      ? isDark
                        ? "bg-white/15 text-[#E5B34E] font-bold"
                        : "bg-[#E9EDE6] text-[#1D3C34] font-bold"
                      : isDark
                        ? "text-white/90 hover:bg-white/10 hover:text-white"
                        : "text-[#1D3C34] hover:bg-[#E9EDE6]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded text-[10px] font-bold ${
                        isDark ? "bg-white/10 text-white" : "bg-[#1D3C34]/10 text-[#1D3C34]"
                      }`}
                    >
                      {item.short}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  {active && (
                    <Check
                      className={`size-3.5 ${isDark ? "text-[#E5B34E]" : "text-[#B48A35]"}`}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
