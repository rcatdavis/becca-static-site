import { Download } from 'lucide-react';
import Pacing from './Pacing';
import { account, commitmentDeal, fmtUSD } from '../data';

const STATUS = {
  'on-track': {
    badge: 'On track',
    badgeClass: 'text-do-green-700 border-do-green-500/40',
    cardClass: 'border-do-green-500/30 bg-do-green-50/60',
    accent: 'green',
    title: "You're on track",
  },
  'at-risk': {
    badge: 'At risk',
    badgeClass: 'text-do-orange-700 border-do-orange-400/50',
    cardClass: 'border-do-orange-400/40 bg-do-orange-50/70',
    accent: 'orange',
    title: "You're behind pace",
  },
  'settled-behind': {
    badge: 'Settled',
    badgeClass: 'text-do-gray-600 border-do-gray-300',
    cardClass: 'border-do-gray-300 bg-do-gray-50',
    accent: 'gray',
    title: 'Term settled',
  },
  'settled-met': {
    badge: 'Commitment met',
    badgeClass: 'text-do-green-700 border-do-green-500/40',
    cardClass: 'border-do-green-500/30 bg-do-green-50/60',
    accent: 'green',
    title: 'Commitment met',
  },
};

function AnchorBadge() {
  return (
    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-do-blue-600 bg-do-blue-50">
      Anchor
    </span>
  );
}

function Term({ label, value, emphasis }) {
  return (
    <div>
      <dt className="text-sm text-do-gray-500">{label}</dt>
      <dd
        className={`text-sm font-medium mt-0.5 ${
          emphasis ? 'text-do-orange-700' : 'text-do-gray-900'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function statusMessage(view) {
  switch (view.status) {
    case 'on-track':
      return `Ahead of pace by ${fmtUSD(view.pacingDelta)}. Keep current usage to comfortably meet your commitment by term end.`;
    case 'at-risk':
      return `Behind pace by ${fmtUSD(-view.pacingDelta)}. Increasing usage on covered products keeps you on track and avoids a year-end true-up adjustment.`;
    case 'settled-behind':
      return `A ${fmtUSD(view.shortfall)} commitment true-up was applied to reconcile the gap between your usage and your committed total.`;
    case 'settled-met':
      return 'Your usage met the committed total for the term. No true-up adjustment was applied.';
    default:
      return '';
  }
}

function Overview({ view }) {
  const cfg = STATUS[view.status] ?? STATUS['at-risk'];
  return (
    <div className="space-y-6">
      <div className={`rounded-lg border p-5 ${cfg.cardClass}`}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-do-gray-900">{cfg.title}</h3>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-white/70 ${cfg.badgeClass}`}
          >
            {cfg.badge}
          </span>
        </div>
        <p className="text-sm text-do-gray-700 mt-2 leading-relaxed">
          {statusMessage(view)}
        </p>

        <p className="text-xs font-semibold uppercase tracking-wider text-do-gray-500 mt-5">
          Actual / Commitment
        </p>
        <p className="text-2xl font-bold text-do-gray-900 mt-0.5">
          {fmtUSD(view.spent)}{' '}
          <span className="text-do-gray-400 font-semibold">/</span>{' '}
          {fmtUSD(view.commitment)}
        </p>

        <div className="mt-3">
          {!view.termEnded && (
            <div className="flex justify-end text-sm mb-1.5">
              <span className="text-do-gray-600">
                Target today{' '}
                <span className="font-semibold text-do-gray-900">
                  {fmtUSD(view.targetToday)}
                </span>
              </span>
            </div>
          )}
          <Pacing
            value={view.spent}
            max={view.commitment}
            accent={cfg.accent}
            target={view.termEnded ? null : view.targetToday}
            height="h-2.5"
          />
        </div>
      </div>

      <div>
        <h4 className="text-base font-semibold text-do-gray-900 mb-3">
          Contract terms
        </h4>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
          <Term label="Account" value={account.name} />
          <Term label="Term" value={account.term} />
          <Term
            label="Time remaining"
            value={view.termEnded ? 'Term ended' : `${account.daysLeft} days left`}
          />
          <Term label="Committed total" value={fmtUSD(view.commitment)} />
          <Term label="Package" value={commitmentDeal.package} />
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

function Products({ view }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-do-gray-600">
        How much you&apos;ve spent and how much is left on each product this term
        to reach your{' '}
        <span className="font-semibold text-do-gray-900">
          {fmtUSD(view.commitment)}
        </span>{' '}
        commitment. Each product earns its own negotiated rate.
      </p>

      <div className="rounded-lg border border-do-blue-100 bg-do-blue-50/40 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-do-gray-500">
          {view.termEnded ? 'Shortfall at term end' : 'Left this cycle'}
        </p>
        <p className="text-3xl font-bold text-do-gray-900 mt-1">
          {fmtUSD(view.termEnded ? view.shortfall : view.left)}
        </p>
        <p className="text-sm text-do-gray-600 mt-1">
          {fmtUSD(view.spent)} spent · {fmtUSD(view.commitment)} commitment
        </p>
        <div className="mt-3">
          <Pacing
            value={view.spent}
            max={view.commitment}
            accent="blue"
            height="h-2.5"
          />
        </div>
      </div>

      <div className="rounded-lg border border-do-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-do-gray-50 border-b border-do-border">
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                Product
              </th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                Rate
              </th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                Spent
              </th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500">
                Left to spend
              </th>
            </tr>
          </thead>
          <tbody>
            {view.products.map((p) => (
              <tr key={p.product} className="border-b border-do-border/60">
                <td className="px-4 py-3 align-top">
                  <div className="text-sm font-medium text-do-gray-800">
                    {p.product}
                    {p.anchor && <AnchorBadge />}
                  </div>
                  <div className="mt-1.5 max-w-[160px]">
                    <Pacing value={p.spent} max={p.target} accent="blue" />
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-do-gray-900 text-right align-top">
                  {p.rate}% off
                </td>
                <td className="px-4 py-3 text-sm text-do-gray-700 text-right align-top">
                  {fmtUSD(p.spent)}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-do-gray-900 text-right align-top">
                  {fmtUSD(p.left)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-do-gray-50 font-semibold">
              <td className="px-4 py-3 text-sm text-do-gray-900">Total</td>
              <td className="px-4 py-3" />
              <td className="px-4 py-3 text-sm text-do-gray-900 text-right">
                {fmtUSD(view.spent)}
              </td>
              <td className="px-4 py-3 text-sm text-do-gray-900 text-right">
                {fmtUSD(view.left)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default function CommitmentDealDetail({ tab, view }) {
  if (!view) return null;
  return tab === 'Products' ? <Products view={view} /> : <Overview view={view} />;
}
