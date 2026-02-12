import type { Metadata } from 'next';
import { siteConfig } from './constants';

export function makeMetadata(title: string, description: string, path = ''): Metadata {
  const canonical = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
