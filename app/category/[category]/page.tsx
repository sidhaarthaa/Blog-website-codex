import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import { categories, siteConfig, type Category } from '@/lib/constants';
import { getPostsByCategory } from '@/lib/posts';

export async function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} News`,
    description: `Browse ${category} stories from ${siteConfig.name}.`,
    alternates: { canonical: `${siteConfig.url}/category/${encodeURIComponent(category)}` },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);

  if (!categories.includes(category as Category)) {
    notFound();
  }

  const posts = getPostsByCategory(category as Category);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">{category}</h1>
      <p className="text-slate-600">{posts.length} post(s) in this category.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
