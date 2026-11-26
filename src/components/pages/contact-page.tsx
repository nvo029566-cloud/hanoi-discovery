"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function ContactPage({ locale = "vi" }: { locale?: Locale }) {
  const m = getMessages(locale).contact;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageShell>
      <SectionHeading
        id="contact-title"
        eyebrow={m.eyebrow}
        title={m.title}
        description={m.intro}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {/* INFORMATION DESK */}
        <div className="rounded-[16px] border border-border bg-surface p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold text-foreground">{m.centerTitle}</h2>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 size-5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.addressLabel}</p>
                <p className="mt-1 font-medium text-foreground">{m.addressVal}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 size-5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.hotlineLabel}</p>
                <p className="mt-1 font-medium text-foreground">{m.hotlineVal}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1 size-5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.emailLabel}</p>
                <p className="mt-1 font-medium text-foreground">{m.emailVal}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="mt-1 size-5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.hoursLabel}</p>
                <p className="mt-1 font-medium text-foreground">{m.hoursVal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FEEDBACK FORM */}
        <div className="rounded-[16px] border border-border bg-surface p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold text-foreground">{m.formTitle}</h2>

          {submitted ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-[12px] bg-green-500/10 p-8 text-center text-green-700 dark:text-green-400">
              <CheckCircle2 className="size-12" aria-hidden="true" />
              <p className="mt-4 text-base font-semibold">{m.successMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-semibold">
                  {m.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  className="min-h-12 w-full rounded-[10px] border border-border bg-background px-4 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-semibold">
                  {m.emailInputLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  className="min-h-12 w-full rounded-[10px] border border-border bg-background px-4 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-semibold">
                  {m.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  className="w-full rounded-[10px] border border-border bg-background p-4 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-primary px-6 font-semibold text-primary-foreground transition hover:opacity-95"
              >
                <Send className="size-4" aria-hidden="true" />
                {m.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageShell>
  );
}
