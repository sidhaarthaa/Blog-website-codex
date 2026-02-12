import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { categories, type Category } from './constants';
import { readingTime } from './reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: Category;
  tags: string[];
  coverImage?: string;
  author?: string;
  content: string;
  htmlContent?: string;
  readingTime: string;
};

function isCategory(category: string): category is Category {
  return categories.includes(category as Category);
}

function parsePostFile(fileName: string): Post {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const category = isCategory(data.category) ? data.category : 'Tech';
  const slug = typeof data.slug === 'string' ? data.slug : fileName.replace(/\.mdx?$/, '');

  return {
    title: data.title,
    slug,
    excerpt: data.excerpt,
    date: data.date,
    category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.coverImage,
    author: data.author,
    content,
    readingTime: readingTime(content),
  };
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  return fileNames
    .map(parsePostFile)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export async function getPostHtml(post: Post): Promise<string> {
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(post.content);
  return processed.toString();
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((post) => post.slug !== currentPost.slug)
    .sort((a, b) => {
      const aScore = a.category === currentPost.category ? 1 : 0;
      const bScore = b.category === currentPost.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}
