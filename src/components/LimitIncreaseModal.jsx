import { useState } from 'react';
import { Check, Zap, Star } from 'lucide-react';
import Modal from './Modal';

const tiers = [
  {
    id: 'tier2',
    name: 'Tier 2',
    prepay: 50,
    monthlyLimit: 500,
    icon: Zap,
    highlighted: false,
    features: [
      '$500/mo spending limit',
      'Standard support priority',
      'All serverless products',
    ],
  },
  {
    id: 'tier3',
    name: 'Tier 3',
    prepay: 500,
    monthlyLimit: 5000,
    icon: Star,
    highlighted: true,
    badge: 'Recommended',
    features: [
      '$5,000/mo spending limit',
      'Priority support',
      'All serverless products',
      'Early access to new features',
    ],
  },
];

export default function LimitIncreaseModal({ open, onClose }) {
  const [selected, setSelected] = useState('tier3');

  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Increase Your Spending Limit">
      <div className="space-y-5">
        <p className="text-sm text-do-gray-600">
          Make a one-time prepayment to unlock a higher monthly spending limit.
          Choose the tier that fits your workload.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {tiers.map((tier) => {
            const isSelected = selected === tier.id;
            const Icon = tier.icon;

            return (
              <button
                key={tier.id}
                onClick={() => setSelected(tier.id)}
                className={`relative flex flex-col items-start p-4 rounded-lg border-2 text-left transition-all cursor-pointer
                  ${isSelected
                    ? 'border-do-blue-500 bg-do-blue-50/50 shadow-sm'
                    : 'border-do-border bg-white hover:border-do-gray-300'
                  }`}
              >
                {tier.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-do-blue-500 text-white rounded-full">
                    {tier.badge}
                  </span>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center
                      ${tier.highlighted
                        ? 'bg-do-blue-500 text-white'
                        : 'bg-do-gray-100 text-do-gray-600'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-do-gray-900">
                    {tier.name}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-2xl font-bold text-do-gray-900">
                    ${tier.prepay.toLocaleString()}
                  </span>
                  <span className="text-xs text-do-gray-500 ml-1">prepaid credit</span>
                </div>

                <p className="text-xs text-do-gray-500 mb-3">
                  Unlocks <span className="font-semibold text-do-gray-700">${tier.monthlyLimit.toLocaleString()}</span>/mo limit
                </p>

                <ul className="space-y-1.5 w-full">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-do-gray-600">
                      <Check className="w-3 h-3 text-do-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-do-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-do-blue-50 border border-do-blue-200">
          <span className="text-do-blue-500 text-sm mt-0.5">i</span>
          <p className="text-xs text-do-gray-700">
            <span className="font-medium">Your prepayment is an account credit, not a fee.</span>{' '}
            It will be applied toward your future usage charges. Unused credit remains
            on your account.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-do-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-do-gray-700 bg-white border border-do-border rounded-md hover:bg-do-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-do-blue-500 rounded-md hover:bg-do-blue-600 transition-colors cursor-pointer"
          >
            Confirm &amp; Pay $
            {selected === 'tier3' ? '500' : '50'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
