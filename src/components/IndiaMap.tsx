'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { highways, getAllStates, getHighwaysByState } from '../lib/highways';

// Simplified state center coordinates (x, y on a 500x600 viewBox)
// These are approximate positions for visual representation
const statePositions: Record<string, { x: number; y: number; abbr: string }> = {
  'Jammu and Kashmir': { x: 185, y: 55, abbr: 'JK' },
  'Ladakh': { x: 230, y: 40, abbr: 'LA' },
  'Himachal Pradesh': { x: 210, y: 95, abbr: 'HP' },
  'Punjab': { x: 180, y: 115, abbr: 'PB' },
  'Chandigarh': { x: 195, y: 108, abbr: 'CH' },
  'Uttarakhand': { x: 240, y: 110, abbr: 'UK' },
  'Haryana': { x: 195, y: 140, abbr: 'HR' },
  'Delhi': { x: 210, y: 145, abbr: 'DL' },
  'Uttar Pradesh': { x: 265, y: 170, abbr: 'UP' },
  'Rajasthan': { x: 155, y: 185, abbr: 'RJ' },
  'Gujarat': { x: 110, y: 245, abbr: 'GJ' },
  'Madhya Pradesh': { x: 220, y: 240, abbr: 'MP' },
  'Bihar': { x: 330, y: 185, abbr: 'BR' },
  'Jharkhand': { x: 325, y: 215, abbr: 'JH' },
  'West Bengal': { x: 355, y: 230, abbr: 'WB' },
  'Chhattisgarh': { x: 270, y: 275, abbr: 'CG' },
  'Odisha': { x: 315, y: 285, abbr: 'OD' },
  'Maharashtra': { x: 175, y: 310, abbr: 'MH' },
  'Telangana': { x: 230, y: 340, abbr: 'TS' },
  'Andhra Pradesh': { x: 260, y: 370, abbr: 'AP' },
  'Karnataka': { x: 185, y: 390, abbr: 'KA' },
  'Goa': { x: 150, y: 370, abbr: 'GA' },
  'Kerala': { x: 185, y: 450, abbr: 'KL' },
  'Tamil Nadu': { x: 230, y: 440, abbr: 'TN' },
  'Assam': { x: 420, y: 165, abbr: 'AS' },
  'Meghalaya': { x: 400, y: 180, abbr: 'ML' },
  'Nagaland': { x: 445, y: 160, abbr: 'NL' },
  'Manipur': { x: 445, y: 180, abbr: 'MN' },
  'Mizoram': { x: 435, y: 205, abbr: 'MZ' },
  'Tripura': { x: 410, y: 210, abbr: 'TR' },
  'Sikkim': { x: 365, y: 155, abbr: 'SK' },
  'Arunachal Pradesh': { x: 435, y: 135, abbr: 'AR' },
};

// Simplified highway routes as SVG path points
// These connect the approximate state positions to show highway routes
const highwayRoutes: {
  id: string;
  points: string;
  status: string;
  type: string;
}[] = [
  // NH 44 - Srinagar to Kanyakumari (the big one)
  { id: 'nh-44', points: '185,55 195,115 210,145 265,170 220,240 230,340 260,370 230,440 210,480', status: 'operational', type: 'nh' },
  // NH 27 - East-West Corridor
  { id: 'nh-27', points: '110,245 155,185 220,240 265,170 330,185 355,230 420,165', status: 'operational', type: 'nh' },
  // NH 48 - Delhi to Chennai
  { id: 'nh-48', points: '210,145 195,185 155,245 175,310 230,340 230,440', status: 'operational', type: 'nh' },
  // NH 66 - Mumbai to Kanyakumari (Coastal)
  { id: 'nh-66', points: '145,295 150,370 185,390 185,450 210,480', status: 'operational', type: 'nh' },
  // NH 19 - Delhi to Kolkata (GT Road)
  { id: 'nh-19', points: '210,145 265,170 330,185 355,230', status: 'operational', type: 'nh' },
  // Delhi-Mumbai Expressway
  { id: 'delhi-mumbai-expressway', points: '210,145 195,185 155,245 145,295', status: 'under-construction', type: 'expressway' },
  // Mumbai-Nagpur (Samruddhi Mahamarg)
  { id: 'mumbai-nagpur-expressway', points: '145,295 175,310 220,290', status: 'under-construction', type: 'expressway' },
  // Purvanchal Expressway
  { id: 'purvanchal-expressway', points: '265,170 300,175 330,185', status: 'operational', type: 'expressway' },
  // Yamuna Expressway
  { id: 'yamuna-expressway', points: '210,145 230,165', status: 'operational', type: 'expressway' },
  // Ganga Expressway
  { id: 'ganga-expressway', points: '245,160 265,170 300,175', status: 'under-construction', type: 'expressway' },
];

