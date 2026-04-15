import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-700/50 bg-[#0b1120]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <svg
                  className="h-4 w-4"
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
              <span className="text-base font-bold text-white">
                Sadak India
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              Tracking India&apos;s roads with transparency.
              Public data on National Highways &amp; Expressways.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300">
              Explore
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/search"
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Search Highways
                </Link>
              </li>
              <li>
                <Link
                  href="/#highways"
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  National Highways
                </Link>
              </li>
              <li>
                <Link
                  href="/#expressways"
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Expressways
                </Link>
              </li>
              <li>
                <Link
                  href="/#states"
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  State Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300">
              Data Sources
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-sm text-slate-400">
                  NHAI (nhai.gov.in)
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-400">
                  MoRTH (morth.nic.in)
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-400">
                  Wikipedia
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-400">
                  Open Government Data
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-sm text-slate-400 hover:text-cyan-400"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <span className="text-sm text-slate-500">
                  Not affiliated with any government body
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700/50 pt-6 text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Sadak India. Built
            for transparency. Data from public sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
