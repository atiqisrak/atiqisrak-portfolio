"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "100% Free Service",
  "Professional Review",
  "Active Engagement",
  "Launch Day Support",
  "Post-Launch Assistance",
];

export default function ProductHunterCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 lg:py-16 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Launch?
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don&apos;t let your amazing product go unnoticed. Let&apos;s work
            together to make your Product Hunt launch a success story.
          </p>
        </motion.div>

        {/* Benefits list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-muted rounded-full text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-foreground">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:atiqisrak@gmail.com?subject=Product Hunt Launch Support Request&body=Hi Atiq,%0D%0A%0D%0AI'm interested in your free Product Hunt services. Here are my product details:%0D%0A%0D%0AProduct Name:%0D%0AProduct URL:%0D%0AProduct Hunt URL:%0D%0ALaunch Date:%0D%0A%0D%0AThank you!"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-lg font-semibold group-hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6" />
                <span>Start Your Launch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>
          </a>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          <p>
            Response time: Usually within 24 hours • No strings attached • 100%
            free forever
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
