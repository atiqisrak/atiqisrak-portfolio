"use client";

import { motion } from "framer-motion";
import { impactStats } from "@/lib/content/portfolio";
import {
  fadeUp,
  fadeUpTransition,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const heroStats = impactStats.slice(0, 4);

type HeroStatsProps = {
  className?: string;
};

export function HeroStats({ className }: HeroStatsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={cn(
        "grid w-full max-w-sm grid-cols-2 gap-4 sm:max-w-md lg:max-w-xs",
        className
      )}
    >
      {heroStats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          transition={fadeUpTransition}
          className="rounded-xl border border-ink-100 bg-ink-50 px-4 py-3"
        >
          <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
