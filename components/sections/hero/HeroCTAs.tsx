"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/content/portfolio";
import { fadeUp, fadeUpTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroCTAsProps = {
  className?: string;
  fullWidth?: boolean;
};

export function HeroCTAs({ className, fullWidth }: HeroCTAsProps) {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={fadeUp}
      transition={{ ...fadeUpTransition, delay: 0.2 }}
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center",
        fullWidth && "w-full sm:w-full [&_a]:w-full [&_button]:w-full",
        className
      )}
    >
      <Button asChild size="lg" className="rounded-full">
        <Link href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-full">
        <Link href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
      </Button>
    </motion.div>
  );
}
