import Link from "next/link";
import { GlassCard } from "@/components/glass/glass-card";
import { Badge } from "@/components/ui/badge";
import { formatDate, type PostMeta } from "@/lib/blog";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <GlassCard className="space-y-3 transition-transform duration-300 group-hover:-translate-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          {formatDate(post.date)} · {post.readingTime} min read
        </p>
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-sm text-muted-foreground">{post.description}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </GlassCard>
    </Link>
  );
}