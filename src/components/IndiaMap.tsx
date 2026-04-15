'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { highways, getAllStates, getHighwaysByState } from '../lib/highways';

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

const highwayRoutes: {
  id: string;
  points: string;
  status: string;
  type: string;
}[] = [
  { id: 'nh-44', points: '185,55 195,115 210,145 265,170 220,240 230,340 260,370 230,440 210,480', status: 'operational', type: 'nh' },
  { id: 'nh-27', points: '110,245 155,185 220,240 265,170 330,185 355,230 420,165', status: 'operational', type: 'nh' },
  { id: 'nh-48', points: '210,145 195,185 155,245 175,310 230,340 230,440', status: 'operational', type: 'nh' },
  { id: 'nh-66', points: '145,295 150,370 185,390 185,450 210,480', status: 'operational', type: 'nh' },
  { id: 'nh-19', points: '210,145 265,170 330,185 355,230', status: 'operational', type: 'nh' },
  { id: 'delhi-mumbai-expressway', points: '210,145 195,185 155,245 145,295', status: 'under-construction', type: 'expressway' },
  { id: 'mumbai-nagpur-expressway', points: '145,295 175,310 220,290', status: 'under-construction', type: 'expressway' },
  { id: 'purvanchal-expressway', points: '265,170 300,175 330,185', status: 'operational', type: 'expressway' },
  { id: 'yamuna-expressway', points: '210,145 230,165', status: 'operational', type: 'expressway' },
  { id: 'ganga-expressway', points: '245,160 265,170 300,175', status: 'under-construction', type: 'expressway' },
];

type TooltipData = {
  text: string;
  sub: string;
} | null;

export default function IndiaMap() {
  const [tooltip, setTooltip] = useState<TooltipData>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeHighway, setActiveHighway] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
    if (count >= 8) return '#22d3ee';
    if (count >= 5) return '#60a5fa';
    if (count >= 3) return '#818cf8';
    if (count >= 1) return '#475569';
    return '#1e293b';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 40,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4 sm:p-6"
      onMouseMove={handleMouseMove}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            India Highway Map
          </h2>
          <p className="text-xs text-slate-400">
            Click a state or highway to explore
          </p>
        </div>
        <div className="hidden gap-3 sm:flex">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4 rounded bg-green-400" />
            <span className="text-[10px] text-slate-400">NH</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4 rounded bg-amber-400" />
            <span className="text-[10px] text-slate-400">Construction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4 rounded bg-cyan-400" />
            <span className="text-[10px] text-slate-400">Expressway</span>
          </div>
        </div>
      </div>

      {/* Floating tooltip - positioned absolute, no layout shift */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-20 rounded-lg bg-slate-900 px-3 py-1.5 text-xs shadow-lg"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="font-semibold text-white">{tooltip.text}</span>
          <span className="ml-1.5 text-slate-400">{tooltip.sub}</span>
        </div>
      )}

      <svg
        viewBox="70 20 420 490"
        className="mx-auto h-auto w-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Highway routes - drawn BELOW states so they don't block clicks */}
        {highwayRoutes.map((route) => {
          const isActive = activeHighway === route.id;
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
              strokeWidth={isActive ? 3 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={
                route.status === 'under-construction' ? '8,4' : 'none'
              }
              opacity={activeHighway ? (isActive ? 1 : 0.15) : 0.6}
              className="cursor-pointer"
              onClick={() => router.push(`/highway/${route.id}`)}
              onMouseEnter={() => {
                setActiveHighway(route.id);
                const hw = highways.find((h) => h.id === route.id);
                if (hw) {
                  setTooltip({
                    text: `${hw.number} ${hw.name}`,
                    sub: `${hw.lengthKm.toLocaleString('en-IN')} km`,
                  });
                }
              }}
              onMouseLeave={() => {
                setActiveHighway(null);
                setTooltip(null);
              }}
            />
          );
        })}

        {/* Invisible wider hit area for highway routes (easier to click) */}
        {highwayRoutes.map((route) => (
          <polyline
            key={`hit-${route.id}`}
            points={route.points}
            fill="none"
            stroke="transparent"
            strokeWidth={12}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer"
            onClick={() => router.push(`/highway/${route.id}`)}
            onMouseEnter={() => {
              setActiveHighway(route.id);
              const hw = highways.find((h) => h.id === route.id);
              if (hw) {
                setTooltip({
                  text: `${hw.number} ${hw.name}`,
                  sub: `${hw.lengthKm.toLocaleString('en-IN')} km`,
                });
              }
            }}
            onMouseLeave={() => {
              setActiveHighway(null);
              setTooltip(null);
            }}
          />
        ))}

        {/* State dots - fixed size, no resize on hover */}
        {Object.entries(statePositions).map(([state, pos]) => {
          const count = stateHeatmap[state] || 0;
          const radius = Math.max(8, count * 2 + 6);

          return (
            <g
              key={state}
              className="cursor-pointer"
              onClick={() =>
                router.push(
                  `/state/${state.toLowerCase().replace(/\s+/g, '-')}`
                )
              }
              onMouseEnter={() => {
                setTooltip({
                  text: state,
                  sub: `${count} highway${count !== 1 ? 's' : ''}`,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Invisible larger hit area */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={radius + 4}
                fill="transparent"
              />
              {/* Visible circle - fixed size */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill={getHeatColor(count)}
                opacity={0.6}
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
