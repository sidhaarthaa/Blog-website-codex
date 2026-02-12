import Link from 'next/link';
import { LoadMore } from '@/components/LoadMore';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="space-y-10">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Newsroom</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Product thinking, AI insights, and technical deep dives.</h1>
        <p className="text-lg text-slate-600">
          A clean stream of updates from engineering, product, and research teams to keep you informed and moving faster.
        </p>
      </section>

      {featured && (
        <section className="rounded-2xl border border-slate-200 p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Featured</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            <Link className="hover:text-accent" href={`/post/${featured.slug}`}>
              {featured.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">{featured.excerpt}</p>
          <p className="mt-4 text-sm text-slate-500">
            {new Date(featured.date).toLocaleDateString()} • {featured.readingTime}
          </p>
        </section>
      )}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Latest posts</h2>
        <LoadMore posts={rest} />
      </section>
    </div>
  );
}
