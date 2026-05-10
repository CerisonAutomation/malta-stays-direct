# Malta Stays Direct

> Production-grade direct booking site for Christiano Property Management, Malta.
> Built with Next.js 14 App Router + Guesty Booking Engine API (BEAPI).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CerisonAutomation/malta-stays-direct)

## Overview

A fast, SEO-first, mobile-first direct booking website that integrates with the **Guesty Booking Engine API** using the quote → reservation flow. Guests can browse properties, check availability, get instant price quotes, and complete bookings without any booking fees.

**Live preview (Emergent):** https://malta-stays-direct.preview.emergentagent.com/

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, SSR/ISR) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + custom design tokens |
| i18n | next-intl (EN + Maltese) |
| Booking API | Guesty BEAPI (server-side proxy only) |
| Payments | Stripe (tokenization, PCI-safe) |
| Validation | Zod |
| Forms | React Hook Form |
| Animations | Framer Motion |
| Analytics | GA4 (ecommerce events) + Vercel Analytics |
| Date handling | date-fns + react-day-picker |
| Data fetching | TanStack Query v5 |

## Project Structure

```
src/
  app/
    [locale]/          # i18n-aware routes (en, mt)
      page.tsx         # Homepage with hero + featured properties
      properties/      # Listing grid + search
      properties/[id]/ # Property detail + booking widget
      checkout/        # Guest info + payment
      confirm/         # Reservation confirmation
      property-owners/ # B2B acquisition page
    api/
      guesty/          # Server-side BEAPI proxy (never exposes keys)
        listings/      # GET  - list/search properties
        quotes/        # POST - create quote (price breakdown)
        reservations/  # POST - confirm reservation
        availability/  # GET  - blocked dates per listing
  components/
    properties/        # PropertyCard, PropertyGrid, PhotoGallery
    booking/           # BookingWidget, DatePicker, GuestSelector, QuoteBreakdown
    search/            # SearchBar, Filters
    layout/            # Navbar, Footer, LocaleSwitcher
    ui/                # Button, Badge, Skeleton, etc.
  lib/
    guesty/client.ts   # BEAPI client with retry + error mapping
    utils.ts           # cn, formatEur, calcEcoTax, GA4 helpers
  types/index.ts       # Full TypeScript type definitions
  i18n/routing.ts      # Locale-aware pathnames
```

## Guesty BEAPI Integration

The booking flow follows the Guesty-recommended quote → reservation pattern:

1. **Search listings** — `GET /api/guesty/listings`
2. **Get availability** — `GET /api/guesty/availability?listingId=...`
3. **Create quote** — `POST /api/guesty/quotes` (returns price breakdown + fees)
4. **Display quote** — Show base price, cleaning fee, eco-tax (€0.50/adult/night)
5. **Collect guest info + payment token**
6. **Create reservation** — `POST /api/guesty/reservations` (instant book or inquiry)
7. **Confirmation** — Display confirmation code + send email

> ⚠️ Guesty requires ~60 seconds between reservation manipulation requests.
> The client implements exponential backoff retry for 429/5xx errors.

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Key variables:

| Variable | Description |
|---|---|
| `GUESTY_BEAPI_KEY` | Guesty BEAPI secret key (server-side only) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key (server-side only) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for OG/SEO |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 measurement ID |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build
```

## Deployment

### Vercel (recommended)

1. Connect this repo to Vercel
2. Add all env vars from `.env.example`
3. Deploy - zero config needed

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy --only hosting:christianopropertymanagement
```

Firebase site ID: `christianopropertymanagement`

## Malta Eco-Tax

€0.50 per adult per night. Guests under 18 are exempt. Collected separately at check-in (not charged online). Displayed in the quote breakdown with a clear note.

## Contact

**Christiano Property Management**
- 📞 +356 7979 0202
- 💬 WhatsApp: wa.me/35679790202  
- 📧 info@christianopropertymanagement.com
- 📍 The Fives A7, Triq Charles Sciberras, St Julian's, Malta

---

*Built by [CerisonAutomation](https://github.com/CerisonAutomation)*
