import type { MetadataRoute } from 'next';
import { categories } from '@/lib/constants';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://giga.ai/news';
  const posts = getAllPosts();

  return [
    { url: `${base}`, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/search`, changeFrequency: 'weekly', priority: 0.8 },
    ...categories.map((category) => ({
      url: `${base}/category/${encodeURIComponent(category)}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${base}/post/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
