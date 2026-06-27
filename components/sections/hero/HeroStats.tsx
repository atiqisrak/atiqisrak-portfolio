"use client";

import { motion } from "framer-motion";
import { impactStats } from "@/lib/content/portfolio";
import {
  fadeUp,
  fadeUpTransition,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const heroStats = [
  impactStats.find((s) => s.label.includes("Years")) ?? impactStats[5],
  impactStats.find((s) => s.label.includes("Products")) ?? impactStats[2],
];

type HeroStatsProps = {
  className?: string;
};

export function HeroStats({ className }: HeroStatsProps) {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={staggerContainer}
      className={cn("flex flex-wrap gap-x-10 gap-y-4", className)}
    >
      {heroStats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          transition={fadeUpTransition}
        >
          <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {stat.value}
          </p>
          <p className="mt-1 max-w-[9rem] text-sm leading-snug text-muted-foreground">
            {stat.label.includes("Years")
              ? "Years Of Experience"
              : "Products Shipped"}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
