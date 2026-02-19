export default function SafetyBadge({ mode }) {
  const isAutoPause = mode === 'auto-pause';

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        ${isAutoPause
          ? 'bg-do-red-50 text-do-red-600 border border-do-red-500/30'
          : 'bg-do-gray-50 text-do-gray-600 border border-do-gray-300'
        }`}
    >
      {isAutoPause ? 'Auto-Pause Enabled' : 'Alert Only'}
    </span>
  );
}
