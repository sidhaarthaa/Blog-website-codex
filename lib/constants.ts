export const siteConfig = {
  name: 'Giga Newsroom',
  description: 'Insights, product updates, and practical guidance from our team.',
  url: 'https://giga.ai/news',
};

export const categories = [
  'Tech',
  'AI Information',
  'How To’s',
  'Product Updates',
  'Industry Insights',
] as const;

export type Category = (typeof categories)[number];
