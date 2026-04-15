import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'About | Sadak India',
  description: 'Learn about Sadak India - a transparency platform tracking India\'s National Highways and Expressways with public data.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-8">
          <div>
            <h1 className="mb-4 text-4xl font-bold text-slate-100">
              About Sadak India
            </h1>
            <p className="text-lg text-slate-300">
              Sadak India is a transparency platform dedicated to tracking India's
              National Highways and Expressways. We aggregate public data from
              government sources to provide citizens with easy access to road
              infrastructure information.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-100">
              Our Mission
            </h2>
            <p className="text-slate-300">
              To make India's road infrastructure data accessible,
              understandable, and actionable for every citizen. We believe that
              transparency leads to accountability, and informed citizens can
              drive better infrastructure outcomes.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-100">
              What We Track
            </h2>
            <ul className="ml-4 list-disc space-y-2 text-slate-300">
              <li>National Highways (NH) - route details, length, status</li>
              <li>Expressways - operational, under construction, planned</li>
              <li>Construction progress from NHAI projects</li>
              <li>State-wise road infrastructure dashboards</li>
              <li>Cost per kilometer and project timelines</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-100">
              Data Sources
            </h2>
            <p className="text-slate-300">
              Our data is sourced from publicly available government databases
              and official releases:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-slate-300">
              <li>National Highways Authority of India (NHAI)</li>
              <li>Ministry of Road Transport & Highways (MoRTH)</li>
              <li>Wikipedia (verified against official sources)</li>
              <li>Central Public Procurement Portal (CPPP)</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-100">
              Why This Matters
            </h2>
            <p className="text-slate-300">
              India's road network is critical to economic growth and connectivity.
              By tracking projects, costs, and timelines, citizens can:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-slate-300">
              <li>Hold authorities accountable for delays</li>
              <li>Understand where public funds are being invested</li>
              <li>Plan travel and logistics more effectively</li>
              <li>Advocate for infrastructure needs in their regions</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-100">
              Contact Us
            </h2>
            <p className="text-slate-300">
              Have questions, suggestions, or data corrections? Reach out to us at{' '}
              <a
                href="mailto:dailywishcards@gmail.com"
                className="text-blue-400 hover:text-blue-300"
              >
                dailywishcards@gmail.com
              </a>
            </p>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-slate-100">
              Disclaimer
            </h3>
            <p className="text-sm text-slate-400">
              Sadak India is an independent platform aggregating public data. We
              are not affiliated with NHAI, MoRTH, or any government body. Data
              is provided for informational purposes only and may not reflect
              the most current official status. Always verify with official
              sources for critical decisions.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
