# Dammam Top‑1% Next.js Starter (AR/EN, RTL, 20% deposit)

A production‑grade starter for your Dammam venues MVP with:
- Next.js (App Router) + TypeScript
- Arabic/English with **next-intl**, one‑tap toggle, full **RTL**
- Tailwind + RTL plugin
- Venues + Services pages, Venue detail with **20% deposit** widget
- Demo **Checkout** with STC Pay / Al Rajhi / Offline (cash) selection (UI only)
- Accessibility & performance‑friendly defaults

## Quick start (Cursor or VS Code)

```bash
npm i
npm run dev
# open http://localhost:3000/ar  (Arabic default)
```

## What’s included

- `app/[locale]/...` bilingual routing
- `middleware.ts` for locale detection
- `messages/en.json`, `messages/ar.json` — translate all UI strings
- `components/` — Header (toggle), VenueCard, BookingWidget
- `lib/data.ts` — mock venues (Dammam-only)
- Tailwind RTL already wired

## Customize

- Update `lib/data.ts` with your real venues.
- Add services or new pages under `app/[locale]`.
- Configure remote images in `next.config.mjs` as needed.

## Notes

This is a demo UI; no real payments. When ready, wire your gateway (HyperPay/PayTabs) and webhooks to confirm the 20% deposit flow.
