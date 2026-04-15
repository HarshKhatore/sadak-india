type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: 'cyan' | 'green' | 'amber' | 'red' | 'blue';
};

const accentMap = {
  cyan: 'text-cyan-400 bg-cyan-500/10',
  green: 'text-green-400 bg-green-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
  red: 'text-red-400 bg-red-500/10',
  blue: 'text-blue-400 bg-blue-500/10',
};

export default function StatCard({
  label,
  value,
  icon,
  accent = 'cyan',
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentMap[accent]}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold font-mono text-white">
            {typeof value === 'number'
              ? value.toLocaleString('en-IN')
              : value}
          </p>
          <p className="text-xs text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
