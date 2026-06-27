"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content/portfolio";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

const headlineLines = hero.headline
  .split(/(?<=\.)\s+/)
  .filter(Boolean);

export function HeroHeadline() {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={staggerContainer}
    >
      <h1 className="font-playfair text-[2rem] font-bold leading-[1.08] tracking-tight text-foreground min-[375px]:text-[2.25rem] sm:text-[2.5rem] lg:text-[3.5rem] lg:leading-[1.05] xl:text-6xl">
        {headlineLines.map((line) => (
          <motion.span
            key={line}
            variants={fadeUp}
            transition={fadeUpTransition}
            className="block"
          >
            {line}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  );
}
