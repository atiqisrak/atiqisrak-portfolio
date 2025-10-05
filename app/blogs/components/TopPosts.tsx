"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArchivePost } from "@/types/blog";
import { formatDate } from "@/lib/dateUtils";

interface TopPostsProps {
  posts: ArchivePost[];
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function TopPosts({ posts }: TopPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Most Popular</h2>
      <Link className="text-sm text-muted-foreground hover:text-primary" href="/blogs">View All</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {posts.slice(0, 4).map((post, index) => (
          <motion.div key={post.id} variants={fadeIn} className="relative">
            <Card className="group hover:shadow-lg cursor-pointer transition-all 
            duration-300 overflow-hidden h-32 flex flex-col rounded-sm">
              <Link
                href={`/blogs/${post.slug}`}
                className="h-full grid grid-cols-2 gap-2"
              >
                <div className="p-3 flex flex-col justify-center h-full">
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
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
                </div>
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
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
