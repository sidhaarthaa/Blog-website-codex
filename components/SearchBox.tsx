'use client';

import { useMemo, useState } from 'react';
import type { Post } from '@/lib/posts';
import { PostCard } from './PostCard';

export function SearchBox({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts;

    return posts.filter((post) =>
      [post.title, post.excerpt, post.tags.join(' ')].join(' ').toLowerCase().includes(normalized),
    );
  }, [posts, query]);

  return (
    <div className="space-y-6">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search titles, excerpts, and tags"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none ring-accent/40 focus:ring"
      />
      <p className="text-sm text-slate-500">{results.length} result(s)</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
