"use client";

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Blog } from '@/types/blog';
import { 
  BlogHeader, 
  BlogSectionComponent, 
  BlogFAQComponent, 
  BlogCTAComponent, 
  BlogAuthorComponent 
} from './BlogComponents';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface Template3Props {
  blog: Blog;
}

export default function Template3({ blog }: Template3Props) {
  const [readingProgress, setReadingProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
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
          <motion.div 
            variants={fadeIn}
            className="lg:col-span-8 space-y-8"
          >
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-muted-foreground leading-relaxed mb-8 p-6 bg-gradient-to-r from-primary/5 via-muted/30 to-primary/5 rounded-lg border-l-4 border-primary">
                {blog.content.introduction}
              </div>
            </div>

            <div className="space-y-16">
              {blog.content.sections.map((section, index) => (
                <div key={index} id={`section-${index}`} className="scroll-mt-20">
                  <BlogSectionComponent 
                    section={section} 
                    template="blog_3" 
                  />
                </div>
              ))}
            </div>

            <BlogFAQComponent faqs={blog.content.faqs} template="blog_3" />
            <BlogCTAComponent cta={blog.content.cta} template="blog_3" />
          </motion.div>

          <motion.aside 
            variants={fadeIn}
            className="lg:col-span-4 space-y-6"
          >
            <div className="sticky top-8 space-y-6">
              <BlogAuthorComponent author={blog.author} template="blog_3" />
              
              <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Quick Navigation
                </h3>
                <nav className="space-y-3">
                  {blog.content.sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-muted/50"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Reading Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Word Count</span>
                    <span className="font-medium">{blog.metadata.word_count.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Read Time</span>
                    <span className="font-medium">{Math.ceil(blog.metadata.word_count / 200)} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Published</span>
                    <span className="font-medium">{new Date(blog.metadata.publish_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.article>
    </div>
  );
}
