import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllStates, getHighwaysByState } from '../../../lib/highways';
import HighwayCard from '../../../components/HighwayCard';
import AdBanner from '../../../components/AdBanner';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllStates().map((s) => ({
    slug: s.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stateName = getAllStates().find(
    (s) => s.toLowerCase().replace(/\s+/g, '-') === slug
  );
  if (!stateName) return { title: 'Not Found' };

  const stateHighways = getHighwaysByState(stateName);
  const totalKm = stateHighways.reduce((sum, h) => sum + h.lengthKm, 0);

  return {
    title: `${stateName} - National Highways & Expressways Dashboard`,
    description: `${stateName} has ${stateHighways.length} national highways and expressways covering ${totalKm.toLocaleString('en-IN')} km. Track road status, construction progress, and more.`,
  };
}

export default async function StatePage({ params }: Props) {
  const { slug } = await params;
  const stateName = getAllStates().find(
    (s) => s.toLowerCase().replace(/\s+/g, '-') === slug
  );
  if (!stateName) notFound();

  const stateHighways = getHighwaysByState(stateName);
  const totalKm = stateHighways.reduce((sum, h) => sum + h.lengthKm, 0);
  const operational = stateHighways.filter((h) => h.status === 'operational').length;
  const underConstruction = stateHighways.filter((h) => h.status === 'under-construction').length;
  const nhs = stateHighways.filter((h) => h.type === 'national-highway').length;
  const expressways = stateHighways.filter((h) => h.type === 'expressway').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdBanner variant="banner" className="mb-6" />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-cyan-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#states" className="hover:text-cyan-400">States</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{stateName}</span>
      </nav>

      <h1 className="text-3xl font-bold text-white">{stateName}</h1>
      <p className="mt-2 text-slate-400">
        Highway &amp; Expressway Dashboard
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className="font-mono text-xl font-bold text-white">{stateHighways.length}</p>
          <p className="text-xs text-slate-500">Total Roads</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className="font-mono text-xl font-bold text-white">{totalKm.toLocaleString('en-IN')}</p>
          <p className="text-xs text-slate-500">Total km</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className="font-mono text-xl font-bold text-green-400">{operational}</p>
          <p className="text-xs text-slate-500">Operational</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className="font-mono text-xl font-bold text-amber-400">{underConstruction}</p>
          <p className="text-xs text-slate-500">Under Construction</p>
        </div>
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
          <p className="font-mono text-xl font-bold text-cyan-400">{nhs} NH / {expressways} EW</p>
          <p className="text-xs text-slate-500">Highway / Expressway</p>
        </div>
      </div>

      {/* All highways in this state */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">
          All Highways &amp; Expressways
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stateHighways.map((h) => (
            <HighwayCard key={h.id} highway={h} />
          ))}
        </div>
      </div>
    </div>
  );
}
