"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArchivePost } from "@/types/blog";
import { Clock, Calendar, Heart, User, ExternalLink } from "lucide-react";
import Image from "next/image";
import HtmlContentRenderer from "./HtmlContentRenderer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

interface Template3Props {
  blog: ArchivePost;
}

export default function Template3({ blog }: Template3Props) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadTime = (wordCount: number) => {
    return Math.ceil(wordCount / 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Minimal Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-muted/30">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary"
          style={{ width: `${readingProgress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      <motion.article
        initial="initial"
        animate="animate"
        variants={stagger}
        className="max-w-6xl mx-auto py-12 px-6"
      >
        {/* Header Section */}
        <motion.header variants={fadeIn} className="mb-16">
          <div className="text-center space-y-8">
            {/* Tags */}
            {blog.postTags && blog.postTags.length > 0 && (
              <div className="flex justify-center gap-2 flex-wrap">
                {blog.postTags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {blog.title}
            </h1>

            {/* Subtitle */}
            {blog.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {blog.subtitle}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.post_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{getReadTime(blog.wordcount)} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{blog.reaction_count || 0} reactions</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Cover Image */}
        {blog.cover_image && (
          <motion.div variants={fadeIn} className="mb-16">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image
                src={blog.cover_image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <motion.div variants={fadeIn} className="lg:col-span-3 space-y-8">
            {/* Description */}
            {blog.truncated_body_text && (
              <div className="prose prose-lg max-w-none">
                <div className="text-lg text-muted-foreground leading-relaxed p-6 bg-muted/30 rounded-xl border border-border/50">
                  {blog.truncated_body_text}
                </div>
              </div>
            )}

            {/* Full Content */}
            {blog.body_html && (
              <HtmlContentRenderer html={blog.body_html} />
            )}

            {/* CTA Section */}
            <motion.div 
              variants={fadeIn}
              className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 text-center"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Read the Full Article
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                This is a preview of the article. Read the complete content with additional insights and examples on the original platform.
              </p>
              <a
                href={blog.canonical_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <span>Continue Reading</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside variants={fadeIn} className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Author */}
              {blog.publishedBylines && blog.publishedBylines.length > 0 && (
                <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Author</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {blog.publishedBylines[0].photo_url && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src="/avatar.webp"
                          alt="Atiq Israk"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">
                        {/* {blog.publishedBylines[0].name} */}
                        Atiq Israk
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {/* @{blog.publishedBylines[0].handle} */}
                        @atiqisrak
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Stats */}
              <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Article Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Words</span>
                    <span className="font-medium text-foreground">
                      {blog.wordcount?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Read Time</span>
                    <span className="font-medium text-foreground">
                      {getReadTime(blog.wordcount)} min
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Published</span>
                    <span className="font-medium text-foreground">
                      {formatDate(blog.post_date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {blog.postTags && blog.postTags.length > 0 && (
                <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.postTags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
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
