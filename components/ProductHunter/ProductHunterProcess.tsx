"use client";

import { motion } from "framer-motion";
import { Send, TestTube, Calendar, MessageCircle } from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: Send,
    title: "Submit Your Product",
    description:
      "Provide your product details and Product Hunt listing URL. I'll review your submission and confirm our collaboration.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    step: 2,
    icon: TestTube,
    title: "Product Testing & Review",
    description:
      "I'll thoroughly test your product, analyze its features, and compile a detailed review with actionable feedback.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    step: 3,
    icon: Calendar,
    title: "Launch Day Engagement",
    description:
      "On your launch day, I'll actively comment, engage with users, and ensure maximum visibility for your product.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    step: 4,
    icon: MessageCircle,
    title: "Post-Launch Support",
    description:
      "I'll continue supporting your product by responding to comments and providing additional feedback as needed.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
];

export default function ProductHunterProcess() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 lg:py-16 bg-muted/30"
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
            How It Works
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A simple, streamlined process designed to maximize your Product Hunt
            success with minimal effort from your side.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 dark:from-blue-800 dark:via-green-800 dark:to-purple-800 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-4 bg-background border-4 border-primary rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {step.step}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-card border border-muted rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline indicator for mobile */}
        <div className="lg:hidden mt-8 flex justify-center">
          <div className="flex space-x-2">
            {processSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === 0 ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
