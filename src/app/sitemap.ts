import type { MetadataRoute } from 'next';
import { projects, site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ['/', ...projects.map((p) => `/projects/${p.slug}`)].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
