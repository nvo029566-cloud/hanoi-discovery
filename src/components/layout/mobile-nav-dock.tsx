"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Compass, Heart, Map } from "lucide-react";
import { localeFromPathname, localePath } from "@/i18n/locales";

const items = [
  { href: "/", labelVi: "Khám phá", labelEn: "Explore", icon: Compass },
  { href: "/map", labelVi: "Bản đồ", labelEn: "Map", icon: Map },
  { href: "/planner", labelVi: "Lịch trình", labelEn: "Planner", icon: CalendarDays },
  { href: "/profile", labelVi: "Đã lưu", labelEn: "Saved", icon: Heart },
] as const;

export function MobileNavDock() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const basePath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  return (
      <nav
        aria-label={locale === "en" ? "Quick navigation" : "Điều hướng nhanh"}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d9d5ca] bg-[#fbf9f5]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(10,46,42,0.10)] backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
          {items.map(({ href, labelVi, labelEn, icon: Icon }) => {
            const active = href === "/" ? basePath === "/" : basePath.startsWith(href);
            return (
              <Link
                key={href}
                href={localePath(locale, href)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-semibold transition-colors ${
                  active ? "bg-[#e9ede6] text-[#0a2e2a]" : "text-[#52605b] hover:bg-[#f0ede6]"
                }`}
              >
                <Icon className={`size-[1.05rem] ${active ? "text-[#9c4838]" : ""}`} aria-hidden="true" />
                <span>{locale === "en" ? labelEn : labelVi}</span>
              </Link>
            );
          })}
        </div>
      </nav>
  );
}
