"use client";

import { motion } from "framer-motion";
import {
  Search,
  MessageSquare,
  ThumbsUp,
  Users,
  BarChart3,
  Clock,
} from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Detailed Product Review",
    description:
      "Thorough product testing and analysis with comprehensive feedback highlighting strengths and improvement areas.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: MessageSquare,
    title: "Constructive Feedback",
    description:
      "Actionable insights to refine your product presentation and attract more upvotes and positive engagement.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    icon: Users,
    title: "Comment Engagement",
    description:
      "Active participation in your Product Hunt discussion to create buzz and drive meaningful conversations.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    icon: ThumbsUp,
    title: "Voting & Promotion",
    description:
      "Strategic upvoting and network engagement to give your launch a significant visibility boost.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    icon: BarChart3,
    title: "Launch Strategy",
    description:
      "Comprehensive launch planning including timing, messaging, and positioning for maximum impact.",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    icon: Clock,
    title: "Continuous Support",
    description:
      "Ongoing assistance throughout your campaign to ensure sustained momentum and success.",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
  },
];

export default function ProductHunterServices() {
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
            What I Offer
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive support to make your Product Hunt launch a success
            with professional services tailored to your needs.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group relative bg-card border border-muted rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className={`w-6 h-6 ${service.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
