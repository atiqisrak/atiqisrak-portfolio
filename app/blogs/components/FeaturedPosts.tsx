"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArchivePost } from "@/types/blog";
import { formatDate } from "@/lib/dateUtils";

interface FeaturedPostsProps {
  posts: ArchivePost[];
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <motion.div key={post.id} variants={fadeIn}>
            <Card className="group hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden h-full flex flex-col">
              <Link
                href={`/blogs/${post.slug}`}
                className="h-full flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.cover_image || "/avatar.webp"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-primary text-primary-foreground"
                    >
                      Featured
                    </Badge>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {post.subtitle || post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.post_date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>❤</span>
                      {post.reaction_count || 0}
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
