// ---------------------------------------------------------------------------
// Mock data for the Billing Insights prototype.
//
// Two discount structures are modeled:
//   1. Volume discount  — marginal / tiered rates (think tax brackets) where
//      each product (SKU) earns a different rate inside each spend band.
//   2. Commitment deal  — the customer commits to a total spend over the term;
//      individual SKUs carry their own negotiated rates, and any shortfall at
//      term end is reconciled with a true-up adjustment.
//
// Language note: customer-facing copy intentionally avoids sales terms such as
// "upsell" and "floor". Bands are "tiers", the committed total is the
// "commitment", and a shortfall is reconciled via a "true-up adjustment".
// ---------------------------------------------------------------------------

export const fmtUSD = (n, opts = {}) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    ...opts,
  });

export const fmtPct = (n) => `${n}%`;

// --- Account context -------------------------------------------------------
export const account = {
  name: 'Acme Robotics, Inc.',
  term: 'Jan 1, 2026 – Dec 31, 2026',
  accountExecutive: 'Jane Doe',
  // 91 days left in a 365-day term => ~75% of the term elapsed.
  daysLeft: 91,
  termElapsedFraction: 0.75,
};

// ---------------------------------------------------------------------------
// 1. VOLUME DISCOUNT (marginal / tiered)
// ---------------------------------------------------------------------------
// Each tier is a spend band. Within a band, every product earns its own rate.
// "anchor" products are the strategic SKUs the deal is built around.
export const volumeTiers = [
  {
    id: 'tier-1',
    name: 'Tier 1',
    headlineRate: 15,
    bandStart: 0,
    bandEnd: 120000,
    rates: [
      { product: 'Droplet', rate: 10, anchor: true },
      { product: 'Volumes', rate: 13 },
      { product: 'Spaces', rate: 13 },
      { product: 'DBaaS', rate: 10, anchor: true },
      { product: 'LBaaS', rate: 13 },
      { product: 'DOKS', rate: 10, anchor: true },
    ],
  },
  {
    id: 'tier-2',
    name: 'Tier 2',
    headlineRate: 20,
    bandStart: 120000,
    bandEnd: 150000,
    rates: [
      { product: 'Droplet', rate: 18, anchor: true },
      { product: 'Volumes', rate: 21 },
      { product: 'Spaces', rate: 21 },
      { product: 'DBaaS', rate: 18, anchor: true },
      { product: 'LBaaS', rate: 21 },
      { product: 'DOKS', rate: 18, anchor: true },
      { product: 'DOCR', rate: 21 },
      { product: 'App Platform', rate: 21 },
      { product: 'Bandwidth overage', rate: 21 },
    ],
  },
  {
    id: 'tier-3',
    name: 'Tier 3',
    headlineRate: 25,
    bandStart: 150000,
    bandEnd: 180000,
    rates: [
      { product: 'Droplet', rate: 22, anchor: true },
      { product: 'Volumes', rate: 25 },
      { product: 'Spaces', rate: 25 },
      { product: 'DBaaS', rate: 22, anchor: true },
      { product: 'LBaaS', rate: 25 },
      { product: 'DOKS', rate: 22, anchor: true },
    ],
  },
];

// Current-term eligible usage per product (list spend), at Tier 1 rates.
const volumeUsage = [
  { product: 'Droplet', listSpend: 15000, anchor: true },
  { product: 'Volumes', listSpend: 8000 },
  { product: 'Spaces', listSpend: 8000 },
  { product: 'DBaaS', listSpend: 15000, anchor: true },
  { product: 'LBaaS', listSpend: 8000 },
  { product: 'DOKS', listSpend: 15000, anchor: true },
];

function buildVolumeProducts() {
  const tier1 = volumeTiers[0];
  return volumeUsage.map((u) => {
    const rate = tier1.rates.find((r) => r.product === u.product)?.rate ?? 0;
    const saved = Math.round((u.listSpend * rate) / 100);
    return {
      product: u.product,
      anchor: u.anchor ?? false,
      rate,
      listSpend: u.listSpend,
      saved,
      netSpend: u.listSpend - saved,
    };
  });
}

