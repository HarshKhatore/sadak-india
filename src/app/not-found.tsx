import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-5xl">🛣️</span>
      <h2 className="mt-4 text-2xl font-bold text-white">
        Road Not Found
      </h2>
      <p className="mt-2 text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been rerouted.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-cyan-400"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
