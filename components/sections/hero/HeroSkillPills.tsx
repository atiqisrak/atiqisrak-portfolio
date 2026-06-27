"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content/portfolio";
import { StatPill } from "@/components/shared/StatPill";
import {
  fadeUp,
  fadeUpTransition,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroSkillPillsProps = {
  className?: string;
};

export function HeroSkillPills({ className }: HeroSkillPillsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={cn("flex flex-wrap gap-2", className)}
      role="list"
      aria-label="Core skills"
    >
      {hero.skillPills.map((skill) => (
        <motion.span key={skill} variants={fadeUp} transition={fadeUpTransition}>
          <StatPill>{skill}</StatPill>
        </motion.span>
      ))}
    </motion.div>
  );
}
