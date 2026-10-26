import { SiGithub } from "react-icons/si";
import { getContributions } from "@/lib/github";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const LEVELS = [
  "bg-foreground/10",
  "bg-emerald-500/30",
  "bg-emerald-500/55",
  "bg-emerald-500/80",
  "bg-emerald-500",
];

export async function GithubHeatmap() {
  const username = siteConfig.githubUsername;
  const data = await getContributions(username);

  const header = (
    <div className="flex items-center justify-between gap-4 text-sm">
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <SiGithub className="size-4" /> @{username}
      </a>
      {data && (
        <p className="text-muted-foreground">
          {data.total.toLocaleString()} contributions in the last year
        </p>
      )}
    </div>
  );

  if (!data) {
    return (
      <div className="space-y-3 border-t border-foreground/10 pt-5">
        {header}
        <p className="text-sm text-muted-foreground">
          Contribution graph is unavailable right now.
        </p>
      </div>
    );
  }

  // Start the first column on the right weekday (Sunday = row 1)
  const firstDay = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();

  return (
    <div className="space-y-3 border-t border-foreground/10 pt-5">
      {header}

      <div className="overflow-x-auto pb-1">
        <div
          role="img"
          aria-label={`${data.total} GitHub contributions in the last year`}
          className="grid min-w-[44rem] grid-flow-col grid-rows-7 gap-[3px]"
        >
          {data.days.map((day, i) => (
            <div
              key={day.date}
              title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
              style={i === 0 ? { gridRowStart: firstDay + 1 } : undefined}
              className={cn("aspect-square rounded-[3px]", LEVELS[day.level])}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
        Less
        {LEVELS.map((cls) => (
          <span key={cls} className={cn("size-3 rounded-[3px]", cls)} />
        ))}
        More
      </div>
    </div>
  );
}