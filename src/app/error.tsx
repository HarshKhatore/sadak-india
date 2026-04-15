'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="text-5xl">🚧</span>
      <h2 className="mt-4 text-2xl font-bold text-white">
        Road Block Encountered
      </h2>
      <p className="mt-2 text-slate-400">
        Something went wrong loading this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-cyan-400"
      >
        Try Again
      </button>
    </div>
  );
}
