import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { FavoriteToggle } from "@/components/auth/favorite-toggle";
import { FoodExplorer } from "@/components/content/food-explorer";
import { CultureExplorer } from "@/components/culture/culture-explorer";
import { PlannerView } from "@/components/content/planner-view";
import { DestinationsExplorer } from "@/components/destinations/destinations-explorer";
import { DestinationCard } from "@/components/home/destination-card";
import { Hero } from "@/components/home/hero";
import { HeritageStatsSection } from "@/components/home/heritage-stats-section";
import { HeritageTrailShowcase } from "@/components/home/heritage-trail-showcase";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { TravelGuideMagazine } from "@/components/home/travel-guide-magazine";
import { PlacesMap } from "@/components/map/places-map";
import { ContentCard } from "@/components/ui/content-card";
import { ContentDetail } from "@/components/ui/content-detail";
import { CoverImage } from "@/components/ui/cover-image";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { ShareButtons } from "@/components/ui/share-buttons";
import { AudioGuidePlayer } from "@/components/audio/audio-guide-player";
import { DestinationReviews } from "@/components/reviews/destination-reviews";
import { TouristCardModal } from "@/components/social/tourist-card-modal";
import { Tour360Button } from "@/components/virtual-tour/tour-360-button";
import { getLocalPhoto } from "@/lib/local-photos";
import {
  StructuredData,
  buildDestinationJsonLd,
  buildFoodJsonLd,
  buildCultureJsonLd,
  buildStoryJsonLd,
  buildBreadcrumbJsonLd,
} from "@/components/seo/structured-data";
import { localePath, type Locale } from "@/i18n/locales";
import { getMessages } from "@/i18n/messages";
import { getCatalog } from "@/lib/catalog";
import { getBySlug, getCategory, relatedDestinations } from "@/lib/content";
import { alternatesFor } from "@/lib/page-metadata";

/** Page bodies shared by the Vietnamese routes (/x) and the English routes (/en/x). */

export async function HomePage({ locale }: { locale: Locale }) {
  const { destinations, foods, culture } = await getCatalog(locale);
  const counts = {
    history: culture.length,
    oldQuarter: destinations.filter((d) => d.category === "local-experiences").length,
    heritage: destinations.length,
    cuisine: foods.length,
  };
  return (
    <>
      {/* Cinematic Hero Section with Search Form (Section 4 & 7) */}
      <Hero locale={locale} destinationCount={destinations.length} />

      {/* Dấu ấn di sản thủ đô (Section 8) */}
      <HeritageStatsSection locale={locale} counts={counts} />

      {/* Alternating Dotted Heritage Trail Showcase (Matching 00:01 - 00:04) */}
      <HeritageTrailShowcase locale={locale} destinations={destinations} />

      {/* Why Choose Us Feature Pillars (Matching 00:05) */}
      <WhyChooseUs locale={locale} />

      {/* Travel Guide Magazine: Sổ tay du khách */}
      <TravelGuideMagazine locale={locale} />

    </>
  );
}

export async function DestinationsPage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const { destinations, categories } = await getCatalog(locale);
  return (
    <PageShell variant="wide">
      <SectionHeading
        id="destinations-title"
        eyebrow={m.pages.destinations.eyebrow}
        title={m.pages.destinations.title}
        description={m.common.sampleDataNote}
      />
      <Suspense fallback={<p className="mt-8 text-muted-foreground">{m.common.loading}</p>}>
        <DestinationsExplorer destinations={destinations} categories={categories} locale={locale} />
      </Suspense>
    </PageShell>
  );
}

