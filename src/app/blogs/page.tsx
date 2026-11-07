import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Notes, tutorials, and things I've learned.",
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-6">
      <GlassCard className="space-y-2 p-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <p className="text-muted-foreground">
          Notes, tutorials, and things I&apos;ve learned.
        </p>
      </GlassCard>

      {posts.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-4 px-8 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-foreground/5">
            <PenLine className="size-6 text-muted-foreground" />
          </span>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Coming soon</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              I&apos;m working on my first posts about full stack development,
              system design, and agentic AI. Check back soon.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-500/60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
            </span>
            Writing in progress
          </span>
        </GlassCard>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}