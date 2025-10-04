"use client";

import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Globe } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Community First",
    description:
      "Building a strong ecosystem of innovative products and creators is my passion and mission.",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
  {
    icon: Users,
    title: "Supporting Entrepreneurs",
    description:
      "Helping more creators bring their ideas to life and succeed in their entrepreneurial journey.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Lightbulb,
    title: "Innovation Matters",
    description:
      "Great products deserve to be discovered, regardless of budget constraints or marketing resources.",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "Creating a more accessible and inclusive startup ecosystem where everyone has a chance to succeed.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
];

export default function ProductHunterWhyFree() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 lg:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Am I Offering This{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              For Free?
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My mission goes beyond individual success - I believe in creating a
            thriving ecosystem where innovation can flourish.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group flex items-start gap-4 p-6 bg-card border border-muted rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${reason.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <reason.icon className={`w-6 h-6 ${reason.color}`} />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8 lg:p-12"
        >
          <blockquote className="text-xl lg:text-2xl font-medium text-foreground mb-6 leading-relaxed">
            &ldquo;Every great product deserves to be discovered. By offering
            these services for free, I&apos;m investing in the future of
            innovation and helping build a more inclusive startup
            ecosystem.&rdquo;
          </blockquote>
          <cite className="text-muted-foreground">
            — Atiq Israk, Product Manager & Community Builder
          </cite>
        </motion.div>
      </div>
    </motion.section>
  );
}
