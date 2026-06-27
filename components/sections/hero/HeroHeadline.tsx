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
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-2"
    >
      <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
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
      <motion.p
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.08 }}
        className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {hero.subhead}
      </motion.p>
    </motion.div>
  );
}
