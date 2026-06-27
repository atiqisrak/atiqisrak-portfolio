"use client";

import { motion } from "framer-motion";
import {
  companyLabels,
  productsByCompany,
  type Company,
} from "@/lib/content/portfolio";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionShell } from "@/components/shared/SectionShell";
import { fadeUp, fadeUpTransition, staggerContainer } from "@/lib/motion";

const companyOrder: Company[] = ["chromatics", "ether", "navana"];

export function Projects() {
  return (
    <SectionShell id="projects" ariaLabel="Product portfolio">
      <SectionHeading eyebrow="Portfolio" title="15+ products shipped" />
      <div className="mt-10 space-y-12">
        {companyOrder.map((company) => (
          <div key={company}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {companyLabels[company]}
            </h3>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid gap-4 lg:grid-cols-2 lg:gap-6"
            >
              {productsByCompany[company].map((product) => (
                <motion.div
                  key={product.slug}
                  variants={fadeUp}
                  transition={fadeUpTransition}
                >
                  <ProjectCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
