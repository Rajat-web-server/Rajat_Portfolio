import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(),"src", "content", "blogs");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number; // minutes
};

export type Post = PostMeta & { content: string };

const SLUG_RE = /^[a-z0-9-]+$/i;

function parse(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? String(data.date) : "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: Math.max(1, Math.round(words / 200)),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const post = parse(
        slug,
        fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
      );
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        readingTime: post.readingTime,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getPost(slug: string): Post | null {
  if (!SLUG_RE.test(slug)) return null; // blocks path tricks like "../"

  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  return parse(slug, fs.readFileSync(file, "utf8"));
}

export function formatDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}