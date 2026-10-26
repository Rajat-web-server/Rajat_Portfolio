"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GlassCard } from "@/components/glass/glass-card";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import type { ReactNode } from "react";

export function Hero({ children }: { children?: ReactNode }) {
  return (
    <section id="home">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
       <GlassCard className="space-y-4 p-8 sm:p-10">
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-muted-foreground">
    <p>{siteConfig.tagline}</p>
    <p className="flex items-center gap-1.5">
      <MapPin className="size-4" />
      {siteConfig.location}
    </p>
  </div>
  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
    Hi, I&apos;m {siteConfig.name}
  </h1>
  <p className="max-w-xl text-muted-foreground">{siteConfig.bio}</p>
  <div className="flex gap-3 pt-2">
    <Link href="#projects" className={cn(buttonVariants(), "rounded-full")}>
      See my work
    </Link>
    <Link
      href="/contact"
      className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
    >
      Contact me
    </Link>
  </div>
  {children}
</GlassCard>
      </motion.div>
    </section>
  );
}
