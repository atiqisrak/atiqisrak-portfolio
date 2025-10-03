"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { type Project } from "./types";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProjectContent({ project }: { project: Project }) {
  return (
    <motion.article
      initial="initial"
      animate="animate"
      variants={stagger}
      className="max-w-4xl mx-auto py-6 lg:py-12 px-4"
    >
      {/* Back button */}
      <motion.div variants={fadeIn} className="mb-6">
        <Link
          href="/#projects"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Back to Projects</span>
        </Link>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className="relative h-[250px] lg:h-[400px] w-full mb-8 lg:mb-12 rounded-lg overflow-hidden group"
      >
        <Image
          src={project.banner}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
          <motion.h1
            variants={fadeIn}
            className="text-2xl lg:text-4xl font-bold text-foreground mb-4"
          >
            {project.title}
          </motion.h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <motion.div
          variants={fadeIn}
          className="lg:col-span-2 space-y-6 lg:space-y-8"
        >
          <section>
            <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-primary">
              Overview
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
              {project.overview}
            </p>
          </section>

          <section>
            <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-primary">
              Challenge
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
              {project.challenge}
            </p>
          </section>

          <section>
            <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-primary">
              Solution
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.solution}
            </p>
          </section>

          <section>
            <h2 className="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4 text-primary">
              Impact
            </h2>
            <ul className="space-y-2 lg:space-y-3">
              {project.impact.map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeIn}
                  className="flex items-start"
                >
                  <span className="inline-block w-1.5 lg:w-2 h-1.5 lg:h-2 mt-2 mr-3 bg-primary rounded-full" />
                  <span className="text-sm lg:text-base text-muted-foreground">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </section>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-6 lg:space-y-8">
          <section className="bg-card p-4 lg:p-6 rounded-lg border border-border">
            <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-primary">
              Technical Details
            </h2>
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h3 className="font-medium mb-2 lg:mb-3 text-foreground text-sm lg:text-base">
                  Architecture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technicalDetails.architecture.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs lg:text-sm bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2 lg:mb-3 text-foreground text-sm lg:text-base">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technicalDetails.technologies.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs lg:text-sm bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card p-4 lg:p-6 rounded-lg border border-border">
            <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4 text-primary">
              Process & Methodology
            </h2>
            <ul className="space-y-2 lg:space-y-3">
              {project.processAndMethodology.map((item, index) => (
                <motion.li
                  key={index}
                  variants={fadeIn}
                  className="flex items-start"
                >
                  <span className="inline-block w-1.5 h-1.5 mt-2 mr-3 bg-primary rounded-full" />
                  <span className="text-sm lg:text-base text-muted-foreground">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </section>
        </motion.div>
      </div>
    </motion.article>
  );
}
