"use client";

import { motion } from "framer-motion";
import { impactStats } from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { StatCount, StatLabel } from "@/components/shared/StatCount";
import { FloatingOrb } from "@/components/shared/decorations";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

const labelHighlights: Record<string, React.ReactNode> = {
  "Saved through workflow automation (Toyota / Navana)": (
    <>
      Saved through workflow{" "}
      <HighlightedText accentKey="ikigaiCerulean">automation</HighlightedText>{" "}
      (Toyota / Navana)
    </>
  ),
  "Revenue growth driven by AssetIQ": (
    <>
      Revenue{" "}
      <HighlightedText accentKey="matcha" strong>
        growth
      </HighlightedText>{" "}
      driven by AssetIQ
    </>
  ),
  "Products shipped across B2B and B2C": (
    <>
      Products <HighlightedText accentKey="sun">shipped</HighlightedText> across
      B2B and B2C
    </>
  ),
  "Consumer downloads driven (Aisha)": (
    <>
      Consumer <HighlightedText accentKey="sakura">downloads</HighlightedText>{" "}
      driven (Aisha)
    </>
  ),
  "Restaurants running products I've built (Neoshift)": (
    <>
      Restaurants running products I&apos;ve{" "}
      <HighlightedText accentKey="indigo">built</HighlightedText> (Neoshift)
    </>
  ),
  "Years shipping products (since Feb 2019)": (
    <>
      Years <HighlightedText accentKey="ikigaiHorizon">shipping</HighlightedText>{" "}
      products (since Feb 2019)
    </>
  ),
};

export function ImpactStats() {
  return (
    <SectionShell id="impact" ariaLabel="Impact by the numbers" spacious>
      <SectionHeading
        eyebrow="Impact"
        title={
          <>
            By the{" "}
            <HighlightedText accentKey="sun" strong>
              numbers
            </HighlightedText>
          </>
        }
        showWavyLine
      />
      <div className="relative mt-16 lg:mt-20">
        <FloatingOrb
          accent="ikigaiHorizon"
          className="right-0 top-0 hidden h-48 w-48 lg:block"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              transition={fadeUpTransition}
            >
              <StatCount value={stat.value} colorIndex={index} />
              <StatLabel>
                {labelHighlights[stat.label] ?? stat.label}
              </StatLabel>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
