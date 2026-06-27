"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, useMotionPrefs } from "@/lib/motion";
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
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
