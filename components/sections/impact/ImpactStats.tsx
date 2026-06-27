"use client";

import { motion } from "framer-motion";
import { impactStats } from "@/lib/content/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

export function ImpactStats() {
  return (
    <SectionShell id="impact" ariaLabel="Impact by the numbers">
      <SectionHeading
        eyebrow="Impact"
        title="By the numbers"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6"
      >
        {impactStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            transition={fadeUpTransition}
            className="rounded-2xl border border-ink-100 bg-background p-5 lg:p-6"
          >
            <p className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
