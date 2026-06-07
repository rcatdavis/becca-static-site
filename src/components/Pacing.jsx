// A rounded progress bar used for deal pacing. Supports an accent color and an
// optional "target" marker (e.g. where the customer should be today).
const ACCENTS = {
  blue: 'bg-do-blue-500',
  green: 'bg-do-green-500',
  orange: 'bg-do-orange-400',
  violet: 'bg-do-violet-500',
  gray: 'bg-do-gray-300',
};

export default function Pacing({
  value,
  max,
  accent = 'blue',
  target = null,
  height = 'h-2',
  className = '',
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const targetPct =
    target != null && max > 0 ? Math.min((target / max) * 100, 100) : null;

  return (
    <div
      className={`relative w-full ${height} rounded-full bg-do-gray-100 overflow-hidden ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${ACCENTS[accent] ?? ACCENTS.blue}`}
        style={{ width: `${pct}%` }}
      />
      {targetPct != null && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-do-orange-600/80"
          style={{ left: `calc(${targetPct}% - 1px)` }}
          title="Target today"
        />
      )}
    </div>
  );
}
