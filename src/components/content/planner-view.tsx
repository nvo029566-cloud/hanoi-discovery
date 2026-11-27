"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Printer,
  Sparkles,
  SlidersHorizontal,
  Clock,
  Compass,
  Copy,
  Check,
  Navigation,
} from "lucide-react";
import { getCuratedItineraries } from "@/data/curated-itineraries";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { getCategory, isCategorySlug } from "@/lib/content";
import {
  buildItinerary,
  calculateDistanceKm,
  calculateTotalRouteDistance,
  estimateTravelTimeMinutes,
} from "@/lib/planner";
import { getLocalPhoto } from "@/lib/local-photos";
import type { Category, Destination } from "@/types/content";

export function PlannerView({
  destinations,
  categories,
  locale = "vi",
}: {
  destinations: Destination[];
  categories: Category[];
  locale?: Locale;
}) {
  const messages = getMessages(locale);
  const m = messages.planner;
  const params = useSearchParams();
  const rawDays = Number(params.get("days"));
  const days = Number.isInteger(rawDays) && rawDays >= 1 && rawDays <= 3 ? rawDays : 2;
  const interests = params
    .getAll("interests")
    .flatMap((v) => v.split(","))
    .filter((v) => isCategorySlug(categories, v));
  const plan = buildItinerary(destinations, days, interests);

  // Tab selection: If user came with query params, default to custom; else curated.
  const hasCustomParams = params.has("days") || params.has("interests");
  const [activeTab, setActiveTab] = useState<"curated" | "custom">(hasCustomParams ? "custom" : "curated");
  const [copied, setCopied] = useState(false);

  const curatedList = getCuratedItineraries(locale);
  const [selectedCuratedId, setSelectedCuratedId] = useState(params.get("route") ?? curatedList[0]?.id);
  const selectedCurated = curatedList.find((c) => c.id === selectedCuratedId) ?? curatedList[0];
  const showingCurated = activeTab === "curated" && selectedCurated;
  const destinationBySlug = new Map(destinations.map((item) => [item.slug, item]));
  const visibleDays = showingCurated ? selectedCurated.days : plan;
  const totalStops = showingCurated
    ? selectedCurated.days.reduce((total, day) => total + day.stops.length, 0)
    : plan.reduce((total, day) => total + day.items.length, 0);
  const routeDays = showingCurated
    ? selectedCurated.days.map((day) => day.stops.map((stop) => destinationBySlug.get(stop.destinationSlug ?? "")))
    : plan.map((day) => day.items);
  const hasCompleteRoute = routeDays.some((items) => items.length > 1)
    && routeDays.every((items) => items.every((item) => item?.latitude != null && item.longitude != null));
  const totalDistance = hasCompleteRoute
    ? routeDays.reduce((total, items) => total + calculateTotalRouteDistance(items.filter((item) => item !== undefined)), 0)
    : null;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        url.search = "";
        if (showingCurated) {
          url.searchParams.set("route", selectedCurated.id);
        } else {
          url.searchParams.set("days", String(days));
          interests.forEach((interest) => url.searchParams.append("interests", interest));
        }
        await navigator.clipboard.writeText(url.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // clipboard fallback
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-6 grid grid-cols-3 overflow-hidden rounded-[20px] border border-border bg-surface shadow-sm">
        <div className="border-r border-border p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{locale === "vi" ? "Ngày" : "Days"}</p>
          <p className="mt-1 font-serif text-2xl font-bold text-primary">{visibleDays.length}</p>
        </div>
        <div className="border-r border-border p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{locale === "vi" ? "Điểm dừng" : "Stops"}</p>
          <p className="mt-1 font-serif text-2xl font-bold text-primary">{totalStops}</p>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{locale === "vi" ? "Quãng đường" : "Distance"}</p>
          {totalDistance === null ? (
            <p className="mt-2 text-xs text-muted-foreground">{locale === "vi" ? "Chưa có ước tính" : "No estimate"}</p>
          ) : (
            <>
              <p className="mt-1 font-serif text-2xl font-bold text-primary">≈ {totalDistance.toFixed(1)} <span className="font-sans text-sm font-semibold">km</span></p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{locale === "vi" ? "Theo đường chim bay" : "Straight-line estimate"}</p>
            </>
          )}
        </div>
      </div>
      {/* Tab Switcher & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 print:hidden">
        <div className="flex gap-2" role="tablist" aria-label="Planner options">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "curated"}
            onClick={() => setActiveTab("curated")}
            className={`inline-flex min-h-11 items-center gap-2 rounded-[10px] px-5 text-sm font-semibold transition ${
              activeTab === "curated"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-surface text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Sparkles className="size-4" aria-hidden="true" />
            {m.curatedTab}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "custom"}
            onClick={() => setActiveTab("custom")}
            className={`inline-flex min-h-11 items-center gap-2 rounded-[10px] px-5 text-sm font-semibold transition ${
              activeTab === "custom"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-surface text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {m.customTab}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-border bg-surface px-4 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
            title={locale === "vi" ? "Sao chép liên kết lịch trình" : "Copy plan link"}
          >
            {copied ? (
              <>
                <Check className="size-4 text-emerald-600" aria-hidden="true" />
                <span className="text-emerald-600">{locale === "vi" ? "Đã sao chép!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="size-4 text-muted-foreground" aria-hidden="true" />
                <span>{locale === "vi" ? "Chia sẻ" : "Share"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-border bg-surface px-4 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
          >
            <Printer className="size-4 text-muted-foreground" aria-hidden="true" />
            {m.printBtn}
          </button>
        </div>
      </div>

      {/* CURATED ITINERARIES TAB */}
      {activeTab === "curated" && selectedCurated && (
        <section aria-label={m.curatedTab} className="mt-8">
          <p className="max-w-3xl text-muted-foreground print:hidden">{m.curatedIntro}</p>

          {/* Curated Tour Selector */}
          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            {curatedList.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCuratedId(item.id)}
                className={`rounded-[12px] border p-4 text-left transition ${
                  selectedCuratedId === item.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-surface hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.daysCount} {locale === "vi" ? "Ngày" : "Days"}
                  </span>
                  <span className="text-xs text-muted-foreground line-clamp-1">{item.tagline}</span>
                </div>
                <h3 className="mt-1 font-serif text-base font-bold text-foreground">
                  {item.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Selected Curated Itinerary Display */}
          <div className="mt-8 rounded-[20px] border border-border bg-surface p-6 shadow-sm md:p-8">
            <header className="border-b border-border pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary uppercase">
                  <Clock className="size-3.5" />
                  {selectedCurated.daysCount} {locale === "vi" ? "Ngày" : "Days"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Compass className="size-3.5" />
                  {selectedCurated.tagline}
                </span>
              </div>
              <h2 className="mt-3 font-serif text-2xl font-bold md:text-3xl">
                {selectedCurated.title}
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                {selectedCurated.summary}
              </p>
            </header>

            {/* Days list */}
            <div className="mt-8 space-y-10">
              {selectedCurated.days.map((dayPlan) => (
                <div key={dayPlan.dayNumber} className="border-b border-border/60 pb-8 last:border-b-0 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary font-bold text-xs text-primary-foreground">
                      {dayPlan.dayNumber}
                    </span>
                    <h3 className="font-serif text-xl font-bold">{dayPlan.dayTitle}</h3>
                  </div>

                  <ol className="mt-6 space-y-4">
                    {dayPlan.stops.map((stop, idx) => (
                      <li
                        key={idx}
                        className="rounded-[12px] border border-border bg-background p-4 transition hover:border-primary/30"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">
                            ⏰ {stop.timeSlot}
                          </span>
                          {stop.destinationSlug && (
                            <Link
                              href={localePath(locale, `/destinations/${stop.destinationSlug}`)}
                              className="text-xs font-semibold text-primary underline underline-offset-4"
                            >
                              {messages.common.viewDetails} →
                            </Link>
                          )}
                        </div>
                        <h4 className="mt-1 font-serif text-lg font-bold text-foreground">
                          {stop.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {stop.description}
                        </p>
                        {stop.tips && (
                          <p className="mt-2 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded-md p-2 border border-amber-200/60 dark:border-amber-900/60">
                            💡 {stop.tips}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            {/* Highlights footer */}
            {selectedCurated.highlights && selectedCurated.highlights.length > 0 && (
              <footer className="mt-10 rounded-[14px] bg-muted/50 p-5 border border-border">
                <h4 className="font-serif text-base font-bold text-foreground">
                  {m.highlightsLabel}:
                </h4>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
                  {selectedCurated.highlights.map((hl, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {hl}
                    </li>
                  ))}
                </ul>
              </footer>
            )}
          </div>
        </section>
      )}

      {/* CUSTOM ITINERARY GENERATOR TAB */}
      {activeTab === "custom" && (
        <section aria-label={m.customTab} className="mt-8">
          <form
            action={localePath(locale, "/planner")}
            method="get"
            className="grid gap-6 rounded-[16px] border border-border bg-surface p-6 shadow-xs md:grid-cols-[12rem_1fr_auto] print:hidden"
          >
            <div>
              <label htmlFor="planner-days" className="mb-2 block text-sm font-semibold">
                {m.days}
              </label>
              <select
                id="planner-days"
                name="days"
                defaultValue={String(days)}
                className="min-h-12 w-full rounded-[10px] border border-border bg-surface px-3"
              >
                {[1, 2, 3].map((d) => (
                  <option key={d} value={d}>
                    {m.dayUnit(d)}
                  </option>
                ))}
              </select>
            </div>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">{m.interests}</legend>
              <div className="flex flex-wrap gap-4">
                {categories.map((c) => (
                  <label key={c.slug} className="inline-flex min-h-11 items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="interests"
                      value={c.slug}
                      defaultChecked={interests.includes(c.slug)}
                      className="size-5 accent-[var(--primary)]"
                    />
                    <span className="text-sm font-medium">{c.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              className="min-h-12 justify-self-start self-end rounded-[10px] bg-primary px-6 font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              {m.update}
            </button>
          </form>

          <div className="mt-10">
            <h2 id="plan-title" className="font-serif text-2xl font-bold">
              {m.planTitle(days)}
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{m.planNote}</p>
            {plan.length === 0 ? (
              <p className="mt-6 rounded-[16px] border border-border bg-surface p-6">
                {m.empty}{" "}
                <Link
                  href={localePath(locale, "/planner")}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {m.clearInterests}
                </Link>
              </p>
            ) : (
              <ol className="mt-6 grid gap-6 md:grid-cols-3">
                {plan.map((d) => {
                  const dayDistance = calculateTotalRouteDistance(d.items);
                  return (
                    <li key={d.day} className="flex flex-col rounded-[16px] border border-border bg-surface p-5 shadow-xs">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <h3 className="font-serif text-xl font-bold">{m.day(d.day)}</h3>
                        {dayDistance > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            <Navigation className="size-3" />
                            ~{dayDistance} km
                          </span>
                        )}
                      </div>

                      <ul className="mt-4 flex-1 space-y-3">
                        {d.items.map((item, idx) => {
                          const photo = getLocalPhoto(item.slug);
                          const nextItem = d.items[idx + 1];
                          let legDist = 0;
                          let legTime = { walking: 0, vehicle: 0 };
                          if (
                            item.latitude &&
                            item.longitude &&
                            nextItem?.latitude &&
                            nextItem?.longitude
                          ) {
                            legDist = calculateDistanceKm(
                              item.latitude,
                              item.longitude,
                              nextItem.latitude,
                              nextItem.longitude
                            );
                            legTime = estimateTravelTimeMinutes(legDist);
                          }

                          return (
                            <li key={item.slug} className="space-y-2">
                              <div className="flex items-start gap-3 rounded-[10px] border border-border/80 bg-background p-3 hover:border-primary/30 transition-colors">
                                {photo && (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img
                                    src={photo.src}
                                    alt={item.name}
                                    className="size-14 rounded-[8px] object-cover shrink-0"
                                  />
                                )}
                                <div className="min-w-0 flex-1">
                                  <Link
                                    href={localePath(locale, `/destinations/${item.slug}`)}
                                    className="font-semibold text-sm text-primary underline decoration-secondary decoration-2 underline-offset-4 hover:text-primary/80 line-clamp-1"
                                  >
                                    {item.name}
                                  </Link>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {getCategory(categories, item.category)?.name}
                                  </p>
                                  {item.ticketInfo && (
                                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 line-clamp-1 font-medium">
                                      {item.ticketInfo}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Distance indicator to next stop */}
                              {legDist > 0 && (
                                <div className="flex items-center gap-2 pl-4 py-1 text-[11px] text-muted-foreground font-medium">
                                  <span className="text-primary font-bold">↓</span>
                                  <span>~{legDist} km</span>
                                  <span>•</span>
                                  <span>🚶 ~{legTime.walking}p</span>
                                  <span>/</span>
                                  <span>🚖 ~{legTime.vehicle}p</span>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
