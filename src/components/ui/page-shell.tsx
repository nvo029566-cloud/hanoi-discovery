import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PageShellVariant = "wide" | "standard" | "reading" | "compact" | "full";

const VARIANT_CONTAINER_CLASSES: Record<PageShellVariant, string> = {
  wide: "max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12",
  standard: "max-w-[1440px] px-4 sm:px-6 lg:px-8",
  reading: "max-w-[820px] px-4 sm:px-6",
  compact: "max-w-[520px] px-4 sm:px-6",
  full: "max-w-none w-full px-4 sm:px-6 lg:px-8",
};

interface PageShellProps {
  children: ReactNode;
  className?: string;
  variant?: PageShellVariant;
}

/**
 * Standard page wrapper:
 * - Clears fixed navbar with standardized vertical spacing (pt-24 sm:pt-28 lg:pt-32 pb-16 md:pb-24)
 * - Sets consistent responsive max-width and lateral padding per variant
 * - Prevents unwanted horizontal scrollbars with overflow-x-clip
 */
export function PageShell({ children, className, variant = "standard" }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full pt-24 sm:pt-28 lg:pt-32 pb-16 md:pb-24 transition-all duration-200",
        VARIANT_CONTAINER_CLASSES[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
