"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MagneticWrapProps = {
  children: ReactNode;
  className?: string;
};

export function MagneticWrap({ children, className }: MagneticWrapProps) {
  const { prefersReducedMotion } = useMotionPrefs();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - rect.left - rect.width / 2;
        const dy = e.clientY - rect.top - rect.height / 2;
        x.set(Math.max(-6, Math.min(6, dx * 0.15)));
        y.set(Math.max(-6, Math.min(6, dy * 0.15)));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
