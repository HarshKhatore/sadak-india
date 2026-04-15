import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Highways & Expressways',
  description:
    'Search India\'s National Highways and Expressways by name, number, city, or state. Filter by status and type.',
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
