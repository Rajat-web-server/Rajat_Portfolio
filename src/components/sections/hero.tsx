"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GlassCard } from "@/components/glass/glass-card";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="home">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <GlassCard className="space-y-4 p-8 sm:p-10">
          <p className="text-sm font-medium text-muted-foreground">
            {siteConfig.tagline}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I&apos;m {siteConfig.name}
          </h1>
          <p className="max-w-xl text-muted-foreground">{siteConfig.bio}</p>
          <div className="flex gap-3 pt-2">
            <Link
              href="#projects"
              className={cn(buttonVariants(), "rounded-full")}
            >
              See my work
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full",
              )}
            >
              Contact me
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
