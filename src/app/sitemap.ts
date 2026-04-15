import type { MetadataRoute } from 'next';
import { highways, getAllStates } from '../lib/highways';

const BASE_URL = 'https://sadakindia.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  const highwayPages: MetadataRoute.Sitemap = highways.map((h) => ({
    url: `${BASE_URL}/highway/${h.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const statePages: MetadataRoute.Sitemap = getAllStates().map((s) => ({
    url: `${BASE_URL}/state/${s.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...highwayPages, ...statePages];
}
