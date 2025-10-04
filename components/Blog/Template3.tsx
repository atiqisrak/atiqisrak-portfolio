"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArchivePost } from "@/types/blog";
import {
  BlogHeader,
  BlogSectionComponent,
  BlogFAQComponent,
  BlogCTAComponent,
  BlogAuthorComponent,
} from "./BlogComponents";

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

interface Template3Props {
  blog: ArchivePost;
}

export default function Template3({ blog }: Template3Props) {
  const [readingProgress, setReadingProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

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
        className="max-w-5xl mx-auto py-6 lg:py-12 px-4 pt-8"
      >
        <BlogHeader blog={blog} template="blog_3" />

        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div variants={fadeIn} className="lg:col-span-8 space-y-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-muted-foreground leading-relaxed mb-8 p-6 bg-gradient-to-r from-primary/5 via-muted/30 to-primary/5 rounded-lg border-l-4 border-primary">
                {blog.truncated_body_text || blog.description}
              </div>
            </div>

            {blog.body_html && (
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.body_html }}
              />
            )}

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Read Full Article
              </h3>
              <p className="text-muted-foreground mb-4">
                This is a preview of the article. Read the full content on the
                original platform.
              </p>
              <a
                href={blog.canonical_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Read Full Article
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.aside variants={fadeIn} className="lg:col-span-4 space-y-6">
            <div className="sticky top-8 space-y-6">
              <BlogAuthorComponent
                author={blog.publishedBylines[0]}
                template="blog_3"
              />

              <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Article Info
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize">{blog.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Audience</span>
                    <span className="font-medium capitalize">
                      {blog.audience.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reactions</span>
                    <span className="font-medium">{blog.reaction_count}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Reading Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Word Count</span>
                    <span className="font-medium">
                      {blog.wordcount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Read Time</span>
                    <span className="font-medium">
                      {Math.ceil(blog.wordcount / 200)} min
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Published</span>
                    <span className="font-medium">
                      {new Date(blog.post_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {blog.postTags.length > 0 && (
                <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.postTags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      </motion.article>
    </div>
  );
}
