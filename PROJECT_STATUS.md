# HANOI DISCOVERY - Project status

Location: `D:\dev\hanoi-discovery` (moved off OneDrive/C: because of `.next` EPERM errors and low disk space).
Last verified: 2026-11-26 - typecheck clean, lint clean, 88 unit tests pass (production build not re-run: Prisma EPERM, see below).

## Done
- M0-M5: Next.js 16 (Cache Components) + Tailwind + Prisma/PostgreSQL, homepage, destinations/food/culture/stories, map (Leaflet), planner, SEO basics.
- M6: email + password auth (scrypt, hashed session tokens, httpOnly cookie, rate limit), favorites, profile.
- M7a: roles (USER/ADMIN), `/admin` guard, destinations CRUD with draft/published status, data-quality rules (coordinates, hours, ticket info need a source URL), `npm run admin:promote`.
- M7b: generic admin for food, culture and stories (list, create, edit, publish/hide; story bodies as paragraphs; optional English version). `node --import tsx prisma/e2e-helper.ts purge` removes leftover e2e test data.
- M8: bilingual site. Vietnamese at the root, English under `/en/...`; language switch in navbar and mobile menu; typed message catalogs (`src/i18n`); catalog falls back to Vietnamese per item; hreflang alternates and a bilingual sitemap; English sample translations seeded by `npx prisma db seed`.
- M9 (Destination Portal Upgrade):
  - Essential Travel Guide (`/guide` & `/en/guide`): weather & 4 seasons, arrival & transport (airport bus, metro, city tour bus), where to stay, safety & emergency contacts.
  - Practical facts on Destination Detail: verified opening hours, ticket prices, source URL, "View on Map", "Open in Google Maps".
  - Social sharing: `ShareButtons` component (Copy link, Facebook, X) on destinations, food, culture, and stories.
  - Planner v2 (`/planner`): Curated itineraries (1-day, 2-day, 3-day) with timeline, tips, highlights + Print/Save itinerary button + Custom generator.
  - Support & Legal pages: Contact Us (`/contact`), FAQ (`/faq`), Privacy Policy (`/privacy`), Terms of Service (`/terms`) with bilingual routes and sitemap sync.
  - Real sample coordinates, hours & tickets for iconic landmarks in `sample.ts` and `seed.ts`.

## Known limitations
- After a destination goes from draft to published (or back), a URL cached earlier can be served stale once before it regenerates. Draft content is never exposed (verified). The hide direction is not covered by a test yet.
- Login rate limiter is in-memory (per instance); needs a shared store for multi-instance deploys.
- Intermittent dev-only overlay "Unexpected end of JSON input" (not reproducible on production; root cause unknown). E2E runs against the production build: `$env:E2E_PROD = "1"; npx playwright test`.
- English pages show Vietnamese text for any item without an English translation. Account, profile and admin pages are Vietnamese only. `<html lang>` is corrected on the client (server renders "vi").
- All content is sample data (labeled); no verified photos, coordinates for some places, or opening hours yet.

## Remaining
- M7c: media/photo upload, admin for categories.
- Real verified content and photos, production map tiles.
- Accessibility / SEO / security audits, CI, deployment, API and deployment docs.