export default function IndiaMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredHighway, setHoveredHighway] = useState<string | null>(null);
  const router = useRouter();
  const states = getAllStates();

  const stateHeatmap = useMemo(() => {
    const map: Record<string, number> = {};
    states.forEach((s) => {
      map[s] = getHighwaysByState(s).length;
    });
    return map;
  }, [states]);

  const getHeatColor = (count: number): string => {
    if (count >= 8) return '#22d3ee'; // cyan-400
    if (count >= 5) return '#60a5fa'; // blue-400
    if (count >= 3) return '#818cf8'; // indigo-400
    if (count >= 1) return '#475569'; // slate-600
    return '#1e293b'; // slate-800
  };

  const handleStateClick = (state: string) => {
    router.push(`/state/${state.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleHighwayClick = (id: string) => {
    router.push(`/highway/${id}`);
  };

  const hoveredHighwayData = hoveredHighway
    ? highways.find((h) => h.id === hoveredHighway)
    : null;

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            India Highway Map
          </h2>
          <p className="text-xs text-slate-400">
            Click a state or highway to explore
          </p>
        </div>
        {/* Legend */}
        <div className="hidden gap-3 sm:flex">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4 rounded bg-green-400" />
            <span className="text-[10px] text-slate-400">NH (Operational)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4 rounded bg-amber-400" style={{ strokeDasharray: '4 2' }} />
            <span className="text-[10px] text-slate-400">Under Construction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4 rounded bg-cyan-400" />
            <span className="text-[10px] text-slate-400">Expressway</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {(hoveredState || hoveredHighwayData) && (
        <div className="mb-3 rounded-lg bg-slate-700/80 px-3 py-2 text-xs">
          {hoveredState && (
            <span className="text-white">
              <span className="font-semibold">{hoveredState}</span>
              <span className="text-slate-400">
                {' '}- {stateHeatmap[hoveredState] || 0} highways
              </span>
            </span>
          )}
          {hoveredHighwayData && (
            <span className="text-white">
              <span className="font-mono font-semibold text-cyan-400">
                {hoveredHighwayData.number}
              </span>
              {' '}{hoveredHighwayData.name}
              <span className="text-slate-400">
                {' '}- {hoveredHighwayData.lengthKm.toLocaleString('en-IN')} km
              </span>
            </span>
          )}
        </div>
      )}

      <svg
        viewBox="70 20 420 490"
        className="mx-auto h-auto w-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* State dots */}
        {Object.entries(statePositions).map(([state, pos]) => {
          const count = stateHeatmap[state] || 0;
          const isHovered = hoveredState === state;

          return (
            <g
              key={state}
              onClick={() => handleStateClick(state)}
              onMouseEnter={() => setHoveredState(state)}
              onMouseLeave={() => setHoveredState(null)}
              className="cursor-pointer"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 16 : Math.max(8, count * 2 + 6)}
                fill={getHeatColor(count)}
                opacity={isHovered ? 0.9 : 0.6}
                className="transition-all duration-200"
              />
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none fill-white text-[7px] font-bold"
              >
                {pos.abbr}
              </text>
            </g>
          );
        })}

        {/* Highway routes */}
        {highwayRoutes.map((route) => {
          const isHovered = hoveredHighway === route.id;
          const color =
            route.status === 'under-construction'
              ? '#fbbf24'
              : route.type === 'expressway'
              ? '#22d3ee'
              : '#4ade80';

          return (
            <polyline
              key={route.id}
              points={route.points}
              fill="none"
              stroke={color}
              strokeWidth={isHovered ? 3.5 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={
                route.status === 'under-construction'
                  ? '8,4'
                  : 'none'
              }
              opacity={
                hoveredHighway
                  ? isHovered
                    ? 1
                    : 0.2
                  : 0.7
              }
              className="cursor-pointer transition-all duration-200"
              onClick={() => handleHighwayClick(route.id)}
              onMouseEnter={() => {
                setHoveredHighway(route.id);
                setHoveredState(null);
              }}
              onMouseLeave={() => setHoveredHighway(null)}
            />
          );
        })}
      </svg>

      {/* Mobile legend */}
      <div className="mt-3 flex justify-center gap-4 sm:hidden">
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-3 rounded bg-green-400" />
          <span className="text-[9px] text-slate-400">NH</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-3 rounded bg-amber-400" />
          <span className="text-[9px] text-slate-400">Construction</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-3 rounded bg-cyan-400" />
          <span className="text-[9px] text-slate-400">Expressway</span>
        </div>
      </div>
    </div>
  );
}
