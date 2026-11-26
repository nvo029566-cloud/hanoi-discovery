import { HelpCircle } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function FAQPage({ locale = "vi" }: { locale?: Locale }) {
  const m = getMessages(locale).faq;

  return (
    <PageShell>
      <SectionHeading
        id="faq-title"
        eyebrow={m.eyebrow}
        title={m.title}
        description={m.intro}
      />

      <div className="mt-12 max-w-4xl space-y-6">
        {m.items.map((item, idx) => (
          <details
            key={idx}
            className="group rounded-[16px] border border-border bg-surface p-6 open:shadow-xs transition"
          >
            <summary className="flex cursor-pointer items-start justify-between gap-4 font-serif text-xl font-bold text-foreground list-none">
              <span className="flex items-start gap-3">
                <HelpCircle className="mt-1 size-5 text-primary shrink-0" aria-hidden="true" />
                <span>{item.q}</span>
              </span>
              <span className="ml-2 font-mono text-xl text-muted-foreground group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <p className="mt-4 pl-8 text-base leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
