import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { GlassCard } from "@/components/glass/glass-card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

type Shape = NonNullable<Project["shape"]>;

function Tile({ src, shape }: { src: string; shape: Shape }) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border-[3px] border-white/90 bg-zinc-300 shadow-lg dark:bg-zinc-800",
        shape === "portrait"
          ? "h-28 w-16 rounded-xl"
          : "h-20 w-36 rounded-lg"
      )}
    >
      <Image src={src} alt="" fill sizes="144px" className="object-cover" />
    </div>
  );
}

function Row({
  images,
  shape,
  duration,
  reverse,
}: {
  images: string[];
  shape: Shape;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div
      className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {/* rendered twice so the loop has no gap */}
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 gap-3 pr-3">
          {images.map((src, i) => (
            <Tile key={`${copy}-${i}`} src={src} shape={shape} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Collage({
  images,
  shape,
}: {
  images: string[];
  shape: Shape;
}) {
  // repeat the list so each row is long enough to fill the width
  const filled = Array.from(
    { length: Math.max(16, images.length) },
    (_, i) => images[i % images.length]
  );
  const rowA = filled.filter((_, i) => i % 2 === 0);
  const rowB = filled.filter((_, i) => i % 2 === 1);

  return (
    <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="absolute left-1/2 top-1/2 w-[170%] -translate-x-1/2 -translate-y-1/2 -rotate-12 space-y-3">
        <Row images={rowA} shape={shape} duration={40} />
        <Row images={rowB} shape={shape} duration={50} reverse />
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const shape = project.shape ?? "landscape";
  const images = project.images ?? (project.image ? [project.image] : []);

  return (
    <GlassCard className="group flex h-full flex-col gap-4 p-5 transition-transform duration-300 hover:-translate-y-1">
      <div
        role="img"
        aria-label={`${project.title} screenshots`}
        className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-sky-200/60 to-violet-300/60 dark:from-indigo-500/20 dark:to-violet-500/20"
      >
        {images.length === 1 && (
          <Image
            src={images[0]}
            alt=""
            fill
            sizes="(min-width: 768px) 400px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {images.length > 1 && <Collage images={images} shape={shape} />}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex gap-4 pt-1">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <ExternalLink className="size-4" /> Live
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <SiGithub className="size-4" /> Code
          </a>
        )}
      </div>
    </GlassCard>
  );
}