import ProgressBar from './ProgressBar';
import MilestoneBadge from './MilestoneBadge';
import SafetyBadge from './SafetyBadge';

const alerts = [
  {
    id: 1,
    product: 'Serverless Inference',
    current: 320,
    limit: 500,
    milestones: [50, 75, 90],
    activeMilestones: [50, 75, 90],
    safetyNet: 'auto-pause',
  },
  {
    id: 2,
    product: 'GenAI Tokens',
    current: 425,
    limit: 500,
    milestones: [50, 75, 90],
    activeMilestones: [50, 75, 90],
    safetyNet: 'alert-only',
  },
  {
    id: 3,
    product: 'Serverless GPUs',
    current: 180,
    limit: 500,
    milestones: [50, 75, 90],
    activeMilestones: [50, 75, 90],
    safetyNet: 'auto-pause',
  },
];

export default function AlertTable() {
  return (
    <div className="bg-do-surface rounded-lg border border-do-border shadow-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-do-border">
            <th className="text-left px-5 py-3 text-xs font-semibold text-do-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-do-gray-500 uppercase tracking-wider">
              Usage
            </th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-do-gray-500 uppercase tracking-wider">
              Milestones
            </th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-do-gray-500 uppercase tracking-wider">
              Safety Net
            </th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, idx) => (
            <tr
              key={alert.id}
              className={`${idx < alerts.length - 1 ? 'border-b border-do-border' : ''} hover:bg-do-gray-50/50 transition-colors`}
            >
              <td className="px-5 py-4 text-sm font-medium text-do-gray-800">
                {alert.product}
              </td>
              <td className="px-5 py-4">
                <ProgressBar current={alert.current} limit={alert.limit} />
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5">
                  {alert.milestones.map((m) => (
                    <MilestoneBadge
                      key={m}
                      value={m}
                      active={alert.activeMilestones.includes(m)}
                    />
                  ))}
                </div>
              </td>
              <td className="px-5 py-4">
                <SafetyBadge mode={alert.safetyNet} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
