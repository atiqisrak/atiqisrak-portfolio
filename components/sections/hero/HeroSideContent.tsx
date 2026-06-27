"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content/portfolio";
import { fadeUp, fadeUpTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  HeroFlowerIcon,
  HeroHalfCircle,
  HeroSparkle,
  HeroSquiggle,
} from "./HeroDecorations";

type HeroSideTopProps = {
  className?: string;
};

export function HeroSideTop({ className }: HeroSideTopProps) {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={fadeUp}
      transition={{ ...fadeUpTransition, delay: 0.15 }}
      className={cn(
        "max-w-[12rem] text-[0.55rem] font-medium uppercase leading-[1.9] tracking-[0.18em] text-foreground sm:max-w-[13rem] sm:text-[0.6rem] sm:tracking-[0.2em] lg:max-w-[14rem] lg:text-xs",
        className
      )}
    >
      Building stylish, minimal, modern pr
      <HeroSparkle className="mx-0.5 inline h-2.5 w-2.5 align-middle" />
      ducts with teams that turn AI and rigor into growth.
    </motion.div>
  );
}

type HeroBottomTextProps = {
  className?: string;
};

export function HeroBottomText({ className }: HeroBottomTextProps) {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={fadeUp}
      transition={{ ...fadeUpTransition, delay: 0.2 }}
      className={cn("space-y-5", className)}
    >
      <HeroSquiggle />
      <div className="font-playfair text-lg leading-snug text-foreground sm:text-xl lg:text-[1.65rem] lg:leading-snug xl:text-[1.75rem]">
        <span className="block">
          W
          <HeroHalfCircle />
          rks across the world with
        </span>
        <span className="block">
          people from all walks
          <HeroFlowerIcon /> f life,
        </span>
        <span className="block">industries and cultures</span>
      </div>
      <p className="sr-only">{hero.proofLine}</p>
    </motion.div>
  );
}

export function HeroSideContent({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <HeroSideTop />
      <HeroBottomText />
    </div>
  );
}
