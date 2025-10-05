"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, HeartIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArchivePost } from "@/types/blog";
import { formatDate } from "@/lib/dateUtils";
import { useEffect, useState } from "react";

interface FeaturedPostsProps {
  posts: ArchivePost[];
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [pinnedIndex, setPinnedIndex] = useState<number>(0);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const featuredPosts = posts.slice(0, 4);
      const randomIndex = Math.floor(Math.random() * featuredPosts.length);
      setPinnedIndex(randomIndex);
    }
  }, [posts]);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Featured Posts</h2>
      <div className="grid grid-cols-1 gap-6">
        {posts.slice(0, 4).map((post, index) => {
          const isPinned = index === pinnedIndex;
          if (!isPinned) return null;
          return (
          <motion.div key={post.id} variants={fadeIn}>
            <Card className="group hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden h-full flex flex-col">
              <Link
                href={`/blogs/${post.slug}`}
                className="h-full grid grid-cols-2 gap-4"
              >
                <div className="relative h-80 w-full overflow-hidden col-span-1">
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
                      className={isPinned ? "bg-orange-500 text-white" : "bg-primary text-primary-foreground"}
                    >
                      {isPinned ? "Pinned" : "Featured"}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 flex justify-center items-center flex-col col-span-1 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <h3 className="font-bold text-3xl line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-xl line-clamp-3">
                      {post.subtitle || post.description}
                    </p>
                  </div>
                  <div className="flex items-center text-md gap-4 text-muted-foreground mt-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      {formatDate(post.post_date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIcon className="h-3 w-3 text-orange-500" />
                      {post.reaction_count || 0}
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
