"use client";

import { motion } from "framer-motion";
import { Rocket, Target, TrendingUp } from "lucide-react";

export default function ProductHunterHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative py-12 lg:py-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-purple-50/50 dark:from-orange-950/20 dark:via-transparent dark:to-purple-950/20" />

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium mb-6"
        >
          <Rocket className="w-4 h-4" />
          <span>Free Product Hunt Services</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
        >
          Get Your Product{" "}
          <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            Noticed
          </span>{" "}
          on Product Hunt
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Professional review, engagement, and promotion services to help your
          product launch succeed - completely free!
        </motion.p>

        {/* Key benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Strategic Review
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Detailed product analysis and optimization recommendations
            </p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Active Engagement
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Comment engagement and community building on launch day
            </p>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
              <Rocket className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Launch Support
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Complete launch strategy and ongoing promotion
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
