import { ChevronRight } from 'lucide-react';
import Pacing from './Pacing';
import {
  commitmentDeal,
  fmtUSD,
  scenarios,
  volumeDeal,
  volumeSummary,
} from '../data';

const STATUS_ACCENT = {
  'on-track': 'green',
  'at-risk': 'orange',
  'settled-behind': 'gray',
  'settled-met': 'green',
};

function ScenarioToggle({ scenario, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-do-gray-400">
        Demo: preview scenario
      </span>
      <div className="inline-flex rounded-md border border-do-border bg-do-gray-50 p-0.5">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors cursor-pointer ${
              scenario === s.id
                ? 'bg-white text-do-gray-900 shadow-sm'
                : 'text-do-gray-500 hover:text-do-gray-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Row({ name, pacing, spendTier, expires, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full grid grid-cols-[1.6fr_1.2fr_1.4fr_0.9fr_auto] items-center gap-4 px-6 py-4 text-left border-t border-do-border hover:bg-do-gray-50/60 transition-colors cursor-pointer group"
    >
      <span className="text-sm font-semibold text-do-gray-900">{name}</span>
      <div>{pacing}</div>
      <span className="text-sm text-do-gray-700">{spendTier}</span>
      <span className="text-sm text-do-blue-600">{expires}</span>
      <ChevronRight className="w-4 h-4 text-do-gray-300 group-hover:text-do-gray-500 transition-colors" />
    </button>
  );
}

export default function DealsTable({
  scenario,
  onScenarioChange,
  commitmentView,
  onOpenDeal,
}) {
  const vs = volumeSummary;

  return (
    <section className="bg-do-surface rounded-lg border border-do-border shadow-card overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
        <div>
          <h2 className="text-base font-bold text-do-gray-900">
            Commitment &amp; volume deals
          </h2>
          <p className="text-sm text-do-gray-500 mt-0.5">
            Active agreements on your account · select a row for details
          </p>
        </div>
        <ScenarioToggle scenario={scenario} onChange={onScenarioChange} />
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1.6fr_1.2fr_1.4fr_0.9fr_auto] gap-4 px-6 py-2.5 bg-do-gray-50 border-t border-do-border">
        {['Deal name', 'Pacing', 'Spend / tier', 'Expires', ''].map((h, i) => (
          <span
            key={i}
            className="text-[11px] font-semibold uppercase tracking-wider text-do-gray-400"
          >
            {h}
          </span>
        ))}
      </div>

      <Row
        name={commitmentDeal.name}
        pacing={
          <Pacing
            value={commitmentView.spent}
            max={commitmentView.commitment}
            accent={STATUS_ACCENT[commitmentView.status] ?? 'orange'}
            target={commitmentView.termEnded ? null : commitmentView.targetToday}
          />
        }
        spendTier={`${fmtUSD(commitmentView.spent)} of ${fmtUSD(
          commitmentView.commitment
        )}`}
        expires={commitmentDeal.expires}
        onClick={() => onOpenDeal(commitmentDeal)}
      />

      <Row
        name={volumeDeal.name}
        pacing={
          <Pacing
            value={vs.netSpend}
            max={vs.progressCeiling}
            accent="violet"
          />
        }
        spendTier={`${vs.currentTier.name} · ${vs.currentTier.headlineRate}%`}
        expires={volumeDeal.expires}
        onClick={() => onOpenDeal(volumeDeal)}
      />
    </section>
  );
}
