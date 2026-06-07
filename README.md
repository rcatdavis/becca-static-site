# Billing Insights — Discounts & Commitments (Prototype)

A high-fidelity prototype of DigitalOcean's billing console **Insights** tab,
focused on making it crystal clear how a customer's spend counts toward their
negotiated discounts. Built with React 19 and Tailwind CSS v4, reusing the
existing billing console design system.

## What it shows

- **Spend this month** — a per-product visualization of net usage so customers
  can see where their money is going before they look at their discounts.
- **Commitment & volume deals** — a single place to see every active agreement,
  how it's pacing, and the current tier/spend, with a row-level drill-in.
- **Inference usage history** — recent usage events with a working CSV export.

### Two discount structures

1. **Volume discount (marginal / tiered).** Rates increase as net spend crosses
   each band — and, like tax brackets, only the spend *within* a band earns that
   band's rate. Each product (SKU) carries its own rate inside every tier.
2. **Commitment deal (multi-SKU rates + commitment).** The customer commits to a
   total spend across the term. Each SKU has its own negotiated rate, and any
   shortfall at term end is reconciled with a **true-up adjustment**.

### Customer-first language

Sales-oriented terms are intentionally avoided. There is no "upsell" or "floor":
spend bands are **tiers**, the committed total is the **commitment**, and a
shortfall is reconciled via a **true-up adjustment**.

### Preview scenarios

A demo toggle (On track / At risk / Settled) re-paces the commitment deal so
reviewers can see each state — including a settled term where a true-up
adjustment is shown.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build & deploy

The Vite `base` is set to `./` so the production build works under any
GitHub Pages subpath (e.g. the internal `rdavis/prototypes` site).

```bash
npm run build   # outputs to dist/
npm run preview
```

## Tech stack

- React 19
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Vite
- Lucide React (icons)
