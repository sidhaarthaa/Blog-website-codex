import Link from 'next/link';
import { categories } from '@/lib/constants';

export function CategoryNav() {
  return (
    <nav aria-label="Post categories" className="border-t border-slate-100">
      <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${encodeURIComponent(category)}`}
            className="whitespace-nowrap rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-slate-500 hover:text-slate-900"
          >
            {category}
          </Link>
        ))}
      </div>
    </nav>
  );
}