export async function DestinationDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  // Render per request: a detail page of an item created after the build must not be served from a stored prerender.
  await connection();
  const m = getMessages(locale);
  const { destinations, categories } = await getCatalog(locale);
  const destination = getBySlug(destinations, slug);
  if (!destination) notFound();

  const category = getCategory(categories, destination.category);
  const related = relatedDestinations(destinations, destination);

  const jsonLd = [
    buildDestinationJsonLd(destination, locale),
    buildBreadcrumbJsonLd(
      [
        { name: m.nav.destinations, path: "/destinations" },
        { name: destination.name, path: `/destinations/${destination.slug}` },
      ],
      locale,
    ),
  ];

  return (
    <PageShell variant="wide">
      <StructuredData data={jsonLd} />
      <article>
        <nav aria-label={m.common.breadcrumb} className="text-sm text-muted-foreground">
          <Link href={localePath(locale, "/destinations")} className="underline underline-offset-4 hover:text-primary transition-colors">
            {m.nav.destinations}
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-foreground font-medium">{destination.name}</span>
        </nav>

        <header className="mt-6 max-w-4xl">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-primary uppercase">{category?.name}</p>
          <h1 className="mt-3 font-serif text-[length:var(--text-hero)] leading-tight text-foreground">{destination.name}</h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">{destination.summary}</p>
          <div className="mt-6 min-h-11 flex items-center gap-4">
            <Suspense fallback={null}>
              <FavoriteToggle slug={destination.slug} locale={locale} />
            </Suspense>
          </div>
        </header>

        {/* 2-Column Responsive Layout: Media & Reviews (8 cols) + Sticky Quick Facts & Actions Sidebar (4 cols) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Main Media & Narrative Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="overflow-hidden rounded-[14px] border border-border/80 bg-surface shadow-sm">
              <CoverImage
                image={destination.image}
                slug={destination.slug}
                label={destination.name}
                index={0}
                locale={locale}
                caption
                className="aspect-[16/9] w-full"
              />
            </div>

            <AudioGuidePlayer title={destination.name} narrative={destination.summary} locale={locale} />

            <div className="pt-2">
              <DestinationReviews slug={destination.slug} title={destination.name} locale={locale} />
            </div>
          </div>

          {/* Sticky Sidebar: Quick Info, Map & VR Actions, Sharing */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <section aria-labelledby="info-title" className="rounded-[14px] border border-border bg-surface p-6 shadow-sm">
              <h2 id="info-title" className="font-serif text-xl sm:text-2xl font-bold text-foreground">{m.detail.infoTitle}</h2>
              {destination.openingHours || destination.ticketInfo || destination.latitude ? (
                <div className="mt-5 space-y-4 text-sm">
                  {destination.openingHours && (
                    <div className="border-b border-border/60 pb-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.detail.hoursLabel}</p>
                      <p className="mt-1 font-medium text-foreground">{destination.openingHours}</p>
                    </div>
                  )}
                  {destination.ticketInfo && (
                    <div className="border-b border-border/60 pb-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.detail.ticketsLabel}</p>
                      <p className="mt-1 font-medium text-foreground">{destination.ticketInfo}</p>
                    </div>
                  )}
                  {destination.latitude && destination.longitude && (
                    <div className="pt-1 space-y-2.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {locale === "vi" ? "Trải nghiệm & Điều hướng" : "Navigation & Experience"}
                      </p>
                      <div className="flex flex-col gap-2.5">
                        <Link
                          href={localePath(locale, "/map")}
                          className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-primary/10 px-4 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                        >
                          {m.detail.viewOnMap}
                        </Link>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-border bg-surface px-4 text-sm font-semibold hover:border-primary/40 hover:bg-muted/50 transition-colors"
                        >
                          {m.detail.openGoogleMaps}
                        </a>
                        <Tour360Button slug={destination.slug} locale={locale} />
                      </div>
                    </div>
                  )}
                  {destination.sourceUrl && (
                    <p className="pt-2 text-xs text-muted-foreground">
                      {m.common.sourceLabel}:{" "}
                      <a href={destination.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                        {destination.sourceUrl}
                      </a>
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">{m.detail.infoText}</p>
              )}
            </section>

            {/* Sharing & Tourist Card Card */}
            <div className="rounded-[14px] border border-border bg-surface p-5 shadow-sm space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {locale === "vi" ? "Lưu giữ & Chia sẻ" : "Save & Share"}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ShareButtons title={destination.name} locale={locale} />
                <TouristCardModal
                  title={destination.name}
                  subtitle={destination.summary}
                  imageSrc={getLocalPhoto(destination.slug)?.src}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mt-16 pt-12 border-t border-border">
            <h2 id="related-title" className="font-serif text-2xl md:text-3xl text-foreground">{m.detail.relatedTitle}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {related.map((d, i) => (
                <li key={d.slug}>
                  <DestinationCard destination={d} categoryName={category?.name} index={i + 1} locale={locale} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </PageShell>
  );
}

export async function FoodPage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const { foods } = await getCatalog(locale);
  return (
    <PageShell variant="wide">
      <SectionHeading
        id="food-title"
        eyebrow={m.pages.food.eyebrow}
        title={m.pages.food.title}
        description={m.common.sampleDataNote}
      />
      <Suspense fallback={<p className="mt-8 text-muted-foreground">{m.common.loading}</p>}>
        <FoodExplorer foods={foods} locale={locale} />
      </Suspense>
    </PageShell>
  );
}

export async function FoodDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  // Render per request: a detail page of an item created after the build must not be served from a stored prerender.
  await connection();
  const m = getMessages(locale);
  const { foods } = await getCatalog(locale);
  const food = getBySlug(foods, slug);
  if (!food) notFound();

  const jsonLd = [
    buildFoodJsonLd(food, locale),
    buildBreadcrumbJsonLd(
      [
        { name: m.nav.food, path: "/food" },
        { name: food.name, path: `/food/${food.slug}` },
      ],
      locale,
    ),
  ];

  return (
    <ContentDetail
      slug={slug}
      locale={locale}
      eyebrow={food.englishName || undefined}
      title={food.name}
      summary={food.summary}
      image={food.image}
      notice={{ title: m.detail.foodNoticeTitle, text: m.detail.foodNoticeText }}
      backHref={localePath(locale, "/food")}
      backLabel={m.nav.food}
      jsonLd={jsonLd}
    />
  );
}

export async function CulturePage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const { culture } = await getCatalog(locale);
  return (
    <PageShell variant="wide">
      <SectionHeading
        id="culture-title"
        eyebrow={m.pages.culture.eyebrow}
        title={m.pages.culture.title}
        description={m.common.sampleDataNote}
      />
      <Suspense fallback={<p className="mt-8 text-muted-foreground">{m.common.loading}</p>}>
        <CultureExplorer culture={culture} locale={locale} />
      </Suspense>
    </PageShell>
  );
}

export async function CultureDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  // Render per request: a detail page of an item created after the build must not be served from a stored prerender.
  await connection();
  const m = getMessages(locale);
  const { culture } = await getCatalog(locale);
  const item = getBySlug(culture, slug);
  if (!item) notFound();

  const jsonLd = [
    buildCultureJsonLd(item, locale),
    buildBreadcrumbJsonLd(
      [
        { name: m.nav.culture, path: "/culture" },
        { name: item.name, path: `/culture/${item.slug}` },
      ],
      locale,
    ),
  ];

  return (
    <ContentDetail
      slug={slug}
      locale={locale}
      title={item.name}
      summary={item.summary}
      image={item.image}
      notice={{ title: m.detail.cultureNoticeTitle, text: m.detail.cultureNoticeText }}
      backHref={localePath(locale, "/culture")}
      backLabel={m.nav.culture}
      jsonLd={jsonLd}
    />
  );
}

export async function StoriesPage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const { stories } = await getCatalog(locale);
  return (
    <PageShell variant="wide">
      <SectionHeading
        id="stories-page-title"
        eyebrow={m.pages.stories.eyebrow}
        title={m.pages.stories.title}
        description={m.pages.stories.intro}
      />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {stories.map((s, i) => (
          <li key={s.slug}>
            <ContentCard
              href={localePath(locale, `/stories/${s.slug}`)}
              title={s.title}
              summary={s.excerpt}
              image={s.image}
              index={i + 1}
              linkText={m.common.readStory}
              locale={locale}
            />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

export async function StoryDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  // Render per request: a detail page of an item created after the build must not be served from a stored prerender.
  await connection();
  const m = getMessages(locale);
  const { stories } = await getCatalog(locale);
  const story = getBySlug(stories, slug);
  if (!story) notFound();

  const jsonLd = [
    buildStoryJsonLd(story, locale),
    buildBreadcrumbJsonLd(
      [
        { name: m.nav.stories, path: "/stories" },
        { name: story.title, path: `/stories/${story.slug}` },
      ],
      locale,
    ),
  ];

  return (
    <ContentDetail
      slug={slug}
      locale={locale}
      eyebrow={m.detail.storyEyebrow}
      title={story.title}
      summary={story.excerpt}
      body={story.body}
      image={story.image}
      backHref={localePath(locale, "/stories")}
      backLabel={m.nav.stories}
      jsonLd={jsonLd}
    />
  );
}

export async function MapPage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const { destinations, categories } = await getCatalog(locale);
  return (
    <PageShell variant="wide">
      <SectionHeading
        id="map-page-title"
        eyebrow={m.pages.map.eyebrow}
        title={m.pages.map.title}
        description={m.pages.map.intro}
      />
      <PlacesMap destinations={destinations} categories={categories} locale={locale} />
    </PageShell>
  );
}

export async function PlannerPage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const { destinations, categories } = await getCatalog(locale);
  return (
    <PageShell variant="wide">
      <SectionHeading
        id="planner-page-title"
        eyebrow={m.pages.planner.eyebrow}
        title={m.pages.planner.title}
        description={m.pages.planner.intro}
      />
      <Suspense fallback={<p className="mt-8 text-muted-foreground">{m.common.loading}</p>}>
        <PlannerView destinations={destinations} categories={categories} locale={locale} />
      </Suspense>
    </PageShell>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  return (
    <PageShell variant="standard">
      <SectionHeading
        id="about-title"
        eyebrow={m.pages.about.eyebrow}
        title={m.pages.about.title}
        description={m.site.description}
      />
      <div className="mt-10 max-w-4xl space-y-6 text-lg leading-relaxed text-foreground/90 font-light">
        <p>{m.pages.about.p1}</p>
        <p>{m.pages.about.p2}</p>
        <div className="pt-4">
          <Link
            href={localePath(locale, "/planner")}
            className="inline-flex min-h-12 items-center rounded-[8px] bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-light transition-colors"
          >
            {m.pages.about.cta}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

/** Metadata for the four detail routes; unknown slugs get a generic "not found" title. */
export async function detailMetadata(
  kind: "destinations" | "food" | "culture" | "stories",
  locale: Locale,
  slug: string,
): Promise<Metadata> {
  const m = getMessages(locale);
  const catalog = await getCatalog(locale);
  const alternates = alternatesFor(locale, `/${kind}/${slug}`);
  if (kind === "destinations") {
    const item = getBySlug(catalog.destinations, slug);
    return item ? { title: item.name, description: item.summary, alternates } : { title: m.detail.destinationNotFound };
  }
  if (kind === "food") {
    const item = getBySlug(catalog.foods, slug);
    return item ? { title: item.name, description: item.summary, alternates } : { title: m.detail.foodNotFound };
  }
  if (kind === "culture") {
    const item = getBySlug(catalog.culture, slug);
    return item ? { title: item.name, description: item.summary, alternates } : { title: m.detail.cultureNotFound };
  }
  const item = getBySlug(catalog.stories, slug);
  return item ? { title: item.title, description: item.excerpt, alternates } : { title: m.detail.storyNotFound };
}
