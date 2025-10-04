"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Blog } from "@/types/blog";
import {
  BlogHeader,
  BlogSectionComponent,
  BlogFAQComponent,
  BlogCTAComponent,
  BlogAuthorComponent,
} from "./BlogComponents";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

interface Template1Props {
  blog: Blog;
}

export default function Template1({ blog }: Template1Props) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <motion.article
        initial="initial"
        animate="animate"
        variants={stagger}
        className="max-w-4xl mx-auto py-6 lg:py-12 px-4 pt-8"
      >
        <BlogHeader blog={blog} template="blog_1" />

        <motion.div variants={fadeIn} className="prose prose-lg max-w-none">
          <div className="text-xl text-muted-foreground leading-relaxed mb-8 p-6 bg-muted/30 rounded-lg border-l-4 border-primary">
            {blog.content.introduction}
          </div>
        </motion.div>

        <div className="space-y-12">
          {blog.content.sections.map((section, index) => (
            <BlogSectionComponent
              key={index}
              section={section}
              template="blog_1"
            />
          ))}
        </div>

        <BlogFAQComponent faqs={blog.content.faqs} template="blog_1" />
        <BlogCTAComponent cta={blog.content.cta} template="blog_1" />
        <BlogAuthorComponent author={blog.author} template="blog_1" />
      </motion.article>
    </div>
  );
}
