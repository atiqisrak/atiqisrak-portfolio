"use client";

import { motion } from "framer-motion";
import { fundingNarrative } from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionMotion } from "@/components/shared/SectionMotion";
import { SectionShell } from "@/components/shared/SectionShell";
import { BrushStroke } from "@/components/shared/decorations";
import { pulseOnce } from "@/lib/motion";

export function Funding() {
  return (
    <SectionShell ariaLabel="Funding and traction">
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
      </SectionMotion>
    </SectionShell>
  );
}
