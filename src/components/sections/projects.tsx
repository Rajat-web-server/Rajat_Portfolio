import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
import { Reveal } from "./reveal";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 space-y-5">
      <Reveal>
        <h2 className="text-2xl font-bold">Projects</h2>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}