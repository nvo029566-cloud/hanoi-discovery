"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function ShareButtons({
  title,
  locale = "vi",
}: {
  title: string;
  locale?: Locale;
}) {
  const m = getMessages(locale).share;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  const handleFacebookShare = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener,noreferrer");
    }
  };

  const handleTwitterShare = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Share2 className="size-3.5" aria-hidden="true" />
        {m.label}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-[8px] border border-border bg-surface px-3 text-xs font-medium transition hover:border-primary/40 hover:text-primary"
          aria-label={copied ? m.copied : m.copyLink}
        >
          {copied ? (
            <>
              <Check className="size-3 text-green-600" aria-hidden="true" />
              <span className="text-green-600">{m.copied}</span>
            </>
          ) : (
            <>
              <Copy className="size-3 text-muted-foreground" aria-hidden="true" />
              <span>{m.copyLink}</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleFacebookShare}
          className="inline-flex min-h-9 items-center rounded-[8px] border border-border bg-surface px-3 text-xs font-medium transition hover:border-primary/40 hover:text-primary"
        >
          Facebook
        </button>
        <button
          type="button"
          onClick={handleTwitterShare}
          className="inline-flex min-h-9 items-center rounded-[8px] border border-border bg-surface px-3 text-xs font-medium transition hover:border-primary/40 hover:text-primary"
        >
          X
        </button>
      </div>
    </div>
  );
}
