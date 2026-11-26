"use client";

import { useState, useTransition } from "react";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { toggleFavoriteAction } from "@/lib/auth/actions";

export function FavoriteButton({
  slug,
  initialFavorited,
  locale = "vi",
}: {
  slug: string;
  initialFavorited: boolean;
  locale?: Locale;
}) {
  const m = getMessages(locale).auth;
  const [favorited, setFavorited] = useState(initialFavorited);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onClick() {
    setError(null);
    startTransition(async () => {
      const result = await toggleFavoriteAction(slug);
      if (result.ok) setFavorited(result.favorited);
      else setError(result.error);
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        aria-pressed={favorited}
        className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-border bg-surface px-4 font-medium disabled:opacity-60"
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M12 21s-7-4.6-9.3-9.1C1.1 8.7 3 5 6.5 5c2 0 3.5 1.1 5.5 3.2C14 6.1 15.5 5 17.5 5 21 5 22.9 8.7 21.3 11.9 19 16.4 12 21 12 21Z" />
        </svg>
        {favorited ? m.favorited : m.favorite}
      </button>
      {error && <p role="alert" className="mt-2 text-sm text-primary">{error}</p>}
    </div>
  );
}
