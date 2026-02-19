# Serverless Budgets & Limits — Billing Console UI

A high-fidelity prototype of DigitalOcean's billing console for serverless spend alerts, built with React and Tailwind CSS v4.

## Features

- **Dashboard** — Overview of active spend alerts with progress bars, milestone badges, and safety-net indicators.
- **Warning Banner** — Triggers at 85% usage with a call-to-action to increase limits.
- **Create Spend Alert** — Modal to configure product scope, monthly dollar limit, milestone notifications (50%/75%/90%), and safety-net actions.
- **Fast-Track Limit Increase** — Modal with tiered prepayment cards (Tier 2 / Tier 3) to unlock higher spending limits.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Tech Stack

- React 19
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Vite
- Lucide React (icons)
