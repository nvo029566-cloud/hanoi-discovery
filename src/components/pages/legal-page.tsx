import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function LegalPage({
  type,
  locale = "vi",
}: {
  type: "privacy" | "terms";
  locale?: Locale;
}) {
  const m = getMessages(locale).legal;
  const title = type === "privacy" ? m.privacyTitle : m.termsTitle;
  const paragraphs = type === "privacy" ? m.privacyText : m.termsText;

  return (
    <PageShell>
      <SectionHeading
        id="legal-title"
        eyebrow="HANOI DISCOVERY"
        title={title}
        description={m.lastUpdated}
      />

      <article className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </article>
    </PageShell>
  );
}
