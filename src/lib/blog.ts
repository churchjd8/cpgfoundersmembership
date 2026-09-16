import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  publishAt?: string;
  author: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  readingTime: string;
  content: string;
}

export function getAllPosts(now = Date.now()): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      publishAt: data.publishAt,
      author: data.author || "Jeff Church",
      image: data.image || null,
      tags: data.tags || [],
      featured: data.featured || false,
      readingTime: stats.text,
      content,
    };
  });

  // An explicit timestamp gates both listings and direct article URLs. Invalid
  // timestamps stay unpublished; older posts without a schedule keep working.
  return posts
    .filter((post) => post.publishAt === undefined || Date.parse(post.publishAt) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, now = Date.now()): BlogPost | undefined {
  const posts = getAllPosts(now);
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
