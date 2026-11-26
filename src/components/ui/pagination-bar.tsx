"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/locales";

export interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  locale?: Locale;
  totalItems?: number;
  pageSize?: number;
  itemLabelVi?: string;
  itemLabelEn?: string;
  onPageChange?: (page: number) => void;
  getPageHref?: (page: number) => string;
  className?: string;
}

export function PaginationBar({
  currentPage,
  totalPages,
  locale = "vi",
  totalItems,
  pageSize,
  itemLabelVi = "mục",
  itemLabelEn = "items",
  onPageChange,
  getPageHref,
  className = "",
}: PaginationBarProps) {
  if (totalPages <= 1) return null;

  const isEn = locale === "en";

  // Compute item range display
  const startItem = pageSize ? (currentPage - 1) * pageSize + 1 : undefined;
  const endItem = pageSize && totalItems ? Math.min(currentPage * pageSize, totalItems) : undefined;

  // Build page number list with smart ellipsis
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [1];
    if (currentPage > 3) {
      pages.push("...");
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav
      aria-label={isEn ? "Pagination Navigation" : "Điều hướng phân trang"}
      className={`mt-10 flex flex-col items-center gap-4 pt-6 border-t border-border ${className}`}
    >
      {/* Status counter text */}
      {totalItems !== undefined && (
        <p className="text-xs font-medium text-muted-foreground">
          {isEn ? (
            <>
              Page <span className="font-bold text-foreground">{currentPage}</span> of{" "}
              <span className="font-bold text-foreground">{totalPages}</span>
              {startItem && endItem && (
                <> (Showing {startItem} – {endItem} of {totalItems} {itemLabelEn})</>
              )}
            </>
          ) : (
            <>
              Trang <span className="font-bold text-foreground">{currentPage}</span> /{" "}
              <span className="font-bold text-foreground">{totalPages}</span>
              {startItem && endItem && (
                <> (Hiển thị {startItem} – {endItem} trong {totalItems} {itemLabelVi})</>
              )}
            </>
          )}
        </p>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        {getPageHref && !prevDisabled ? (
          <Link
            href={getPageHref(currentPage - 1)}
            aria-label={isEn ? "Go to previous page" : "Về trang trước"}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 sm:px-4 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-muted shadow-xs"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">{isEn ? "Previous" : "Trang trước"}</span>
          </Link>
        ) : (
          <button
            type="button"
            disabled={prevDisabled}
            onClick={() => onPageChange?.(currentPage - 1)}
            aria-label={isEn ? "Go to previous page" : "Về trang trước"}
            className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-3.5 sm:px-4 text-xs font-semibold transition-all ${
              prevDisabled
                ? "cursor-not-allowed opacity-40 bg-muted/40 text-muted-foreground"
                : "bg-surface text-foreground hover:border-primary/50 hover:bg-muted shadow-xs"
            }`}
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">{isEn ? "Previous" : "Trang trước"}</span>
          </button>
        )}

        {/* Numbered Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  aria-hidden="true"
                  className="px-2 text-xs font-semibold text-muted-foreground"
                >
                  …
                </span>
              );
            }

            const pageNum = p as number;
            const isCurrent = pageNum === currentPage;

            if (getPageHref) {
              return (
                <Link
                  key={pageNum}
                  href={getPageHref(pageNum)}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-label={isEn ? `Page ${pageNum}` : `Trang ${pageNum}`}
                  className={`inline-flex size-10 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isCurrent
                      ? "bg-[#062220] text-amber-300 border border-amber-400/60 shadow-md ring-2 ring-amber-400/20 scale-105"
                      : "border border-border bg-surface text-foreground hover:border-primary/40 hover:bg-muted shadow-xs"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            }

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange?.(pageNum)}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={isEn ? `Page ${pageNum}` : `Trang ${pageNum}`}
                className={`inline-flex size-10 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isCurrent
                    ? "bg-[#062220] text-amber-300 border border-amber-400/60 shadow-md ring-2 ring-amber-400/20 scale-105"
                    : "border border-border bg-surface text-foreground hover:border-primary/40 hover:bg-muted shadow-xs"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {getPageHref && !nextDisabled ? (
          <Link
            href={getPageHref(currentPage + 1)}
            aria-label={isEn ? "Go to next page" : "Sang trang kế tiếp"}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 sm:px-4 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-muted shadow-xs"
          >
            <span className="hidden sm:inline">{isEn ? "Next" : "Trang sau"}</span>
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <button
            type="button"
            disabled={nextDisabled}
            onClick={() => onPageChange?.(currentPage + 1)}
            aria-label={isEn ? "Go to next page" : "Sang trang kế tiếp"}
            className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-3.5 sm:px-4 text-xs font-semibold transition-all ${
              nextDisabled
                ? "cursor-not-allowed opacity-40 bg-muted/40 text-muted-foreground"
                : "bg-surface text-foreground hover:border-primary/50 hover:bg-muted shadow-xs"
            }`}
          >
            <span className="hidden sm:inline">{isEn ? "Next" : "Trang sau"}</span>
            <ChevronRight className="size-4" />
          </button>
        )}
      </div>
    </nav>
  );
}