export const volumeProducts = buildVolumeProducts();

export const volumeSummary = (() => {
  const listSpend = volumeProducts.reduce((s, p) => s + p.listSpend, 0);
  const saved = volumeProducts.reduce((s, p) => s + p.saved, 0);
  const netSpend = listSpend - saved;
  const currentTier = volumeTiers[0];
  const nextTier = volumeTiers[1];
  const toNextTier = Math.max(nextTier.bandStart - netSpend, 0);
  // Effective blended rate across eligible usage.
  const blendedRate = Math.round((saved / listSpend) * 100);
  return {
    listSpend,
    saved,
    netSpend,
    blendedRate,
    currentTier,
    nextTier,
    toNextTier,
    // Progress is shown against the top of the next band for visual context.
    progressCeiling: nextTier.bandEnd,
  };
})();

export const volumeDeal = {
  id: 'volume',
  type: 'volume',
  name: 'Volume discount',
  shortName: 'Volume discount',
  expires: 'Dec 31, 2026',
  structure: 'Usage-based tiered discounts — marginal rates, no minimum commitment',
};

// ---------------------------------------------------------------------------
// 2. COMMITMENT DEAL (multi-SKU rates + commitment with true-up)
// ---------------------------------------------------------------------------
// The customer commits to $120k of net spend across the term. Each SKU carries
// its own negotiated discount rate. "target" is each SKU's share of the
// commitment. Spend per SKU is derived from the active scenario's pace.
export const commitmentCommitment = 120000;

export const commitmentSkus = [
  { product: 'Droplet', rate: 5, target: 20000, anchor: true },
  { product: 'Volumes', rate: 10, target: 10000 },
  { product: 'Spaces', rate: 10, target: 10000 },
  { product: 'DBaaS', rate: 5, target: 20000, anchor: true },
  { product: 'LBaaS', rate: 10, target: 10000 },
  { product: 'DOKS', rate: 5, target: 20000, anchor: true },
  { product: 'DOCR', rate: 10, target: 10000 },
  { product: 'App Platform', rate: 10, target: 10000 },
  { product: 'Bandwidth overage', rate: 0, target: 10000 },
];

export const commitmentDeal = {
  id: 'commitment',
  type: 'commitment',
  name: 'Enterprise Commitment — FY2026',
  shortName: 'Commitment deal',
  expires: 'Dec 31, 2026',
  package: 'Full Stack Builder · Grow',
  commitment: commitmentCommitment,
};

// ---------------------------------------------------------------------------
// SCENARIOS — drive the commitment pacing for the prototype.
// ---------------------------------------------------------------------------
export const scenarios = [
  { id: 'on-track', label: 'On track' },
  { id: 'at-risk', label: 'At risk' },
  { id: 'settled', label: 'Settled (behind)' },
];

// Each scenario sets how far along the commitment the customer has spent and
// whether the term is still running.
const scenarioConfig = {
  'on-track': { spentFraction: 0.8, termEnded: false },
  'at-risk': { spentFraction: 0.5525, termEnded: false },
  'settled': { spentFraction: 0.5525, termEnded: true },
};

// Returns a fully computed commitment view for the given scenario id.
export function getCommitmentView(scenarioId) {
  const cfg = scenarioConfig[scenarioId] ?? scenarioConfig['at-risk'];
  const commitment = commitmentCommitment;
  const targetToday = Math.round(commitment * account.termElapsedFraction);

  const products = commitmentSkus.map((sku) => {
    const spent = Math.round(sku.target * cfg.spentFraction);
    return {
      product: sku.product,
      anchor: sku.anchor ?? false,
      rate: sku.rate,
      target: sku.target,
      spent,
      left: Math.max(sku.target - spent, 0),
    };
  });

  const spent = products.reduce((s, p) => s + p.spent, 0);
  const left = Math.max(commitment - spent, 0);
  const pacingDelta = spent - targetToday; // positive => ahead of pace
  const shortfall = Math.max(commitment - spent, 0);

  let status;
  if (cfg.termEnded) {
    status = shortfall > 0 ? 'settled-behind' : 'settled-met';
  } else if (pacingDelta >= 0) {
    status = 'on-track';
  } else {
    status = 'at-risk';
  }

  return {
    scenarioId,
    termEnded: cfg.termEnded,
    commitment,
    targetToday,
    targetTodayFraction: account.termElapsedFraction,
    spent,
    left,
    pacingDelta,
    shortfall,
    status,
    products,
  };
}

