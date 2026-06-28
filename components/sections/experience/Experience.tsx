"use client";

import { motion } from "framer-motion";
import { jobs } from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { SectionBreather } from "@/components/shared/SectionBreather";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { getSectionAccent } from "@/lib/design/accent-colors";
import { ExperienceCard, ExperienceResumeLink } from "./ExperienceCard";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

export function Experience() {
  return (
    <>
      <SectionShell id="experience" ariaLabel="Experience" decorated decorationVariant="left">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              <HighlightedText accentKey="indigo" strong>
                Outcome-led
              </HighlightedText>{" "}
              roles
            </>
          }
          showWavyLine
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative mt-16 space-y-8 border-l-2 border-ink-100 pl-6 lg:mt-20 lg:pl-8"
        >
          {jobs.map((job, index) => {
            const accent = getSectionAccent("experience", index);
            return (
              <motion.div
                key={job.slug}
                variants={fadeUp}
                transition={fadeUpTransition}
                className="relative"
              >
                <span
                  className="absolute -left-[calc(1.5rem+5px)] top-8 h-3 w-3 rounded-full lg:-left-[calc(2rem+5px)]"
                  style={{ backgroundColor: accent.hex }}
                  aria-hidden
                />
                <ExperienceCard
                  job={job}
                  colorIndex={index}
                  showSquiggle={index % 2 === 1}
                  accentHex={accent.hex}
                />
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-10">
          <ExperienceResumeLink />
        </div>
      </SectionShell>
      <SectionBreather />
    </>
  );
}
