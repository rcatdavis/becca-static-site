export default function ProgressBar({ current, limit }) {
  const pct = Math.min((current / limit) * 100, 100);

  let barColor = 'bg-do-green-500';
  if (pct >= 85) barColor = 'bg-do-red-500';
  else if (pct >= 60) barColor = 'bg-do-yellow-400';

  return (
    <div className="flex items-center gap-3">
      <div className="w-24 h-2 rounded-full bg-do-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-do-gray-600 text-sm whitespace-nowrap">
        ${current.toLocaleString()} / ${limit.toLocaleString()}
      </span>
    </div>
  );
}
