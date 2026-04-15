import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { highways, getHighwayById, getHighwaysByState } from '../../../lib/highways';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return highways.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const highway = getHighwayById(id);
  if (!highway) return { title: 'Not Found' };

  return {
    title: `${highway.number} - ${highway.name} | Route, Status & Details`,
    description: `${highway.name} (${highway.number}) - ${highway.origin} to ${highway.terminus}. ${highway.lengthKm} km across ${highway.states.join(', ')}. Status: ${highway.status}. ${highway.description}`,
  };
}

const statusConfig = {
  operational: { color: 'text-green-400', bg: 'bg-green-500/10', label: 'Operational', dot: 'bg-green-400' },
  'under-construction': { color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Under Construction', dot: 'bg-amber-400' },
  'partially-operational': { color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Partially Operational', dot: 'bg-blue-400' },
  planned: { color: 'text-slate-400', bg: 'bg-slate-500/10', label: 'Planned', dot: 'bg-slate-400' },
};

export default async function HighwayPage({ params }: Props) {
  const { id } = await params;
  const highway = getHighwayById(id);
  if (!highway) notFound();

  const status = statusConfig[highway.status];

  // Find related highways (same states)
  const related = highway.states
    .flatMap((s) => getHighwaysByState(s))
    .filter((h) => h.id !== highway.id)
    .filter((h, i, arr) => arr.findIndex((x) => x.id === h.id) === i)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-cyan-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{highway.number}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 sm:p-8">
        <div className="flex flex-wrap items-start gap-3">
          <span className="rounded-lg bg-cyan-500/10 px-3 py-1.5 font-mono text-sm font-bold text-cyan-400">
            {highway.number}
          </span>
          <span className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${status.bg} ${status.color}`}>
            <span className={`h-2 w-2 rounded-full ${status.dot} animate-pulse`} />
            {status.label}
          </span>
          <span className="rounded-lg bg-slate-700/50 px-3 py-1.5 text-sm text-slate-400">
            {highway.type === 'expressway' ? 'Expressway' : 'National Highway'}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          {highway.name}
        </h1>
        <p className="mt-2 text-lg text-slate-400">
          {highway.origin} → {highway.terminus}
        </p>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          {highway.description}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className="font-mono text-2xl font-bold text-white">
            {highway.lengthKm.toLocaleString('en-IN')}
          </p>
          <p className="mt-1 text-xs text-slate-500">Total Length (km)</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className="font-mono text-2xl font-bold text-white">
            {highway.lanes}
          </p>
          <p className="mt-1 text-xs text-slate-500">Lane Configuration</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className="font-mono text-2xl font-bold text-white">
            {highway.states.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">States Covered</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className={`font-mono text-2xl font-bold ${highway.completionPercent === 100 ? 'text-green-400' : 'text-amber-400'}`}>
            {highway.completionPercent}%
          </p>
          <p className="mt-1 text-xs text-slate-500">Completion</p>
        </div>
      </div>

      {/* Progress Bar (if not complete) */}
      {highway.completionPercent < 100 && (
        <div className="mb-8 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">Construction Progress</h2>
            <span className="font-mono text-sm text-amber-400">{highway.completionPercent}%</span>
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all"
              style={{ width: `${highway.completionPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Route - States */}
      <div className="mb-8 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5">
        <h2 className="text-sm font-semibold text-slate-300">Route Through States</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {highway.states.map((state, i) => (
            <div key={state} className="flex items-center gap-2">
              <Link
                href={`/state/${state.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-lg bg-slate-700/50 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                {state}
              </Link>
              {i < highway.states.length - 1 && (
                <span className="text-slate-600">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Facts */}
      <div className="mb-8 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5">
        <h2 className="text-sm font-semibold text-slate-300">Did You Know?</h2>
        <ul className="mt-3 space-y-2">
          {highway.facts.map((fact, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-400">
              <span className="mt-0.5 text-cyan-400">●</span>
              {fact}
            </li>
          ))}
        </ul>
      </div>

      {/* Related Highways */}
      {related.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Related Highways
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((h) => {
              const s = statusConfig[h.status];
              return (
                <Link
                  key={h.id}
                  href={`/highway/${h.id}`}
                  className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-all hover:border-cyan-500/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">{h.number}</span>
                    <span className={`text-xs ${s.color}`}>{s.label}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-white">{h.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{h.lengthKm.toLocaleString('en-IN')} km</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
