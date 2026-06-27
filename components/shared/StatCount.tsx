"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { getHighlightAccent } from "@/lib/design/accent-colors";
import { useCountUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type StatCountProps = {
  value: string;
  colorIndex: number;
};

export function StatCount({ value, colorIndex }: StatCountProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const display = useCountUp(value, inView);
  const [hovered, setHovered] = useState(false);
  const accent = getHighlightAccent(colorIndex);

  return (
    <motion.p
      ref={ref}
      className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <span
        className={cn(
          "rounded-sm px-1.5 py-0.5 transition-colors duration-300",
          hovered ? accent.highlightStrong : accent.highlight
        )}
      >
        {display}
      </span>
    </motion.p>
  );
}

type StatLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function StatLabel({ children, className }: StatLabelProps) {
  return (
    <motion.p
      className={cn(
        "mt-2 max-w-[12rem] text-sm leading-snug text-muted-foreground",
        className
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.p>
  );
}
