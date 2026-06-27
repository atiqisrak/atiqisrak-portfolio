"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { hero } from "@/lib/content/portfolio";
import {
  fadeUp,
  fadeUpTransition,
  staggerContainer,
} from "@/lib/motion";
import { getAccent } from "@/lib/design/accent-colors";
import { cn } from "@/lib/utils";

type HeroSkillPillsProps = {
  className?: string;
};

export function HeroSkillPills({ className }: HeroSkillPillsProps) {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={staggerContainer}
      className={cn("flex flex-wrap items-center gap-2.5", className)}
      role="list"
      aria-label="Core skills"
    >
      <motion.span variants={fadeUp} transition={fadeUpTransition}>
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#635BFF] text-white shadow-sm"
          aria-hidden
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </motion.span>
      {hero.skillPills.map((skill, index) => {
        const style = getAccent(index);
        return (
          <motion.span
            key={skill}
            variants={fadeUp}
            transition={fadeUpTransition}
            role="listitem"
          >
            <span
              className={cn(
                "inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-medium",
                style.bg,
                style.text
              )}
            >
              {skill}
            </span>
          </motion.span>
        );
      })}
    </motion.div>
  );
}
