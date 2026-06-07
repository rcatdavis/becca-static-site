import { useState } from 'react';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import Modal from './Modal';

const products = [
  'GenAI Tokens',
  'Serverless Inference',
  'Serverless GPUs',
  'Serverless Functions',
];

export default function CreateAlertModal({ open, onClose }) {
  const [product, setProduct] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [limit, setLimit] = useState('500');
  const [milestones, setMilestones] = useState({ 50: true, 75: true, 90: true });
  const [safetyAction, setSafetyAction] = useState('email');

  const toggleMilestone = (val) =>
    setMilestones((prev) => ({ ...prev, [val]: !prev[val] }));

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create Spend Alert">
      <div className="space-y-5">
        {/* Scope */}
        <div>
          <label className="block text-sm font-medium text-do-gray-700 mb-1.5">
            Scope
          </label>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 border border-do-border rounded-md text-sm text-left hover:border-do-blue-500 focus:border-do-blue-500 focus:ring-1 focus:ring-do-blue-500 transition-colors bg-white cursor-pointer"
            >
              <span className={product ? 'text-do-gray-900' : 'text-do-gray-400'}>
                {product || 'Select a product'}
              </span>
              <ChevronDown className="w-4 h-4 text-do-gray-400" />
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-do-border rounded-md shadow-dropdown">
                {products.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setProduct(p);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-do-gray-700 hover:bg-do-blue-50 hover:text-do-blue-600 transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Monthly Limit */}
        <div>
          <label className="block text-sm font-medium text-do-gray-700 mb-1.5">
            Monthly Limit (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-do-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              min="0"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full pl-7 pr-3 py-2.5 border border-do-border rounded-md text-sm text-do-gray-900 hover:border-do-blue-500 focus:border-do-blue-500 focus:ring-1 focus:ring-do-blue-500 transition-colors outline-none"
            />
          </div>
        </div>

        {/* Proactive Alerts */}
        <div>
          <label className="block text-sm font-medium text-do-gray-700 mb-2">
            Proactive Alerts
          </label>
          <div className="space-y-2">
            {[50, 75, 90].map((val) => (
              <label key={val} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={milestones[val]}
                  onChange={() => toggleMilestone(val)}
                  className="w-4 h-4 rounded border-do-gray-300 text-do-blue-500 focus:ring-do-blue-500 cursor-pointer accent-do-blue-500"
                />
                <span className="text-sm text-do-gray-700">
                  Notify at {val}%
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Safety Net — Action at 100% */}
        <div>
          <label className="block text-sm font-medium text-do-gray-700 mb-2">
            Action at 100% Limit
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="safety"
                value="email"
                checked={safetyAction === 'email'}
                onChange={() => setSafetyAction('email')}
                className="w-4 h-4 text-do-blue-500 focus:ring-do-blue-500 cursor-pointer accent-do-blue-500"
              />
              <span className="text-sm text-do-gray-700">
                Send Email Alert Only
              </span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="safety"
                value="pause"
                checked={safetyAction === 'pause'}
                onChange={() => setSafetyAction('pause')}
                className="w-4 h-4 text-do-blue-500 focus:ring-do-blue-500 cursor-pointer accent-do-blue-500"
              />
              <span className="text-sm text-do-gray-700">
                Automatically Pause/Freeze Resource
              </span>
            </label>
          </div>
          {safetyAction === 'pause' && (
            <div className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-md bg-do-yellow-50 border border-do-yellow-400/30">
              <AlertTriangle className="w-4 h-4 text-do-yellow-500 mt-0.5 shrink-0" />
              <p className="text-xs text-do-gray-700">
                Pausing resources may disrupt availability for your applications.
                Ensure you have fallback infrastructure before enabling this option.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-do-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-do-gray-700 bg-white border border-do-border rounded-md hover:bg-do-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-do-blue-500 rounded-md hover:bg-do-blue-600 transition-colors cursor-pointer"
          >
            Save Alert
          </button>
        </div>
      </div>
    </Modal>
  );
}
