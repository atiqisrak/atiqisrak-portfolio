"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Tag,
  Clock,
  Home,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArchivePost,
  ArchiveByline,
  BlogSection,
  BlogFAQ,
  BlogCTA,
} from "@/types/blog";
import { useState } from "react";

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

interface BlogHeaderProps {
  blog: ArchivePost;
  template: string;
}

export function BlogHeader({ blog, template }: BlogHeaderProps) {
  return (
    <motion.header variants={fadeIn} className="mb-8">
      <nav className="flex items-center gap-2 text-md text-muted-foreground mb-6 bg-primary/5 p-4 rounded-lg">
        <Link
          href="/"
          className="inline-flex items-center hover:text-primary transition-colors text-primary"
        >
          <Home className="h-4 w-4 mr-1" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/blogs" className="hover:text-primary transition-colors">
          Blogs
        </Link>
        <span>/</span>
        <span className="text-foreground">{blog.title}</span>
      </nav>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {blog.postTags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag.name}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
          {blog.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {blog.description || blog.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{blog.publishedBylines[0]?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(blog.post_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{Math.ceil(blog.wordcount / 200)} min read</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

interface BlogSectionProps {
  section: BlogSection;
  template: string;
}

export function BlogSectionComponent({ section, template }: BlogSectionProps) {
  return (
    <motion.section variants={fadeIn} className="space-y-6">
      <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
        {section.heading}
      </h2>

      <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
        <p>{section.body}</p>
      </div>

      {section.lists.map((list, listIndex) => (
        <div key={listIndex} className="my-6">
          {list.type === "ordered" ? (
            <ol className="list-decimal list-inside space-y-2">
              {list.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-muted-foreground">
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            <ul className="list-disc list-inside space-y-2">
              {list.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {section.tables.map((table, tableIndex) => (
        <div key={tableIndex} className="my-8 overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                {table.headers.map((header, headerIndex) => (
                  <th
                    key={headerIndex}
                    className="border border-border p-3 text-left font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-muted/50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-border p-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {section.images.map((image, imageIndex) => (
        <div key={imageIndex} className="my-8">
          <div className="relative w-full h-64 lg:h-96 rounded-lg overflow-hidden">
            <Image
              src={image.url}
              alt={image.alt_text}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {image.alt_text}
          </p>
        </div>
      ))}
    </motion.section>
  );
}

interface BlogFAQProps {
  faqs: BlogFAQ[];
  template: string;
}

export function BlogFAQComponent({ faqs, template }: BlogFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (faqs.length === 0) return null;

  return (
    <motion.section variants={fadeIn} className="space-y-6">
      <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openItems.has(index);

          return (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors focus:outline-none focus:ring-0"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}

interface BlogCTAProps {
  cta: BlogCTA;
  template: string;
}

export function BlogCTAComponent({ cta, template }: BlogCTAProps) {
  return (
    <motion.section variants={fadeIn} className="my-12">
      <Card className="p-8 text-center bg-primary/5 border-primary/20">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {cta.text}
        </h3>
        <Button asChild size="lg">
          <Link href={cta.url} className="inline-flex items-center gap-2">
            Get Started
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </motion.section>
  );
}

interface BlogAuthorProps {
  author: ArchiveByline;
  template: string;
}

export function BlogAuthorComponent({ author, template }: BlogAuthorProps) {
  return (
    <motion.section variants={fadeIn} className="my-12">
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
            {author.photo_url ? (
              <Image
                src={author.photo_url}
                alt={author.name}
                fill
                className="object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {author.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {author.bio}
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link
                  href={`https://${
                    author.publicationUsers[0]?.publication?.custom_domain ||
                    "atiqisrak.com"
                  }`}
                  className="inline-flex items-center gap-2"
                >
                  View Profile
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              {author.twitter_screen_name && (
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={`https://twitter.com/${author.twitter_screen_name}`}
                    className="inline-flex items-center gap-2"
                  >
                    Twitter
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
