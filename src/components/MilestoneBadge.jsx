export default function MilestoneBadge({ value, active }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-semibold
        ${active
          ? 'bg-do-blue-500 text-white'
          : 'bg-do-gray-100 text-do-gray-500'
        }`}
    >
      {value}%
    </span>
  );
}
