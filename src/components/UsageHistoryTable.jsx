import { Download } from 'lucide-react';
import { usageHistory } from '../data';

function exportCsv() {
  const headers = ['Date', 'User', 'Type', 'Model', 'Tokens', 'Cost (USD)'];
  const rows = usageHistory.map((e) => [
    e.date,
    e.user,
    e.type,
    e.model,
    e.tokens,
    e.cost.toFixed(2),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'inference-usage-history.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const COLS = [
  { key: 'date', label: 'Date', align: 'left' },
  { key: 'user', label: 'User', align: 'left' },
  { key: 'type', label: 'Type', align: 'left' },
  { key: 'model', label: 'Model', align: 'left' },
  { key: 'tokens', label: 'Tokens', align: 'right' },
  { key: 'cost', label: 'Cost', align: 'right' },
];

export default function UsageHistoryTable() {
  return (
    <section className="bg-do-surface rounded-lg border border-do-border shadow-card overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
        <div>
          <h2 className="text-base font-bold text-do-gray-900">
            Inference usage history
          </h2>
          <p className="text-sm text-do-gray-500 mt-0.5">
            Up to 50 recent events in this range · prices shown are illustrative
          </p>
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-do-gray-700 bg-white border border-do-border rounded-md hover:border-do-blue-500 hover:text-do-blue-600 transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
          <thead>
            <tr className="bg-do-gray-50 border-y border-do-border">
              {COLS.map((c) => (
                <th
                  key={c.key}
                  className={`px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-do-gray-500 ${
                    c.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usageHistory.map((e, i) => (
              <tr
                key={i}
                className="border-b border-do-border/50 last:border-0 hover:bg-do-gray-50/50 transition-colors"
              >
                <td className="px-6 py-3 text-sm text-do-gray-600 whitespace-nowrap">
                  {e.date}
                </td>
                <td className="px-6 py-3 text-sm text-do-gray-800 whitespace-nowrap">
                  {e.user}
                </td>
                <td className="px-6 py-3 text-sm text-do-gray-700 whitespace-nowrap">
                  {e.type}
                </td>
                <td className="px-6 py-3 text-sm font-mono text-do-gray-700 whitespace-nowrap">
                  {e.model}
                </td>
                <td className="px-6 py-3 text-sm text-do-gray-700 text-right tabular-nums">
                  {e.tokens.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-sm font-medium text-do-gray-900 text-right tabular-nums">
                  ${e.cost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
