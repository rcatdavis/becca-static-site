import { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import WarningBanner from './components/WarningBanner';
import AlertTable from './components/AlertTable';
import CreateAlertModal from './components/CreateAlertModal';
import LimitIncreaseModal from './components/LimitIncreaseModal';

export default function App() {
  const [createAlertOpen, setCreateAlertOpen] = useState(false);
  const [limitIncreaseOpen, setLimitIncreaseOpen] = useState(false);

  return (
    <div className="min-h-screen bg-do-bg">
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-do-gray-900">
            Serverless Budgets &amp; Limits
          </h1>
          <button
            onClick={() => setCreateAlertOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-do-blue-500 rounded-md hover:bg-do-blue-600 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Spend Alert
          </button>
        </div>

        {/* Warning banner */}
        <div className="mb-6">
          <WarningBanner onIncrease={() => setLimitIncreaseOpen(true)} />
        </div>

        {/* Active Alerts section */}
        <div>
          <h2 className="text-xs font-semibold text-do-gray-500 uppercase tracking-wider mb-3">
            Active Alerts
          </h2>
          <AlertTable />
        </div>
      </main>

      {/* Modals */}
      <CreateAlertModal
        open={createAlertOpen}
        onClose={() => setCreateAlertOpen(false)}
      />
      <LimitIncreaseModal
        open={limitIncreaseOpen}
        onClose={() => setLimitIncreaseOpen(false)}
      />
    </div>
  );
}
