import { GlassCard } from "@/components/glass/glass-card";
import { SkillMarquee } from "@/components/skills/skill-marquee";
import { skills } from "@/data/skills";

export function Skills() {
  const half = Math.ceil(skills.length / 2);

  return (
    <section id="skills" className="scroll-mt-28">
      <GlassCard className="space-y-5">
        <h2 className="text-2xl font-bold">Skills</h2>
        <SkillMarquee items={skills.slice(0, half)} />
        <SkillMarquee items={skills.slice(half)} reverse />
      </GlassCard>
    </section>
  );
}