"use client";

import { motion } from "framer-motion";
import {
  approachSteps,
} from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { HoverCard } from "@/components/shared/HoverCard";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { BrushStroke, Squiggle } from "@/components/shared/decorations";
import { ApproachStep } from "./ApproachStep";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

export function Approach() {
  return (
    <SectionShell id="about" ariaLabel="Approach" spacious>
      <SectionHeading
        title={
          <>
            Most PMs manage{" "}
            <HighlightedText colorIndex={4} accentKey="indigo">
              roadmaps
            </HighlightedText>
            . I manage{" "}
            <HighlightedText colorIndex={1} accentKey="matcha" strong>
              outcomes
            </HighlightedText>
            .
          </>
        }
        showWavyLine
        titleSize="xl"
        align="offset"
      />
      <MotionReveal className="relative mt-6 max-w-2xl">
        <BrushStroke accent="matcha" className="mb-3" />
        <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
          A{" "}
          <HighlightedText colorIndex={0} accentKey="sun">
            roadmap
          </HighlightedText>{" "}
          is easy to fill and easy to hide behind. The only question that matters
          is harder: did the business get{" "}
          <HighlightedText colorIndex={3} accentKey="sakura">
            bigger, faster, or leaner
          </HighlightedText>{" "}
          because this{" "}
          <HighlightedText colorIndex={2} accentKey="ikigaiCerulean">
            shipped
          </HighlightedText>
          ? I start at the{" "}
          <HighlightedText colorIndex={0} accentKey="matcha" strong>
            outcome
          </HighlightedText>{" "}
          and work backward — I can name the{" "}
          <HighlightedText colorIndex={2} accentKey="indigo" strong>
            number
          </HighlightedText>{" "}
          a feature is meant to move before we build it.
        </p>
      </MotionReveal>
      <div className="mt-10">
        <Squiggle />
      </div>
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8"
      >
        {approachSteps.map((step, index) => (
          <motion.li key={step.number} variants={fadeUp} transition={fadeUpTransition}>
            <HoverCard accent={index === 0 ? "matcha" : index === 1 ? "sun" : "indigo"}>
              <ApproachStep step={step} colorIndex={index} />
            </HoverCard>
          </motion.li>
        ))}
      </motion.ol>
    </SectionShell>
  );
}
