import { Download, Layers } from 'lucide-react';
import Pacing from './Pacing';
import {
  account,
  fmtUSD,
  volumeDeal,
  volumeProducts,
  volumeSummary,
  volumeTiers,
} from '../data';

function AnchorBadge() {
  return (
    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-do-blue-600 bg-do-blue-50">
      Anchor
    </span>
  );
}

function Term({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-do-gray-500">{label}</dt>
      <dd className="text-sm font-medium text-do-gray-900 mt-0.5">{value}</dd>
    </div>
  );
}

function Overview() {
  const s = volumeSummary;
  return (
    <div className="space-y-6">
      {/* Current tier */}
      <div className="rounded-lg border border-do-violet-100 bg-do-violet-50/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-do-violet-700">
          Current tier
        </p>
        <h3 className="text-2xl font-bold text-do-gray-900 mt-1">
          {s.currentTier.name} · {s.currentTier.headlineRate}%
        </h3>
        <p className="text-sm text-do-gray-600 mt-1">
          Net spend counted: {fmtUSD(s.netSpend)} · No annual minimum
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-do-gray-600">{fmtUSD(s.netSpend)}</span>
            <span className="font-semibold text-do-violet-700">
              {fmtUSD(s.progressCeiling)}
            </span>
          </div>
          <Pacing
            value={s.netSpend}
            max={s.progressCeiling}
            accent="violet"
            height="h-2.5"
          />
        </div>

        <p className="text-sm text-do-gray-700 mt-4 leading-relaxed">
          <span className="font-semibold text-do-gray-900">Next tier</span> — at{' '}
          {fmtUSD(s.nextTier.bandStart)} of net spend your rate moves to{' '}
          <span className="font-semibold">{s.nextTier.headlineRate}%</span> (the{' '}
          {fmtUSD(s.nextTier.bandStart, { maximumFractionDigits: 0 })
            .replace(',000', 'k')}
          –
          {fmtUSD(s.nextTier.bandEnd).replace(',000', 'k')} band).{' '}
          {fmtUSD(s.toNextTier)} of additional net spend to reach it.
        </p>
      </div>

      {/* Contract terms */}
      <div>
        <h4 className="text-base font-semibold text-do-gray-900 mb-3">
          Contract terms
        </h4>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
          <Term label="Account" value={account.name} />
          <Term label="Term" value={account.term} />
          <Term label="Structure" value={volumeDeal.structure} />
          <Term label="Account executive" value={account.accountExecutive} />
        </dl>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-do-blue-500 hover:text-do-blue-600 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download contract PDF
        </a>
      </div>
    </div>
  );
}

function TierCard({ tier, current }) {
  return (
    <div
      className={`rounded-lg border ${
        current
          ? 'border-do-violet-500/60 ring-1 ring-do-violet-500/30'
          : 'border-do-border'
      } overflow-hidden`}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 ${
          current ? 'bg-do-violet-50' : 'bg-do-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-do-gray-900">
            {tier.name} · {fmtUSD(tier.bandStart).replace(',000', 'k')}–
            {fmtUSD(tier.bandEnd).replace(',000', 'k')}
          </span>
          {current && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-do-violet-700 bg-do-violet-100">
              Current
            </span>
          )}
        </div>
        <span className="text-base font-bold text-do-gray-900">
          {tier.headlineRate}%
        </span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-do-border/70">
            <th className="text-left px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-do-gray-400">
              Product
            </th>
            <th className="text-right px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-do-gray-400">
              Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {tier.rates.map((r, i) => (
            <tr
              key={r.product}
              className={i % 2 === 1 ? 'bg-do-gray-50/40' : ''}
            >
              <td className="px-4 py-2 text-sm text-do-gray-800">
                {r.product}
                {r.anchor && <AnchorBadge />}
              </td>
              <td className="px-4 py-2 text-sm font-semibold text-do-gray-900 text-right">
                {r.rate}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Products() {
  const s = volumeSummary;
  return (
    <div className="space-y-6">
      <p className="text-sm text-do-gray-600">
        Eligible product spend at your current{' '}
        <span className="font-semibold text-do-gray-900">
          {s.currentTier.name}
        </span>{' '}
        rates.
      </p>

      {/* Savings callout */}
      <div className="rounded-lg border border-do-green-500/30 bg-do-green-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-do-green-700">
          Your savings this term
        </p>
        <p className="text-3xl font-bold text-do-green-700 mt-1">
          {fmtUSD(s.saved)}
        </p>
        <p className="text-sm text-do-gray-600 mt-1">
          {s.blendedRate}% blended off eligible usage · {fmtUSD(s.listSpend)} list
          → <span className="font-semibold text-do-gray-900">{fmtUSD(s.netSpend)}</span> net
        </p>
      </div>

      {/* Per-product table */}
      <div className="rounded-lg border border-do-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-do-gray-50 border-b border-do-border">
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                Product
              </th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                List spend
              </th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                Rate
              </th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                Saved
              </th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                Net spend
              </th>
            </tr>
          </thead>
          <tbody>
            {volumeProducts.map((p, i) => (
              <tr
                key={p.product}
                className={`border-b border-do-border/60 last:border-0 ${
                  i % 2 === 1 ? 'bg-do-gray-50/40' : ''
                }`}
              >
                <td className="px-4 py-3 text-sm font-medium text-do-gray-800">
                  {p.product}
                </td>
                <td className="px-4 py-3 text-sm text-do-gray-600 text-right">
                  {fmtUSD(p.listSpend)}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-do-gray-900 text-right">
                  {p.rate}%
                </td>
                <td className="px-4 py-3 text-sm font-medium text-do-green-700 text-right">
                  −{fmtUSD(p.saved)}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-do-gray-900 text-right">
                  {fmtUSD(p.netSpend)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* All tiers */}
      <div>
        <h4 className="text-base font-semibold text-do-gray-900">All volume tiers</h4>
        <p className="flex items-start gap-1.5 text-sm text-do-gray-500 mt-1 mb-3">
          <Layers className="w-4 h-4 mt-0.5 shrink-0 text-do-gray-400" />
          Rates apply marginally to spend within each band — like tax brackets,
          only the spend inside a band earns that band&apos;s rate.
        </p>
        <div className="space-y-3">
          {volumeTiers.map((t) => (
            <TierCard
              key={t.id}
              tier={t}
              current={t.id === s.currentTier.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VolumeDealDetail({ tab }) {
  return tab === 'Products' ? <Products /> : <Overview />;
}
