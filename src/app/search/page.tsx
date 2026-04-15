'use client';

import { useState, useMemo } from 'react';
import { highways } from '../../lib/highways';
import HighwayCard from '../../components/HighwayCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return highways.filter((h) => {
      const matchesQuery =
        !query ||
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        h.number.toLowerCase().includes(query.toLowerCase()) ||
        h.origin.toLowerCase().includes(query.toLowerCase()) ||
        h.terminus.toLowerCase().includes(query.toLowerCase()) ||
        h.states.some((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        );
      const matchesStatus =
        statusFilter === 'all' || h.status === statusFilter;
      const matchesType =
        typeFilter === 'all' || h.type === typeFilter;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [query, statusFilter, typeFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">
        Search Highways &amp; Expressways
      </h1>
      <p className="mt-2 text-slate-400">
        Search by name, number, city, or state
      </p>

      {/* Search & Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NH 44, Mumbai, Delhi-Mumbai Expressway..."
            className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-slate-300 focus:border-cyan-500/50 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="operational">Operational</option>
          <option value="under-construction">Under Construction</option>
          <option value="partially-operational">Partially Operational</option>
          <option value="planned">Planned</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-slate-300 focus:border-cyan-500/50 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="national-highway">National Highways</option>
          <option value="expressway">Expressways</option>
        </select>
      </div>

      {/* Results count */}
      <p className="mt-4 text-sm text-slate-500">
        Showing{' '}
        <span className="font-mono text-cyan-400">{filtered.length}</span>{' '}
        of {highways.length} roads
      </p>

      {/* Results */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((h) => (
          <HighwayCard key={h.id} highway={h} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-lg text-slate-500">
            No highways found matching your search.
          </p>
          <button
            onClick={() => {
              setQuery('');
              setStatusFilter('all');
              setTypeFilter('all');
            }}
            className="mt-4 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400 hover:bg-cyan-500/20"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
