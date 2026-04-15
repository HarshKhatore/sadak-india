import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Sadak India road tracker.',
};

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Terms of Use</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: April 15, 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing Sadak India at <strong className="text-cyan-400">sadakindia.vercel.app</strong>,
            you agree to these Terms of Use. If you do not agree, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">2. Purpose of the Service</h2>
          <p className="mt-2">
            Sadak India is a public transparency tool that aggregates publicly available information about
            India&apos;s National Highways and Expressways. The data is sourced from government websites,
            open data platforms, and Wikipedia. We aim to make this information more accessible and
            user-friendly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">3. Data Accuracy</h2>
          <p className="mt-2">
            While we strive for accuracy, the data on Sadak India is compiled from public sources and may
            contain errors or be outdated. We do not guarantee the accuracy, completeness, or timeliness
            of any information. For official data, please refer to NHAI (nhai.gov.in) or the Ministry of
            Road Transport and Highways (morth.nic.in).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">4. Not a Government Website</h2>
          <p className="mt-2">
            Sadak India is <strong>not affiliated with any government body</strong>, including NHAI, MoRTH,
            or any state public works department. This is an independent citizen initiative for transparency.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">5. Disclaimer of Warranties</h2>
          <p className="mt-2">
            Sadak India is provided on an &quot;as is&quot; basis. We make no warranties about the
            accuracy of the data, availability of the service, or fitness for any purpose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">6. Advertisements</h2>
          <p className="mt-2">
            Sadak India displays advertisements through Google AdSense. We are not responsible for
            the content of third-party advertisements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">7. Governing Law</h2>
          <p className="mt-2">
            These Terms shall be governed by the laws of India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">8. Contact</h2>
          <p className="mt-2">
            Contact us at{' '}
            <a href="mailto:dailywishcards@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">
              dailywishcards@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
