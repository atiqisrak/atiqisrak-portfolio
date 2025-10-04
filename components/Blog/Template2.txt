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

interface Template2Props {
  blog: Blog;
}

export default function Template2({ blog }: Template2Props) {
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
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
        className="max-w-6xl mx-auto py-6 lg:py-12 px-4 pt-8"
      >
        <BlogHeader blog={blog} template="blog_2" />

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div variants={fadeIn} className="lg:col-span-2 space-y-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-muted-foreground leading-relaxed mb-8 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                {blog.content.introduction}
              </div>
            </div>

            <div className="space-y-12">
              {blog.content.sections.map((section, index) => (
                <BlogSectionComponent
                  key={index}
                  section={section}
                  template="blog_2"
                />
              ))}
            </div>

            <BlogFAQComponent faqs={blog.content.faqs} template="blog_2" />
            <BlogCTAComponent cta={blog.content.cta} template="blog_2" />
          </motion.div>

          <motion.aside variants={fadeIn} className="lg:col-span-1 space-y-6">
            <div className="sticky top-8">
              <BlogAuthorComponent author={blog.author} template="blog_2" />

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {blog.content.sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.article>
    </div>
  );
}
