import { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import VolumeDealDetail from './VolumeDealDetail';
import CommitmentDealDetail from './CommitmentDealDetail';

const TABS = ['Overview', 'Products'];

export default function DealModal({ open, deal, commitmentView, onClose }) {
  const [tab, setTab] = useState('Overview');

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open || !deal) return null;

  const title = deal.type === 'commitment' ? 'Commitment deal' : 'Volume discount';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div className="relative bg-do-surface rounded-lg shadow-modal w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-do-border">
          <h2 className="text-xl font-bold text-do-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-do-gray-400 hover:text-do-gray-600 transition-colors rounded cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-do-border">
          <div className="flex gap-6">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative py-3 text-sm font-semibold transition-colors cursor-pointer ${
                  tab === t
                    ? 'text-do-gray-900'
                    : 'text-do-gray-500 hover:text-do-gray-700'
                }`}
              >
                {t}
                {tab === t && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-do-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto">
          {deal.type === 'volume' ? (
            <VolumeDealDetail tab={tab} />
          ) : (
            <CommitmentDealDetail tab={tab} view={commitmentView} />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-do-border bg-do-gray-50/60 rounded-b-lg">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-do-blue-500 hover:text-do-blue-600 cursor-pointer"
          >
            Help &amp; resources
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-do-gray-600 hover:text-do-gray-800 cursor-pointer"
          >
            Contact our team
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
