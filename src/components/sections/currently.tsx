import { BookOpen, GraduationCap, Hammer, type LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { currently, type CurrentlyItem } from "@/data/currently";
import { Reveal } from "./reveal";

const META: Record<CurrentlyItem["kind"], { label: string; icon: LucideIcon }> =
  {
    building: { label: "Building", icon: Hammer },
    learning: { label: "Learning", icon: GraduationCap },
    reading: { label: "Reading", icon: BookOpen },
  };

export function Currently() {
  return (
    <section id="currently" className="scroll-mt-28 ">
      <Reveal >
        <GlassCard className="space-y-5 bg-amber-400/15! dark:bg-amber:400/10! ">
          <div className="flex items-center gap-3 ">
            <h2 className="text-2xl font-bold">Currently</h2>
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {currently.map((item) => {
              const { label, icon: Icon } = META[item.kind];
              return (
                <div key={item.kind} className="space-y-2">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <Icon className="size-4" />
                    {label}
                  </p>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
