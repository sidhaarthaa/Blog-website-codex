import { SearchBox } from '@/components/SearchBox';
import { getAllPosts } from '@/lib/posts';
import { makeMetadata } from '@/lib/seo';

export const metadata = makeMetadata('Search', 'Search posts by keyword, topic, and tags.', '/search');

export default function SearchPage() {
  const posts = getAllPosts();
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
      <p className="text-slate-600">Find content quickly using title, excerpt, or tags.</p>
      <SearchBox posts={posts} />
    </section>
  );
}
