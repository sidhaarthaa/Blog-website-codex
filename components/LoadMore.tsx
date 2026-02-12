'use client';

import { useMemo, useState } from 'react';
import type { Post } from '@/lib/posts';
import { PostCard } from './PostCard';

export function LoadMore({ posts }: { posts: Post[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {visibleCount < posts.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + 6)}
          className="mx-auto mt-8 block rounded-full border border-slate-300 px-5 py-2 text-sm font-medium hover:border-slate-500"
        >
          Load more
        </button>
      )}
    </div>
  );
}
