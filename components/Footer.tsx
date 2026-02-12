export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Giga Newsroom. All rights reserved.</p>
        <p>Built for speed, clarity, and accessibility.</p>
      </div>
    </footer>
  );
}
