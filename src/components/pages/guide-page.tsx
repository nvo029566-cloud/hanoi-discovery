import Link from "next/link";
import { CloudSun, Bus, BedDouble, ShieldAlert, PhoneCall } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { HanoiWeatherWidget } from "@/components/weather/hanoi-weather";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";

export function GuidePage({ locale = "vi" }: { locale?: Locale }) {
  const m = getMessages(locale).guide;

  return (
    <PageShell>
      <SectionHeading
        id="guide-title"
        eyebrow={m.eyebrow}
        title={m.title}
        description={m.intro}
      />

      <div className="mt-8">
        <HanoiWeatherWidget locale={locale} />
      </div>

      <div className="mt-12 space-y-16">
        {/* SECTION 1: SEASONS & WEATHER */}
        <section aria-labelledby="weather-heading" className="rounded-[16px] border border-border bg-surface p-6 md:p-8">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <CloudSun className="size-6 text-primary" aria-hidden="true" />
            <h2 id="weather-heading" className="font-serif text-2xl font-bold">
              {m.weatherTitle}
            </h2>
          </div>
          <p className="mt-4 text-muted-foreground">{m.weatherIntro}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {m.seasons.map((season, idx) => (
              <div key={idx} className="rounded-[12px] border border-border bg-background p-5">
                <h3 className="font-serif text-lg font-bold text-primary">{season.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{season.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: TRANSPORTATION */}
        <section aria-labelledby="transport-heading" className="rounded-[16px] border border-border bg-surface p-6 md:p-8">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Bus className="size-6 text-primary" aria-hidden="true" />
            <h2 id="transport-heading" className="font-serif text-2xl font-bold">
              {m.transportTitle}
            </h2>
          </div>
          <p className="mt-4 text-muted-foreground">{m.transportIntro}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {m.transports.map((item, idx) => (
              <div key={idx} className="rounded-[12px] border border-border bg-background p-5">
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: WHERE TO STAY */}
        <section aria-labelledby="stay-heading" className="rounded-[16px] border border-border bg-surface p-6 md:p-8">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <BedDouble className="size-6 text-primary" aria-hidden="true" />
            <h2 id="stay-heading" className="font-serif text-2xl font-bold">
              {m.stayTitle}
            </h2>
          </div>
          <p className="mt-4 text-muted-foreground">{m.stayIntro}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {m.stays.map((item, idx) => (
              <div key={idx} className="rounded-[12px] border border-border bg-background p-5">
                <h3 className="font-serif text-lg font-bold text-primary">{item.area}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: SAFETY & EMERGENCY CONTACTS */}
        <section aria-labelledby="safety-heading" className="rounded-[16px] border border-border bg-surface p-6 md:p-8">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <ShieldAlert className="size-6 text-red-600" aria-hidden="true" />
            <h2 id="safety-heading" className="font-serif text-2xl font-bold">
              {m.safetyTitle}
            </h2>
          </div>
          <p className="mt-4 text-muted-foreground">{m.safetyIntro}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {m.contacts.map((c, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-[12px] border border-border bg-background p-4">
                <PhoneCall className="mt-0.5 size-4 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="mt-1 font-semibold text-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 pt-4">
            <Link
              href={localePath(locale, "/planner")}
              className="inline-flex min-h-12 items-center rounded-[10px] bg-primary px-6 font-semibold text-primary-foreground shadow-sm"
            >
              {locale === "en" ? "Plan your itinerary" : "Lập lịch trình ngay"}
            </Link>
            <Link
              href={localePath(locale, "/contact")}
              className="inline-flex min-h-12 items-center rounded-[10px] border border-border bg-surface px-6 font-semibold text-foreground hover:border-primary/40"
            >
              {locale === "en" ? "Need help? Contact us" : "Cần hỗ trợ? Liên hệ"}
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
