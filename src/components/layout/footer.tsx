"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneCall, ShieldCheck, Smartphone } from "lucide-react";
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
    <footer className="bg-[#071f1c] text-white border-t border-amber-500/25">
      {/* Top Banner: Emergency & Tourist Hotline */}
      <div className="border-b border-white/10 bg-[#051715]/80 px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-[1280px] flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-medium">
            <PhoneCall className="size-4 shrink-0" />
            <span>
              {isEn
                ? "Official Hanoi Tourist Support Hotline:"
                : "Tổng đài Hỗ trợ Du khách Thủ đô (Sở Du lịch Hà Nội):"}
            </span>
            <a href="tel:1800556896" className="font-bold text-white hover:underline">
              1800 556 896
            </a>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
              {isEn ? "24/7 Free" : "Miễn phí 24/7"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>{isEn ? "Municipal Tourism Certified" : "Dữ liệu du lịch chính thức"}</span>
            </span>
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
          <Logo light locale={locale} />
          <p className="mt-4 max-w-md text-xs md:text-sm text-white/75 leading-relaxed font-light">
            {isEn
              ? "Official capital destination portal showcasing 1,000 years of dynastic heritage, street gastronomy, virtual 360° tours, and smart itinerary planning for global travelers."
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
