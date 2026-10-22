"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { PongBackground } from "./pong-background";
import { DarkBackground } from "./dark-background";

export function BackgroundSwitcher() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  return (
    <>
      {/* base color, visible instantly while the theme resolves */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950"
      />
      {mounted &&
        (resolvedTheme === "dark" ? <DarkBackground /> : <PongBackground />)}
    </>
  );
}