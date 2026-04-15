import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Sadak India road tracker.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: April 15, 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
          <p className="mt-2">
            Welcome to Sadak India, accessible at <strong className="text-cyan-400">sadakindia.vercel.app</strong>.
            We are committed to protecting your privacy. This Privacy Policy explains what data we collect
            and how we use it. Sadak India is a public transparency tool that aggregates publicly available
            data about India&apos;s National Highways and Expressways.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">2. Information We Collect</h2>
          <p className="mt-2">We do not collect any personal information. The data displayed on this site is sourced from public government records. We automatically collect:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-slate-400">
            <li>Usage data (pages visited, time on site)</li>
            <li>Device information (browser type, screen size)</li>
            <li>IP address (collected by hosting and ad providers)</li>
            <li>Cookies for analytics and advertising</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">3. Third-Party Services</h2>
          <p className="mt-2">We use the following third-party services:</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-slate-400">
            <li><strong>Google AdSense</strong> - for displaying advertisements</li>
            <li><strong>Google Analytics</strong> - for understanding site usage</li>
            <li><strong>Vercel</strong> - for hosting the website</li>
          </ul>
          <p className="mt-2">
            These services may collect data as described in their respective privacy policies. You can opt out of
            personalized ads at{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">4. Data Sources</h2>
          <p className="mt-2">
            All road and highway data displayed on Sadak India is sourced from publicly available records including
            NHAI (nhai.gov.in), Ministry of Road Transport and Highways (morth.nic.in), Wikipedia, and other
            open government data platforms. We do not claim ownership of this data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">5. Contact Us</h2>
          <p className="mt-2">
            For questions about this Privacy Policy, contact us at{' '}
            <a href="mailto:dailywishcards@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">
              dailywishcards@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
