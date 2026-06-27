"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content/portfolio";
import { fadeUp, fadeUpTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroProofLineProps = {
  className?: string;
};

export function HeroProofLine({ className }: HeroProofLineProps) {
  return (
    <motion.p
      initial={false}
      animate="visible"
      variants={fadeUp}
      transition={{ ...fadeUpTransition, delay: 0.12 }}
      className={cn(
        "max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base",
        className
      )}
    >
      {hero.proofLine}
    </motion.p>
  );
}
