"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

function UserIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

/** Account pages are Vietnamese only; the label follows the language of the page the visitor is on. */
export function AuthLink({ name }: { name: string | null }) {
  const m = getMessages(localeFromPathname(usePathname())).auth;
  const label = name ? m.profileOf(name) : m.signIn;
  return (
    <Link
      href={name ? "/profile" : "/login"}
      aria-label={label}
      className="auth-link-btn inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-bold text-[#103C34] shadow-xs transition-all duration-150 hover:bg-stone-100 hover:scale-102 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
    >
      <UserIcon />
      <span className="hidden max-w-28 truncate sm:inline">{name ?? m.signIn}</span>
    </Link>
  );
}
