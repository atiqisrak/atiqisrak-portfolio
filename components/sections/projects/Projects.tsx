"use client";

import { motion } from "framer-motion";
import {
  companyLabels,
  productsByCompany,
  type Company,
} from "@/lib/content/portfolio";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { companyAccentMap } from "@/lib/design/accent-colors";
import {
  scaleIn,
  scaleInTransition,
  staggerFast,
} from "@/lib/motion";

const companyOrder: Company[] = ["chromatics", "ether", "navana"];

export function Projects() {
  return (
    <SectionShell id="projects" ariaLabel="Product portfolio">
      <SectionHeading
        eyebrow="Portfolio"
        title={
          <>
            <HighlightedText accentKey="sun" strong>
              15+
            </HighlightedText>{" "}
            products{" "}
            <HighlightedText accentKey="matcha">shipped</HighlightedText>
          </>
        }
        showWavyLine
      />
      <div className="mt-16 space-y-14 lg:mt-20">
        {companyOrder.map((company) => {
          const accent = companyAccentMap[company];
          return (
            <div key={company}>
              <h3 className="mb-5 flex items-center gap-2 text-[0.55rem] font-medium uppercase tracking-[0.18em] text-foreground sm:text-xs sm:tracking-[0.2em]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: accent.hex }}
                  aria-hidden
                />
                {companyLabels[company]}
              </h3>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={staggerFast}
                className="grid gap-4 lg:grid-cols-2 lg:gap-6"
              >
                {productsByCompany[company].map((product, index) => (
                  <motion.div
                    key={product.slug}
                    variants={scaleIn}
                    transition={{ ...scaleInTransition, delay: index * 0.05 }}
                  >
                    <ProjectCard product={product} accentHex={accent.hex} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
