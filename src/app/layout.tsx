import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

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
      <body className="flex min-h-full flex-col bg-[#0f172a] font-sans text-slate-200 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
