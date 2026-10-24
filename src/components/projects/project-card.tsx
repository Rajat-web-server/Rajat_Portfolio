import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { GlassCard } from "@/components/glass/glass-card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard className="group flex h-full flex-col gap-4 p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-sky-200/60 to-violet-300/60 dark:from-indigo-500/20 dark:to-violet-500/20">
        {project.image && (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 768px) 400px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
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