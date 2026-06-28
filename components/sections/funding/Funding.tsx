"use client";

import { motion } from "framer-motion";
import {
  fundingRounds,
  fundingTraction,
} from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionMotion } from "@/components/shared/SectionMotion";
import { SectionShell } from "@/components/shared/SectionShell";
import { StatCount, StatLabel } from "@/components/shared/StatCount";
import { BrushStroke } from "@/components/shared/decorations";
import { fadeUp, fadeUpTransition, pulseOnce, staggerContainer } from "@/lib/motion";
import { FundingRoundCard } from "./FundingRoundCard";

export function Funding() {
  return (
    <SectionShell ariaLabel="Funding and traction" decorated decorationVariant="right">
      <SectionMotion>
        <SectionHeading
          eyebrow="Funding & traction"
          title={
            <>
              Capital behind the{" "}
              <HighlightedText accentKey="ikigaiCerulean" strong>
                products
              </HighlightedText>
            </>
          }
          showWavyLine
          align="offset"
        />
        <MotionReveal className="relative mt-16 max-w-2xl lg:mt-20">
          <BrushStroke accent="ikigaiHorizon" className="mb-4" />
          <motion.p
            className="font-playfair text-lg leading-relaxed text-foreground lg:text-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={pulseOnce}
          >
            Products I&apos;ve led have collectively raised external{" "}
            <HighlightedText accentKey="sun" strong>
              funding
            </HighlightedText>{" "}
            across pre-seed and seed rounds — and I&apos;ve owned the{" "}
            <HighlightedText accentKey="matcha" strong>
              metrics
            </HighlightedText>
            ,{" "}
            <HighlightedText accentKey="sakura">narrative</HighlightedText>,
            and demos that investors saw.
          </motion.p>
        </MotionReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
        >
          {fundingRounds.map((round, index) => (
            <motion.div
              key={round.product}
              variants={fadeUp}
              transition={fadeUpTransition}
            >
              <FundingRoundCard round={round} colorIndex={index} />
            </motion.div>
          ))}
        </motion.div>

        <MotionReveal className="mt-14 lg:mt-16" delay={0.1}>
          <p className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-foreground sm:text-xs sm:tracking-[0.2em]">
            Commercial traction
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {fundingTraction.map((stat, index) => (
              <div key={stat.label}>
                <StatCount value={stat.value} colorIndex={index} />
                <StatLabel>{stat.label}</StatLabel>
              </div>
            ))}
          </div>
        </MotionReveal>
      </SectionMotion>
    </SectionShell>
  );
}
