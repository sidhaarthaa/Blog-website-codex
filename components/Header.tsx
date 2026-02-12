import Link from 'next/link';
import { siteConfig } from '@/lib/constants';
import { CategoryNav } from './CategoryNav';

export function Header() {
  return (
    <header className="border-b border-slate-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <Link href="/search" className="rounded-full border border-slate-300 px-4 py-2 text-sm hover:border-slate-400">
          Search
        </Link>
      </div>
      <CategoryNav />
    </header>
  );
}
