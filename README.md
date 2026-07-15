# Rentiverse Finds It All


<!-- AUTO-PACKAGE-BADGES:START -->

<!-- AUTO-PACKAGE-BADGES:END -->
Rentiverse is a launch-ready storefront for a local rental marketplace: tools, event gear, outdoor equipment, creator kits, home-hosting inventory, and special-occasion style rentals in one place.

This repository now ships a complete branded website instead of a default Lovable scaffold. It also includes curated fallback listings so the experience still works when the live Supabase catalog is empty or unavailable.

## What changed

- Replaced scaffold messaging with Rentiverse-specific positioning and content
- Added curated launch inventory as a resilient fallback for empty Supabase states
- Improved listing detail pages so fallback listings and live listings both render correctly
- Removed placeholder UI flows and debug logging from the main customer journey
- Added standard user login, admin login, cart, and Stripe-ready checkout routes
- Added a research-backed affiliate sourcing board that turns public rental-marketplace research into in-app category seeding and admin follow-up
- Added revvel-standard documentation for launch, deployment, brand, and security

## Tech stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase client integration

## Local development

```bash
npm ci
npm run lint
npm run build
npm run dev
```

## Environment variables

Copy `.env.example` to `.env` and set:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_STRIPE_PAYMENT_LINK=...
```

If those values are not provided, the app falls back to the existing public Supabase configuration already wired into the project.
Stripe handoff activates when `VITE_STRIPE_PAYMENT_LINK` is configured.

## Key product sections

- Hero with search and curated demand-entry chips
- Category-led discovery for high-intent rental use cases
- Featured listings backed by Supabase with graceful curated fallback
- Research-backed affiliate sourcing board for partner-led category expansion
- Listing detail pages with pricing, delivery, and trust context
- Standard user authentication, admin authentication, cart, and checkout flows
- Trust, FAQ, and owner acquisition sections

## Documentation

- `CHANGELOG.md`
- `DEPLOYMENT_GUIDE.md`
- `GO_TO_MARKET.md`
- `BRAND_GUIDELINES.md`
- `SECURITY.md`

## Validation completed

- `npx eslint src/App.tsx src/components/Hero.tsx src/components/Header.tsx src/components/Categories.tsx src/components/SupabaseFeaturedListings.tsx src/components/HowItWorks.tsx src/components/CallToAction.tsx src/components/Footer.tsx src/components/MarketplaceHighlights.tsx src/components/TrustSection.tsx src/components/FaqSection.tsx src/components/RequireAuth.tsx src/components/AuthForm.tsx src/pages/Index.tsx src/pages/ListingDetail.tsx src/pages/NotFound.tsx src/pages/Login.tsx src/pages/AdminLogin.tsx src/pages/Cart.tsx src/pages/Checkout.tsx src/pages/Admin.tsx src/contexts/AuthContext.tsx src/contexts/CartContext.tsx src/data/marketplace.ts src/integrations/supabase/client.ts`
- `npm run build`
