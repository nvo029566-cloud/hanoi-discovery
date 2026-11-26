"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, localePath } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export default function NotFound() {
  const locale = localeFromPathname(usePathname());
  const m = getMessages(locale).notFound;
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-32 text-center md:px-6">
      <p className="text-sm font-semibold tracking-widest text-secondary-foreground uppercase">{m.eyebrow}</p>
      <h1 className="mt-4 font-serif text-[length:var(--text-section)] text-primary">{m.title}</h1>
      <p className="mt-4 max-w-prose text-muted-foreground">{m.text}</p>
      <Link
        href={localePath(locale, "/")}
        className="mt-8 inline-flex items-center rounded-[var(--radius-button)] bg-primary px-6 py-3 font-semibold text-primary-foreground"
      >
        {m.home}
      </Link>
    </section>
  );
}
