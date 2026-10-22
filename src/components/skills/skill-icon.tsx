import type { Skill } from "@/data/skills";

export function SkillIcon({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
      <Icon className="size-5" />
      <span>{skill.name}</span>
    </div>
  );
}