import { TrendingUp, TrendingDown } from 'lucide-react';
import { fmtUSD, spendThisMonth } from '../data';

export default function SpendThisMonth() {
  const { total, prevTotal, asOf, byProduct } = spendThisMonth;
  const max = Math.max(...byProduct.map((p) => p.spend));
  const deltaPct = Math.round(((total - prevTotal) / prevTotal) * 100);
  const up = deltaPct >= 0;

  return (
    <section className="bg-do-surface rounded-lg border border-do-border shadow-card p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-do-gray-900">Spend this month</h2>
          <p className="text-sm text-do-gray-500 mt-0.5">
            Net usage after discounts · as of {asOf}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-do-gray-900">{fmtUSD(total)}</div>
          <div
            className={`inline-flex items-center gap-1 text-sm font-medium mt-0.5 ${
              up ? 'text-do-orange-600' : 'text-do-green-600'
            }`}
          >
            {up ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {up ? '+' : ''}
            {deltaPct}% vs last month ({fmtUSD(prevTotal)})
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {byProduct.map((p) => (
          <div key={p.product} className="flex items-center gap-4">
            <span className="w-40 shrink-0 text-sm text-do-gray-600 truncate">
              {p.product}
            </span>
            <div className="flex-1 h-3 rounded-full bg-do-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-do-blue-500 transition-all"
                style={{ width: `${(p.spend / max) * 100}%` }}
              />
            </div>
            <span className="w-20 shrink-0 text-sm font-medium text-do-gray-900 text-right tabular-nums">
              {fmtUSD(p.spend)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
