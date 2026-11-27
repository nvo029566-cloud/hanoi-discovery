"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Compass, Landmark, Route } from "lucide-react";
import type { Locale } from "@/i18n/locales";

const chapters = [
  { id: "heritage-stats", vi: "Di sản", en: "Heritage", icon: Landmark },
  { id: "heritage-trail", vi: "Hành trình", en: "Trail", icon: Route },
  { id: "why-choose-us", vi: "Trải nghiệm", en: "Experiences", icon: Compass },
  { id: "handbook", vi: "Cẩm nang", en: "Handbook", icon: BookOpen },
] as const;

export function HomeSectionNav({ locale }: { locale: Locale }) {
  const navRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((section) => section !== null);
    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = desktop.matches ? (navRef.current?.getBoundingClientRect().bottom ?? 0) + 30 : 112;
        const current = sections.findLast((section) => section.getBoundingClientRect().top <= threshold);
        setActiveId(current?.id ?? null);
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label={locale === "vi" ? "Các phần trang chủ" : "On this page"}
      className="relative z-30 border-b border-[#DED8C8] bg-[#FAF8F2] lg:sticky lg:top-20 lg:bg-[#FAF8F2]/95 lg:backdrop-blur-lg"
    >
      <ul className="mx-auto grid max-w-4xl grid-cols-4 px-2 sm:px-4">
        {chapters.map(({ id, vi, en, icon: Icon }) => (
          <li key={id} className="min-w-0">
            <a
              href={`#${id}`}
              aria-current={activeId === id ? "location" : undefined}
              className="home-chapter-link flex min-h-15 flex-col items-center justify-center gap-1 rounded-sm px-1 text-center text-[11px] font-semibold text-[#4C6156] transition-colors hover:bg-[#EDE9DC] hover:text-[#173D33] aria-[current=location]:bg-[#F0EBDE] aria-[current=location]:text-[#173D33] sm:min-h-14 sm:flex-row sm:gap-2 sm:text-sm"
            >
              <Icon className="size-4 shrink-0 text-[#886423]" aria-hidden="true" />
              {locale === "vi" ? vi : en}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
