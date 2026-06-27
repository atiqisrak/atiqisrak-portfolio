"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { JapaneseAccentKey } from "@/lib/design/accent-colors";
import { getJapaneseAccent } from "@/lib/design/accent-colors";
import { fadeUp, fadeUpTransition, useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  const { fadeUp: fadeVariant, fadeUpTransition: transition } = useMotionPrefs();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeVariant}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type HoverCardProps = {
  children: ReactNode;
  className?: string;
  accent?: JapaneseAccentKey;
  as?: "article" | "div";
};

export function HoverCard({
  children,
  className,
  accent = "matcha",
  as = "article",
}: HoverCardProps) {
  const colors = getJapaneseAccent(accent);
  const { prefersReducedMotion } = useMotionPrefs();
  const hoverProps = prefersReducedMotion
    ? {}
    : {
        whileHover: {
          y: -4,
          boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)",
          borderLeftColor: colors.hex,
        },
      };

  const shared = cn(
    "rounded-2xl border border-ink-100 border-l-4 border-l-transparent transition-colors",
    className
  );

  if (as === "div") {
    return (
      <motion.div className={shared} transition={{ duration: 0.25 }} {...hoverProps}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.article className={shared} transition={{ duration: 0.25 }} {...hoverProps}>
      {children}
    </motion.article>
  );
}
