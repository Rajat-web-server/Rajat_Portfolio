import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/blog/mdx-components";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="space-y-6">
      <Link
        href="/blogs"
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All posts
      </Link>

      <GlassCard className="space-y-8 p-8 sm:p-10">
        <header className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">
            {formatDate(post.date)} · {post.readingTime} min read
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-28 prose-a:underline-offset-4">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </GlassCard>
    </article>
  );
}