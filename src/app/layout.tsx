import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ADSENSE_ID, APP_NAME } from '../lib/constants';
import './globals.css';

const GA_ID = 'G-MCLTJR78B2';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sadakindia.vercel.app'),
  title: {
    default:
      'Sadak India - Track India\'s National Highways & Expressways',
    template: '%s | Sadak India',
  },
  description:
    'Track India\'s National Highways and Expressways with transparency. Road details, construction status, costs, routes, and state-wise dashboards. All public data in one place.',
  keywords: [
    'india highway tracker',
    'national highway india',
    'NHAI road status',
    'expressway india',
    'road construction india',
    'NH 44 route',
    'highway map india',
    'sadak india',
  ],
  authors: [{ name: 'Sadak India' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Sadak India',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Sadak India - Tracking India\'s Roads with Transparency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/globe.svg" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: APP_NAME,
              url: 'https://sadakindia.vercel.app',
              description:
                'Track India\'s National Highways and Expressways with transparency.',
              potentialAction: {
                '@type': 'SearchAction',
                target:
                  'https://sadakindia.vercel.app/search?q={search_term_string}',
                'query-input':
                  'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#0f172a] font-sans text-slate-200 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
