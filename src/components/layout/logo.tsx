import Link from "next/link";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function Logo({
  locale = "vi",
  isDark = false,
}: {
  light?: boolean;
  locale?: Locale;
  isDark?: boolean;
}) {
  const isEn = locale === "en";

  return (
    <Link
      href={localePath(locale, "/")}
      aria-label={getMessages(locale).nav.logoLabel}
      className="group inline-flex items-center gap-2.5 sm:gap-3 py-1 transition-opacity hover:opacity-90 shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D3C34] focus-visible:outline-offset-2 rounded-lg"
    >
      {/* Khue Van Cac Stylized Crest */}
      <span
        aria-hidden="true"
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg border shadow-xs transition-all duration-300 group-hover:scale-105 ${
          isDark
            ? "border-white/20 bg-white/10 text-[#F5F1E8]"
            : "border-[#DEDAD1] bg-[#E9EDE6] text-[#1D3C34] group-hover:border-[#1D3C34]/40"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Top roof */}
          <path d="M12 2L3 7h18L12 2z" fill="currentColor" fillOpacity="0.18" />
          <path d="M2 7q10-2 20 0" />
          {/* Window level */}
          <rect x="6" y="8" width="12" height="6" rx="1" />
          <circle cx="12" cy="11" r="2" />
          {/* Lower roof */}
          <path d="M3 15q9-1.5 18 0" />
          {/* Pillars */}
          <path d="M6 15v6M9 15v6M15 15v6M18 15v6" />
          {/* Base */}
          <path d="M4 21h16" />
        </svg>
      </span>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={`text-[10px] font-bold tracking-[0.2em] uppercase leading-tight transition-colors duration-300 ${
            isDark ? "text-white/80" : "text-[#526159]"
          }`}
        >
          {isEn ? "Hanoi Tourism Portal" : "Cổng Du Lịch Thủ Đô"}
        </span>
        <span
          className={`font-serif text-lg sm:text-xl font-bold tracking-tight leading-none flex items-baseline gap-1.5 mt-0.5 transition-colors duration-300 ${
            isDark ? "text-[#F5F1E8]" : "text-[#1D3C34]"
          }`}
        >
          HÀ NỘI{" "}
          <span
            className={`font-sans font-extrabold tracking-widest text-xs transition-colors duration-300 ${
              isDark ? "text-[#E5B34E]" : "text-[#987022]"
            }`}
          >
            DISCOVERY
          </span>
        </span>
      </div>
    </Link>
  );
}
