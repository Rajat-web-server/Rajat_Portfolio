import { GlassCard } from "@/components/glass/glass-card";
import { education } from "@/data/education";
import { Reveal } from "./reveal";

export function Education() {
  return (
    <section id="education" className="scroll-mt-28 space-y-5">
      <Reveal>
        <h2 className="text-2xl font-bold">Education</h2>
      </Reveal>
      <Reveal>
        <GlassCard>
          <ol className="relative space-y-8 border-l border-foreground/15 pl-6">
            {education.map((item) => (
              <li key={item.school} className="relative">
                <span className="absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-foreground" />
                <p className="text-xs font-medium text-muted-foreground">
                  {item.period}
                </p>
                <h3 className="text-lg font-semibold">{item.school}</h3>
                <p className="text-sm">{item.degree}</p>
                {item.details && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.details}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </GlassCard>
      </Reveal>
    </section>
  );
}