// ---------------------------------------------------------------------------
// SPEND THIS MONTH — visualization data for the top of the page.
// ---------------------------------------------------------------------------
export const spendThisMonth = {
  total: 8420,
  prevTotal: 7180,
  asOf: 'Jun 7, 2026',
  // Net spend by product for the current calendar month.
  byProduct: [
    { product: 'Droplet', spend: 2360 },
    { product: 'DBaaS', spend: 1980 },
    { product: 'DOKS', spend: 1540 },
    { product: 'Spaces', spend: 880 },
    { product: 'GenAI / Inference', spend: 760 },
    { product: 'Volumes', spend: 520 },
    { product: 'LBaaS', spend: 240 },
    { product: 'Bandwidth overage', spend: 140 },
  ],
};

// ---------------------------------------------------------------------------
// INFERENCE USAGE HISTORY — recent events table.
// ---------------------------------------------------------------------------
export const usageHistory = [
  { date: 'Jun 7, 2026 · 14:22', user: 'maya@acme.dev', type: 'Chat completion', model: 'gpt-oss-120b', tokens: 184320, cost: 4.21 },
  { date: 'Jun 7, 2026 · 13:58', user: 'svc-batch', type: 'Embedding', model: 'gte-large-en', tokens: 92160, cost: 0.18 },
  { date: 'Jun 7, 2026 · 13:40', user: 'liam@acme.dev', type: 'Chat completion', model: 'llama-3.3-70b', tokens: 61440, cost: 1.07 },
  { date: 'Jun 7, 2026 · 12:11', user: 'svc-rag', type: 'Embedding', model: 'gte-large-en', tokens: 256000, cost: 0.51 },
  { date: 'Jun 7, 2026 · 11:46', user: 'maya@acme.dev', type: 'Chat completion', model: 'gpt-oss-120b', tokens: 142000, cost: 3.24 },
  { date: 'Jun 7, 2026 · 10:32', user: 'svc-agent', type: 'Tool call', model: 'llama-3.3-70b', tokens: 38000, cost: 0.66 },
  { date: 'Jun 7, 2026 · 09:58', user: 'priya@acme.dev', type: 'Chat completion', model: 'deepseek-r1-distill', tokens: 210500, cost: 2.95 },
  { date: 'Jun 7, 2026 · 09:15', user: 'svc-batch', type: 'Embedding', model: 'gte-large-en', tokens: 512000, cost: 1.02 },
  { date: 'Jun 6, 2026 · 22:04', user: 'liam@acme.dev', type: 'Chat completion', model: 'gpt-oss-120b', tokens: 96000, cost: 2.19 },
  { date: 'Jun 6, 2026 · 18:41', user: 'svc-rag', type: 'Embedding', model: 'gte-large-en', tokens: 320000, cost: 0.64 },
  { date: 'Jun 6, 2026 · 16:20', user: 'maya@acme.dev', type: 'Chat completion', model: 'llama-3.3-70b', tokens: 74240, cost: 1.30 },
  { date: 'Jun 6, 2026 · 15:02', user: 'svc-agent', type: 'Tool call', model: 'llama-3.3-70b', tokens: 41200, cost: 0.72 },
  { date: 'Jun 6, 2026 · 11:37', user: 'priya@acme.dev', type: 'Chat completion', model: 'deepseek-r1-distill', tokens: 188000, cost: 2.63 },
  { date: 'Jun 5, 2026 · 20:55', user: 'svc-batch', type: 'Embedding', model: 'gte-large-en', tokens: 448000, cost: 0.89 },
  { date: 'Jun 5, 2026 · 17:18', user: 'liam@acme.dev', type: 'Chat completion', model: 'gpt-oss-120b', tokens: 122880, cost: 2.80 },
];
