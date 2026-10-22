import { cn } from "@/lib/utils";
import type { Skill } from "@/data/skills";
import { SkillIcon } from "./skill-icon";

export function SkillMarquee({
  items,
  reverse = false,
}: {
  items: Skill[];
  reverse?: boolean;
}) {
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={cn(
          "flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 gap-4 pr-4"
          >
            {items.map((skill) => (
              <SkillIcon key={`${copy}-${skill.name}`} skill={skill} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}