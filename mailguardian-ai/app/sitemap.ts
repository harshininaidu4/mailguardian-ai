import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { infoPageSlugs } from '@/lib/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/docs`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...infoPageSlugs.map((slug) => ({
      url: `${siteConfig.url}/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    })),
  ];
}
