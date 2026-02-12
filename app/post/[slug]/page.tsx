import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import { getAllPosts, getPostBySlug, getPostHtml, getRelatedPosts } from '@/lib/posts';
import { makeMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return makeMetadata(post.title, post.excerpt, `/post/${post.slug}`);
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const html = await getPostHtml(post);
  const related = getRelatedPosts(post);
  const canonicalUrl = `https://giga.ai/news/post/${post.slug}`;

  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{post.category}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        <span>•</span>
        <span>{post.readingTime}</span>
        {post.author ? (
          <>
            <span>•</span>
            <span>By {post.author}</span>
          </>
        ) : null}
      </div>

      <div className="mt-4 flex gap-3 text-sm">
        <Link
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          className="rounded-full border border-slate-300 px-3 py-1"
        >
          Share on X
        </Link>
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
          target="_blank"
          className="rounded-full border border-slate-300 px-3 py-1"
        >
          Share on LinkedIn
        </Link>
      </div>

      <div className="prose-content mt-10" dangerouslySetInnerHTML={{ __html: html }} />

      <section className="mt-16 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight">Related posts</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((relatedPost) => (
            <PostCard key={relatedPost.slug} post={relatedPost} />
          ))}
        </div>
      </section>
    </article>
  );
}
