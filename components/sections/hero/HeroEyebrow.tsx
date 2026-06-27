"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content/portfolio";
import { fadeUp, fadeUpTransition } from "@/lib/motion";

export function HeroEyebrow() {
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={fadeUpTransition}
      className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm"
    >
      {hero.eyebrow}
    </motion.p>
  );
}
