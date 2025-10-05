"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ArchivePost } from "@/types/blog";
import { formatDate } from "@/lib/dateUtils";

interface BlogCardProps {
  blog: ArchivePost;
  viewMode: "grid" | "list";
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function BlogCard({ blog, viewMode }: BlogCardProps) {
  return (
    <motion.div variants={fadeIn} className="h-full">
      <Card className="group hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden h-full flex flex-col">
        <Link href={`/blogs/${blog.slug}`} className="h-full flex flex-col">
          {viewMode === "grid" ? (
            <>
              {/* Grid View - Thumbnail on top */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.cover_image || "/avatar.webp"}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Tags overlay */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {blog.postTags?.slice(0, 2).map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="text-xs bg-background/80 backdrop-blur-sm"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] cursor-pointer">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                  {blog.description || blog.subtitle}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{blog.publishedBylines[0]?.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blog.post_date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.ceil(blog.wordcount / 200)} min</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary/10"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* List View - Thumbnail on left */}
              <div className="flex h-full">
                <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
                  <Image
                    src={blog.cover_image || "/avatar.webp"}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Tags overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {blog.postTags?.slice(0, 2).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs bg-background/80 backdrop-blur-sm"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {blog.description || blog.subtitle}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{blog.publishedBylines[0]?.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(blog.post_date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{Math.ceil(blog.wordcount / 200)} min</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary/10"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Link>
      </Card>
    </motion.div>
  );
}
