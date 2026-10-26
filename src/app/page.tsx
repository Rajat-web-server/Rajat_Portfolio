import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { GithubHeatmap } from "@/components/sections/github-heatmap";

export default function Home() {
  return (
    <div className="space-y-6">
      <Hero>
         <GithubHeatmap />
      </Hero>
      <Skills />
      <Projects />
      <Education />
    </div>
  );
}
