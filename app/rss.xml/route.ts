import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `<item>
  <title><![CDATA[${post.title}]]></title>
  <link>https://giga.ai/news/post/${post.slug}</link>
  <guid>https://giga.ai/news/post/${post.slug}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <description><![CDATA[${post.excerpt}]]></description>
</item>`,
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Giga Newsroom</title>
  <link>https://giga.ai/news</link>
  <description>Latest posts from Giga Newsroom</description>
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
