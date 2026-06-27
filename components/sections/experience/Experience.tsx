"use client";

import { motion } from "framer-motion";
import { jobs } from "@/lib/content/portfolio";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { ExperienceCard, ExperienceResumeLink } from "./ExperienceCard";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

export function Experience() {
  return (
    <SectionShell id="experience" ariaLabel="Experience">
      <SectionHeading eyebrow="Experience" title="Outcome-led roles" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-10 space-y-6"
      >
        {jobs.map((job) => (
          <motion.div key={job.slug} variants={fadeUp} transition={fadeUpTransition}>
            <ExperienceCard job={job} />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-8">
        <ExperienceResumeLink />
      </div>
    </SectionShell>
  );
}
