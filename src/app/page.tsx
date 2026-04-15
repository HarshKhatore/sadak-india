import Link from 'next/link';
import StatCard from '../components/StatCard';
import HighwayCard from '../components/HighwayCard';
import {
  highways,
  getStats,
  getHighwaysByType,
  getHighwaysByStatus,
  getAllStates,
  getHighwaysByState,
} from '../lib/highways';

export default function Home() {
  const stats = getStats();
  const nhs = getHighwaysByType('national-highway');
  const expressways = getHighwaysByType('expressway');
  const underConstruction = getHighwaysByStatus('under-construction');
  const states = getAllStates();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-10 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 sm:p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Sadak India
            </h1>
            <p className="text-sm text-slate-400">
              Tracking India&apos;s Roads with Transparency
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          India&apos;s highway infrastructure at your fingertips.
          Explore {stats.total} National Highways &amp; Expressways
          covering {stats.totalKm.toLocaleString('en-IN')} km across{' '}
          {stats.states} states. All data sourced from public records.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/search"
            className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-cyan-400"
          >
            Search Highways
          </Link>
          <Link
            href="#highways"
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
          >
            Browse All
          </Link>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Dashboard
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            label="Total Roads"
            value={stats.total}
            accent="cyan"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            }
          />
          <StatCard
            label="Total Length"
            value={`${Math.round(stats.totalKm / 1000)}K km`}
            accent="blue"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            }
          />
          <StatCard
            label="National Highways"
            value={stats.nhs}
            accent="cyan"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437" />
              </svg>
            }
          />
          <StatCard
            label="Expressways"
            value={stats.expressways}
            accent="green"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            }
          />
          <StatCard
            label="Operational"
            value={stats.operational}
            accent="green"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Under Construction"
            value={stats.underConstruction}
            accent="amber"
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L3 12.75m3.32-2.68L9 6.75" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Under Construction - Highlighted */}
      {underConstruction.length > 0 && (
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-lg font-semibold text-white">
              Under Construction
            </h2>
            <span className="font-mono text-sm text-amber-400">
              {underConstruction.length} projects
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {underConstruction.slice(0, 6).map((h) => (
              <HighwayCard key={h.id} highway={h} />
            ))}
          </div>
        </section>
      )}

      {/* National Highways */}
      <section id="highways" className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            National Highways
          </h2>
          <span className="font-mono text-sm text-slate-400">
            {nhs.length} highways
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nhs.map((h) => (
            <HighwayCard key={h.id} highway={h} />
          ))}
        </div>
      </section>

      {/* Expressways */}
      <section id="expressways" className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Expressways
          </h2>
          <span className="font-mono text-sm text-slate-400">
            {expressways.length} expressways
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expressways.map((h) => (
            <HighwayCard key={h.id} highway={h} />
          ))}
        </div>
      </section>

      {/* States */}
      <section id="states" className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Browse by State
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {states.map((state) => {
            const count = getHighwaysByState(state).length;
            return (
              <Link
                key={state}
                href={`/state/${state.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 transition-all hover:border-cyan-500/30 hover:bg-slate-800"
              >
                <span className="text-sm text-slate-300">
                  {state}
                </span>
                <span className="font-mono text-xs text-cyan-400">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Road Fact */}
      <section className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="font-semibold text-cyan-400">
              Road Fact
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              India has 151,874 km of National Highways as of
              March 2024, carrying approximately 40% of all road
              traffic despite being only 2.7% of the total road
              network. The average speed of highway construction
              has increased from 12 km/day in 2014 to over 28
              km/day in recent years.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
