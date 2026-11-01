import Link from "next/link";
import { cn } from "@/lib/utils";

type Status = "open" | "freelance" | "busy";

// Full class names written out so Tailwind can detect them
const STATUS: Record<
  Status,
  { label: string; text: string; dot: string; ping: string; border: string }
> = {
  open: {
    label: "Open to work",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    ping: "bg-emerald-500/60",
    border: "border-emerald-500/30 bg-emerald-500/10",
  },
  freelance: {
    label: "Open to freelance",
    text: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    ping: "bg-sky-500/60",
    border: "border-sky-500/30 bg-sky-500/10",
  },
  busy: {
    label: "Currently booked",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    ping: "bg-amber-500/60",
    border: "border-amber-500/30 bg-amber-500/10",
  },
};

export function AvailabilityBadge({ status }: { status: Status | null }) {
  if (!status) return null;
  const s = STATUS[status];

  return (
    <Link
      href="/contact"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-transform hover:scale-105",
        s.border,
        s.text
      )}
    >
      <span className="relative flex size-2">
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping rounded-full motion-reduce:animate-none",
            s.ping
          )}
        />
        <span className={cn("relative inline-flex size-2 rounded-full", s.dot)} />
      </span>
      {s.label}
    </Link>
  );
}