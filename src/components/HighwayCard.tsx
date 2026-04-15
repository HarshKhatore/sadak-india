import Link from 'next/link';
import { Highway } from '../lib/highways';

type HighwayCardProps = {
  highway: Highway;
};

const statusColors = {
  operational: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Operational' },
  'under-construction': { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Under Construction' },
  'partially-operational': { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Partial' },
  planned: { bg: 'bg-slate-500/10', text: 'text-slate-400', label: 'Planned' },
};

export default function HighwayCard({ highway }: HighwayCardProps) {
  const status = statusColors[highway.status];

  return (
    <Link
      href={`/highway/${highway.id}`}
      className="group block rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 transition-all hover:border-cyan-500/30 hover:bg-slate-800"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-cyan-500/10 px-2 py-0.5 font-mono text-xs font-bold text-cyan-400">
              {highway.number}
            </span>
            <span
              className={`rounded px-2 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}
            >
              {status.label}
            </span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-white group-hover:text-cyan-400">
            {highway.name}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            {highway.origin} → {highway.terminus}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="font-mono text-sm font-bold text-white">
            {highway.lengthKm.toLocaleString('en-IN')} km
          </p>
          <p className="text-[10px] text-slate-500">Length</p>
        </div>
        <div>
          <p className="font-mono text-sm font-bold text-white">
            {highway.lanes}
          </p>
          <p className="text-[10px] text-slate-500">Lanes</p>
        </div>
        <div>
          <p className="font-mono text-sm font-bold text-white">
            {highway.states.length}
          </p>
          <p className="text-[10px] text-slate-500">States</p>
        </div>
      </div>

      {/* Progress bar */}
      {highway.completionPercent < 100 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Progress</span>
            <span className="font-mono text-amber-400">
              {highway.completionPercent}%
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-slate-700">
            <div
              className="h-1.5 rounded-full bg-amber-400 transition-all"
              style={{
                width: `${highway.completionPercent}%`,
              }}
            />
          </div>
        </div>
      )}
    </Link>
  );
}
