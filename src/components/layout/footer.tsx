"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Smartphone } from "lucide-react";
import { footerLinks } from "@/config/site";
import { localeFromPathname, localePath } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { Logo } from "./logo";
import { InternationalWelcomeModal } from "@/components/international/international-welcome-modal";

export function Footer() {
  const locale = localeFromPathname(usePathname());
  const m = getMessages(locale);
  const isEn = locale === "en";

  return (
    <footer className="border-t border-amber-500/25 bg-[#071f1c] pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-white md:pb-0">
      <div className="border-b border-white/10 bg-[#051715]/80 px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-[1280px] flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <Link href={localePath(locale, "/contact")} className="inline-flex min-h-8 items-center gap-2 font-medium text-amber-300 hover:underline">
            {isEn ? "Visitor support" : "Hỗ trợ du khách"}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>

          <div className="flex items-center gap-4 text-white/70">
            <span className="hidden md:flex items-center gap-1.5">
              <Smartphone className="size-3.5 text-amber-300" />
              <span>{isEn ? "Installable PWA App" : "Ứng dụng PWA ngoại tuyến"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 md:grid-cols-5 md:px-6">
        {/* Brand & Description Column (2 cols) */}
        <div className="md:col-span-2">
          <Logo isDark locale={locale} />
          <p className="mt-4 max-w-md text-xs md:text-sm text-white/75 leading-relaxed font-light">
            {isEn
              ? "Explore Hanoi’s heritage, street food and neighborhoods, and plan your visit."
              : "Cổng thông tin du lịch Thủ đô giới thiệu 1.000 năm tinh hoa văn hiến, ẩm thực phố cổ, trải nghiệm tour thực tế ảo 360° và lập lịch trình di chuyển tối ưu cho du khách."}
          </p>
          <p className="mt-4 font-serif text-base text-secondary font-medium italic">
            &ldquo;{m.site.tagline}&rdquo;
          </p>
        </div>

        {/* Column 1: Explore */}
        <nav aria-label={m.footer.explore}>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {m.footer.explore}
          </h2>
          <ul className="space-y-2 text-xs md:text-sm text-white/80">
            {footerLinks.explore.map((l) => (
              <li key={l.href}>
                <Link
                  href={localePath(locale, l.href)}
                  className="hover:text-amber-300 hover:underline transition-colors inline-block py-0.5"
                >
                  {m.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 2: Stories & Culture */}
        <nav aria-label={m.footer.more}>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {m.footer.more}
          </h2>
          <ul className="space-y-2 text-xs md:text-sm text-white/80">
            {footerLinks.stories.map((l) => (
              <li key={l.href}>
                <Link
                  href={localePath(locale, l.href)}
                  className="hover:text-amber-300 hover:underline transition-colors inline-block py-0.5"
                >
                  {m.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3: Essentials & Support */}
        <nav aria-label={m.footer.essentials}>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {m.footer.essentials}
          </h2>
          <ul className="space-y-2 text-xs md:text-sm text-white/80">
            {footerLinks.essentials.map((l) => (
              <li key={l.href}>
                <Link
                  href={localePath(locale, l.href)}
                  className="hover:text-amber-300 hover:underline transition-colors inline-block py-0.5"
                >
                  {m.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Legal & Global Multi-language bar */}
      <div className="border-t border-white/10 bg-[#051715]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-6 text-xs text-white/65 md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © 2026 {m.site.name}. {isEn ? "Hanoi Municipal Tourism Open Platform." : "Cổng thông tin du lịch Thủ đô Hà Nội."}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href={localePath(locale, "/privacy")} className="hover:text-white hover:underline">
              {m.footer.privacy}
            </Link>
            <span aria-hidden="true" className="text-white/30">•</span>
            <Link href={localePath(locale, "/terms")} className="hover:text-white hover:underline">
              {m.footer.terms}
            </Link>
            <span aria-hidden="true" className="text-white/30">•</span>
            {/* Global Language Modal */}
            <InternationalWelcomeModal />
          </div>
        </div>
      </div>
    </footer>
  );
}
