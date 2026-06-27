"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionMotionProps = {
  children: ReactNode;
  className?: string;
};

export function SectionMotion({ children, className }: SectionMotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={fadeUpTransition}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
