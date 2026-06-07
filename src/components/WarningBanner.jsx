import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export default function WarningBanner({ onIncrease }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-lg border border-do-yellow-400/40 bg-do-yellow-50">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-do-yellow-500 shrink-0" />
        <p className="text-sm text-do-gray-800">
          <span className="font-semibold">
            You are nearing your Tier 2 GenAI Token limits (85% used).
          </span>{' '}
          Avoid interruption:
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onIncrease}
          className="px-4 py-2 text-sm font-medium text-white bg-do-blue-500 rounded-md hover:bg-do-blue-600 transition-colors cursor-pointer"
        >
          Increase limit now
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-do-gray-400 hover:text-do-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
