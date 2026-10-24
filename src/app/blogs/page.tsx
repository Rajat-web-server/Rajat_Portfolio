import type { Metadata } from "next";
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
        <GlassCard>
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
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