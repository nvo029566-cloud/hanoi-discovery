# Changelog

## 2026-11-26 - Cleanup and hardening
- Moved 40 unreferenced images (63 MB) out of `public/images` to `../hanoi-discovery-unused-assets`; branch renamed to `main`.
- Security headers and AVIF/WebP image formats in `next.config.ts`; `poweredByHeader` off.
- GitHub Actions CI (`.github/workflows/ci.yml`): typecheck, lint, unit tests.
- Fixed lint errors/warnings in guide components.
- Hero search fixed: it sent `duration`/`theme` params that the planner ignored. It now opens `/planner?days=N&interests=<category>`, or `/destinations?q=...` when a destination is typed. The hero destination count comes from the catalog instead of a hard-coded 26.
- Removed the public `/admin` link from the footer.
- Heritage pillars show live counts (stories, experiences, landmarks, dishes) from the catalog; contrast of the gold small text raised.
- Heritage trail: stops now show real opening hours and ticket info from the catalog, animate once, give visible "link copied" feedback, and use the caption as image alt.
- "Why choose us" is now a server component; its heritage card links to `/stories` instead of duplicating `/destinations`.
- Handbook magazine: removed `priority` from a below-the-fold image, re-animates when the topic changes, plain eyebrow.

## 2026-11-19 - M9: Destination portal essentials upgrade
- **Travel Guide (`/guide` & `/en/guide`)**: Complete practical guide covering 4 seasons, arrival & inner-city transit (Airport Bus #86, Metro Line 2A & 3, Double-Decker City Tour, Cyclo/Electric tram), accommodation areas (Old Quarter, West Lake, Ba Dinh), and emergency hotline contacts.
- **Practical Facts on Destination Details**: Wired `openingHours`, `ticketInfo`, and verified `sourceUrl` to UI; added direct action buttons for "View on map" and "Open in Google Maps".
- **Social Sharing**: Interactive `ShareButtons` component with Copy Link, Facebook, and X share buttons on destinations, food, culture, and stories.
- **Planner v2**: Tabbed interface featuring Curated Itineraries (1-day, 2-day, 3-day deep routes with timelines, tips, highlights) alongside the custom itinerary generator, plus a "Print / Save Itinerary" feature.
- **Support & Legal Pages**: Created `/contact` (Tourist Info Center + interactive feedback form), `/faq` (frequently asked travel questions), `/privacy` (Privacy Policy), and `/terms` (Terms of Service).
- **Navigation & Sitemap**: Added Guide to main navigation; integrated Essentials & Legal links in Footer; updated multilingual `sitemap.ts`.
- **Verified Coordinates & Facts**: Added real GPS coordinates, hours, and ticket fees for major destinations in sample dataset and seed script.

## 2026-11-19 - M8: bilingual (vi/en)
- Routes: Vietnamese unchanged at the root; English under `/en/...` for home, destinations, food, culture, stories, map, planner, about and all detail pages. Shared page components in `src/components/pages/public-pages.tsx`.
- `src/i18n`: locale helpers (`localePath`, `switchLocalePath`, ...) and typed message catalogs where English must define every key.
- Catalog and mappers take a locale and fall back to Vietnamese per item; `prisma/seed.ts` upserts English sample translations (run `npx prisma db seed`).
- Language switch in navbar and mobile menu; hreflang alternates, bilingual sitemap, localized 404 and skip link.
- Tests: 60 unit tests; 5 new e2e scenarios in `tests/e2e/i18n.spec.ts` (53 passed / 1 skipped overall).

## 2026-11-19 - M7b: admin for food, culture and stories
- Generic admin screens at `/admin/food`, `/admin/culture`, `/admin/stories` (list, create, edit, publish/hide), shared form, Zod validation (Vietnamese required, English all-or-nothing, story paragraphs).
- `/admin` shows counts and links for every content type.
- e2e helper: `purge` command and slug cleanup across all content types; new e2e scenario for the three types.

## 2026-11-19 - M7a: roles and admin destinations
- Added `Role` enum and `User.role`; migration `add_user_role`.
- `requireAdmin()` for pages and `assertAdmin()` for server actions; `/admin` is noindex and disallowed in robots.
- Admin destinations list, create and edit forms, publish/hide toggle; Zod validation with source-URL rules.
- `npm run admin:promote <email>`; e2e helper `prisma/e2e-helper.ts` (test accounts and `e2e-` slugs only).
- Admin writes call `updateTag("catalog")` and `revalidatePath` for the affected destination URL.
- e2e: 3 admin scenarios; Playwright can run against the production build with `E2E_PROD=1`.
- Project moved to `D:\dev\hanoi-discovery`.

## M6 - Auth and favorites
- Email + password registration/login, scrypt hashing, hashed session tokens, favorites, profile page.

## M0-M5
- Foundation, content pages, map, planner, SEO.
