# Giga Newsroom (/news)

A fast, clean news/blog experience built with Next.js App Router, TypeScript, Tailwind CSS, and Markdown content files.

## Site map and component structure

### Pages
- `/news` – Home with intro, featured story, latest posts grid, and load-more interaction.
- `/news/category/[category]` – Category-specific listing pages.
- `/news/post/[slug]` – Full post detail page with metadata, sharing links, and related posts.
- `/news/search` – Client-side search over title, excerpt, and tags.
- `/news/rss.xml` – RSS feed.
- `/news/sitemap.xml` – XML sitemap generated from categories + posts.
- `/news/robots.txt` – Robots rules with sitemap reference.
- `/news/admin` – Decap CMS admin UI.

### Core components
- `Header` – Brand, quick search entry, category nav.
- `CategoryNav` – 5 fixed category chips.
- `PostCard` – Reusable post list card.
- `LoadMore` – Progressive disclosure for home listing.
- `SearchBox` – Search input + live filtering.
- `Footer` – Lightweight site footer.

### Content + utilities
- Posts are stored in `content/posts/*.md` with frontmatter.
- `lib/posts.ts` – post loading/parsing/filtering + Markdown rendering.
- `lib/reading-time.ts` – reading-time helper.
- `app/rss.xml/route.ts` – RSS generator.
- `app/sitemap.ts` and `app/robots.ts` – SEO crawler artifacts.

## Install and run (pnpm)

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000/news`.

## Build for production

```bash
pnpm build
pnpm start
```

## Content model
Each post includes:
- `title`
- `slug`
- `excerpt`
- `date`
- `category` (`Tech`, `AI Information`, `How To’s`, `Product Updates`, `Industry Insights`)
- `tags`
- `coverImage` (optional)
- `author` (optional)
- Markdown body content

## How to add a new post (code method)
1. Add a new `.md` file under `content/posts/`.
2. Copy frontmatter shape from existing posts.
3. Set a unique `slug` and valid `category`.
4. Commit and deploy.

## How to add a blog post (no code)
1. Open `https://giga.ai/news/admin`.
2. Log in with the configured provider (GitHub recommended).
3. Click **Posts** → **New post**.
4. Fill in title, slug, excerpt, date, category, tags, optional cover image/author, and content.
5. Click **Publish**.
6. Confirm it appears on:
   - `/news`
   - `/news/category/[category]`
   - `/news/search`
   - `/news/rss.xml`
   - `/news/sitemap.xml`

## Decap CMS setup notes
Update these values in `public/admin/config.yml` before production use:
- `backend.repo` to your real GitHub repository.
- `backend.branch` to your publishing branch.

Recommended hosting setup:
- **Netlify (simplest for Decap auth):** Enable GitHub identity provider and Decap authentication.
- **Vercel deployment:** CMS commits (or editorial workflow PR merges) trigger normal Vercel builds.

## Backup method (still no code)
If CMS is unavailable, you can publish from GitHub web UI:
1. Open the repository in GitHub.
2. Go to `content/posts/`.
3. Click **Add file** → **Create new file** (or open an existing file to edit).
4. Add/update frontmatter + Markdown content.
5. Commit directly to the target branch or open a PR.
6. Let the normal deployment pipeline publish updates.

## Deploy to Vercel
1. Import this repository in Vercel.
2. Framework preset: **Next.js**.
3. Build command: `pnpm build`.
4. Output: default Next.js output.
5. Ensure production domain serves `/news` routes.

## Acceptance checklist
- [x] Base path routing works under `/news`.
- [x] Five-category filtering works on nav and category pages.
- [x] Post detail includes title/date/reading time/share/related posts.
- [x] Search page filters by title/excerpt/tags.
- [x] SEO metadata per route and canonical URLs included.
- [x] RSS feed exists at `/news/rss.xml`.
- [x] Sitemap + robots generated.
- [x] Decap CMS admin available at `/news/admin` with Git-backed content.
