# MailGuardian AI

Marketing site and interactive demo for **MailGuardian AI**, a fictional AI email threat detection, geolocation and forensics platform. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion and Recharts.

The centrepiece is a live SOC dashboard preview: a streaming threat feed, an attack-origin world map, a forensic detail panel, charts and a blocked-threat ticker.

> Everything in this repo is fictional. Companies, customers and quotes are invented, mock IP addresses use the reserved documentation ranges (RFC 5737), and domains are made up. Replace them before using any of this in production.

## Quick start

Requires Node.js 18.17 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Start the development server        |
| `npm run build`     | Create a production build           |
| `npm start`         | Serve the production build          |
| `npm run lint`      | Run ESLint                          |
| `npm run typecheck` | Run the TypeScript compiler         |

## Environment variables

| Variable               | Purpose                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for metadata, the sitemap and Open Graph tags                     |
| `NEXT_PUBLIC_APP_URL`  | Where the "Sign In" button points                                                          |
| `LEAD_WEBHOOK_URL`     | Optional. Trial and newsletter sign-ups are forwarded here as JSON. Logged locally if unset |
| `IPINFO_TOKEN`         | Optional IPinfo Core token used by the sender IP lookup on `/demo`; kept server-side         |

The lead endpoint (`app/api/lead/route.ts`) validates the email, ignores honeypot submissions and forwards `{ email, source, receivedAt }` to the webhook. Point it at Zapier, Make, Slack or your own service.

The sender-IP lookup (`app/api/geolocate/route.ts`) accepts a public IP address and returns approximate IP-based location and network data. It uses IPinfo Core when `IPINFO_TOKEN` is configured. The dashboard's built-in sample IPs are RFC 5737 documentation ranges and intentionally cannot be resolved.

## Project structure

```
app/
  layout.tsx            Fonts, metadata, JSON-LD, navbar and footer
  page.tsx              Home page, sections in order
  [slug]/page.tsx       About, careers, partners, blog, trust center, legal pages
  docs/page.tsx         Quickstart and API reference
  api/lead/route.ts     Email capture endpoint
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
components/
  sections/             One file per home page section
  dashboard/            Feed, detail panel, charts, ticker
  shared/               Reveal, counters, world map, code block, lead form
  layout/               Navbar, footer, page shell
  ui/                   Button, Card, Badge, Input, Switch, Accordion
lib/
  content.ts            All marketing copy, pricing, FAQ, testimonials
  mock-data.ts          Synthetic threat data behind the dashboard
  config.ts             Site name, URLs, navigation, footer links
  geo.ts                d3-geo projection for the world map
  pages.ts              Copy for the secondary pages
```

## Customising

- **Brand and links:** `lib/config.ts`
- **Copy, pricing, FAQ, testimonials:** `lib/content.ts`
- **Colours:** CSS variables in `app/globals.css`, mirrored in `lib/theme.ts` for charts and SVG
- **Dashboard data:** `lib/mock-data.ts`
- **Legal and company pages:** `lib/pages.ts`

## Before you publish

- Swap the invented trust-bar companies and testimonials for approved ones.
- Replace the generic integration icons with each vendor's official brand assets, following their guidelines.
- Replace the demo legal pages with reviewed policies.
- Check the statistics in the Problem section against their cited sources.

## Accessibility and performance

- Semantic landmarks, a skip link, visible focus rings and labelled controls throughout.
- Motion respects `prefers-reduced-motion`. The live feed starts paused for those users and can be resumed.
- The dashboard only streams while it is on screen.
- Icons and chart code are tree-shaken, and the site uses self-hosted variable fonts.
