"use client";

import { motion } from "framer-motion";
import {
  approachHeading,
  approachIntro,
  approachSteps,
} from "@/lib/content/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { ApproachStep } from "./ApproachStep";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

export function Approach() {
  return (
    <SectionShell id="about" ariaLabel="Approach">
      <SectionHeading title={approachHeading} />
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
        {approachIntro}
      </p>
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8"
      >
        {approachSteps.map((step) => (
          <motion.li key={step.number} variants={fadeUp} transition={fadeUpTransition}>
            <ApproachStep step={step} />
          </motion.li>
        ))}
      </motion.ol>
    </SectionShell>
  );
}
