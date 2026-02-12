import Link from 'next/link';
import type { Post } from '@/lib/posts';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-xl border border-slate-200 p-5 transition hover:border-slate-300">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{post.category}</p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
        <Link href={`/post/${post.slug}`} className="hover:text-accent">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        <span>•</span>
        <span>{post.readingTime}</span>
      </div>
    </article>
  );
}
