"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ListOrdered } from "lucide-react";
import type { ArticleSection } from "@/data/travel-guide-articles";

interface ArticleTableOfContentsProps {
  sections: ArticleSection[];
  isEn?: boolean;
}

export function ArticleTableOfContents({ sections, isEn = false }: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setIsOpenMobile(false);
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      {/* =========================================================================
          1. MOBILE ACCORDION TOC (Visible on < lg screens)
      ========================================================================= */}
      <div id="mobile-toc-accordion" className="lg:hidden mb-8 rounded-[4px] border border-[#DED9CC] bg-[#FAF8F2] overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-[14px] font-semibold text-[#173D33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D33]"
          aria-expanded={isOpenMobile}
        >
          <span className="flex items-center gap-2">
            <ListOrdered className="size-4 text-[#8A6B32]" />
            <span>{isEn ? "Table of Contents" : "Mục lục bài viết"}</span>
          </span>
          <ChevronDown
            className={`size-4 text-[#8A6B32] transition-transform duration-200 ${isOpenMobile ? "rotate-180" : ""
              }`}
          />
        </button>

        {isOpenMobile && (
          <nav
            aria-label={isEn ? "Table of contents" : "Mục lục"}
            className="border-t border-[#DED9CC]/70 px-4 py-3 bg-[#FDFCF8] animate-in fade-in duration-200"
          >
            <ul className="space-y-2 text-[13px]">
              {sections.map((section, idx) => {
                const isActive = activeId === section.id;
                const label = isEn
                  ? section.shortTitleEn || section.headingEn
                  : section.shortTitleVi || section.headingVi;
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => scrollToHeading(section.id)}
                      className={`text-left w-full py-1 transition-colors flex items-start gap-2 ${isActive
                        ? "text-[#8A6B32] font-semibold border-l-2 border-[#8A6B32] pl-2 -ml-2"
                        : "text-[#65736C] hover:text-[#173D33] font-normal pl-2 -ml-2 border-l-2 border-transparent"
                        }`}
                    >
                      <span className="font-mono text-[#8A6B32]">{idx + 1}.</span>
                      <span className="line-clamp-2">{label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      {/* =========================================================================
          2. DESKTOP STICKY SIDEBAR TOC (Visible on >= lg screens)
      ========================================================================= */}
      <aside
        id="article-toc-desktop"
        aria-label={isEn ? "Table of contents" : "Mục lục"}
        className="hidden lg:block sticky top-28 self-start w-[220px] xl:w-[240px] shrink-0"
      >
        <div className="pr-2 border-l border-[#EAE5D9] pl-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#173D33] mb-3">
            {isEn ? "TABLE OF CONTENTS" : "MỤC LỤC"}
          </p>

          <ul className="space-y-2.5 text-[13px] leading-snug">
            {sections.map((section, idx) => {
              const isActive = activeId === section.id;
              const label = isEn
                ? section.shortTitleEn || section.headingEn
                : section.shortTitleVi || section.headingVi;
              return (
                <li key={section.id} className="relative">
                  <button
                    type="button"
                    onClick={() => scrollToHeading(section.id)}
                    className={`w-full text-left py-0.5 transition-all duration-200 flex items-start gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#173D33] rounded-xs ${isActive
                      ? "text-[#8A6B32] font-semibold border-l-2 border-[#8A6B32] pl-2.5 -ml-[13px]"
                      : "text-[#65736C] hover:text-[#173D33] font-normal border-l-2 border-transparent pl-2.5 -ml-[13px]"
                      }`}
                  >
                    <span className="font-mono shrink-0">{idx + 1}.</span>
                    <span className="line-clamp-2">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
