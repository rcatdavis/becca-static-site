import { useMemo, useState } from 'react';
import { Clock } from 'lucide-react';
import SpendThisMonth from './components/SpendThisMonth';
import DealsTable from './components/DealsTable';
import UsageHistoryTable from './components/UsageHistoryTable';
import DealModal from './components/DealModal';
import { getCommitmentView } from './data';

const TABS = ['Overview', 'Usage', 'Insights', 'Invoices', 'Settings'];

export default function App() {
  const [scenario, setScenario] = useState('at-risk');
  const [activeDeal, setActiveDeal] = useState(null);

  const commitmentView = useMemo(() => getCommitmentView(scenario), [scenario]);

  return (
    <div className="min-h-screen bg-do-bg">
      {/* Console tab bar */}
      <div className="border-b border-do-border bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex gap-6">
            {TABS.map((t) => (
              <button
                key={t}
                className={`relative py-3.5 text-sm font-medium transition-colors cursor-pointer ${
                  t === 'Insights'
                    ? 'text-do-gray-900'
                    : 'text-do-gray-500 hover:text-do-gray-700'
                }`}
              >
                {t}
                {t === 'Insights' && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-do-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Disclaimer bar */}
      <div className="border-b border-do-border bg-white">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center gap-2">
          <Clock className="w-4 h-4 text-do-gray-400" />
          <span className="text-xs text-do-gray-500">
            Usage data is updated hourly. Some products may experience slight delays.
          </span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-do-gray-900">Billing insights</h1>
          <p className="text-sm text-do-gray-500 mt-1">
            Track your spend this month and how it counts toward your discounts.
          </p>
        </div>

        <div className="space-y-6">
          <SpendThisMonth />
          <DealsTable
            scenario={scenario}
            onScenarioChange={setScenario}
            commitmentView={commitmentView}
            onOpenDeal={setActiveDeal}
          />
          <UsageHistoryTable />
        </div>
      </main>

      <DealModal
        key={activeDeal?.id ?? 'closed'}
        open={!!activeDeal}
        deal={activeDeal}
        commitmentView={commitmentView}
        onClose={() => setActiveDeal(null)}
      />
    </div>
  );
}
