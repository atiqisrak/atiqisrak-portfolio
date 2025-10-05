"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArchivePost } from "@/types/blog";
import { formatDate } from "@/lib/dateUtils";

interface ContentBlocksProps {
  contentBlockData: {
    postsBySectionId: Record<string, ArchivePost[]>;
    postsByTagId: Record<string, ArchivePost[]>;
  };
}

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

// Tag mappings with proper slugs for SEO-friendly URLs
const tagMappings: Record<string, { name: string; slug: string }> = {
  "5c645129-c393-4ba0-a298-469c8c38cae2": { name: "Succeeding as a PM", slug: "product-management" },
  "5e8b673e-d6c1-40eb-9108-e004b66dde9c": { name: "Getting a PM Job", slug: "getting-pm-job" },
  "fb85b3a9-b23f-478d-873a-fb0c399431bc": { name: "Product Leadership", slug: "product-leadership" },
};

// Section mappings with proper slugs for SEO-friendly URLs
const sectionMappings: Record<string, { name: string; slug: string }> = {
  "133669": { name: "Product Growth Podcast", slug: "product-growth-podcast" },
  "93815": { name: "Getting a PM Job", slug: "getting-pm-job" },
};

export default function ContentBlocks({ contentBlockData }: ContentBlocksProps) {
  const { postsBySectionId, postsByTagId } = contentBlockData;

  const renderSectionBlock = (sectionId: string, posts: ArchivePost[]) => {
    if (!posts || posts.length === 0) return null;
    
    const sectionMapping = sectionMappings[sectionId];
    const sectionName = sectionMapping?.name || `Section ${sectionId}`;
    const sectionSlug = sectionMapping?.slug || `section-${sectionId}`;

    return (
      <motion.div key={sectionId} variants={fadeIn} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{sectionName}</h2>
          <Link 
            className="text-sm text-muted-foreground hover:text-primary" 
            href={`/blogs/tag/${sectionSlug}`}
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.slice(0, 6).map((post) => (
            <Card key={post.id} className="group hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.cover_image || "/avatar.webp"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {post.subtitle || post.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span>❤</span>
                      {post.reaction_count || 0}
                    </div>
                    <span>{formatDate(post.post_date)}</span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderTagBlock = (tagId: string, posts: ArchivePost[]) => {
    if (!posts || posts.length === 0) return null;
    
    const tagMapping = tagMappings[tagId];
    const tagName = tagMapping?.name || `Tag ${tagId}`;
    const tagSlug = tagMapping?.slug || tagId;

    return (
      <motion.div key={tagId} variants={fadeIn} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{tagName}</h2>
          <Link 
            className="text-sm text-muted-foreground hover:text-primary" 
            href={`/blogs/tag/${tagSlug}`}
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.slice(0, 8).map((post) => (
            <Card key={post.id} className="group hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden">
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={post.cover_image || "/avatar.webp"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span>❤</span>
                      {post.reaction_count || 0}
                    </div>
                    <span>{formatDate(post.post_date)}</span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  };

  const hasContent = Object.keys(postsBySectionId).length > 0 || Object.keys(postsByTagId).length > 0;

  if (!hasContent) return null;

  return (
    <motion.div variants={stagger} className="space-y-8">
      {/* Render sections */}
      {/* {Object.entries(postsBySectionId).map(([sectionId, posts]) => 
        renderSectionBlock(sectionId, posts)
      )} */}
      
      {/* Render tags */}
      {Object.entries(postsByTagId).map(([tagId, posts]) => 
        renderTagBlock(tagId, posts)
      )}
    </motion.div>
  );
}
