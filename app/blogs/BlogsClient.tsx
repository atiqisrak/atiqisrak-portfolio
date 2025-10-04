"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Grid,
  List,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Blog, BlogTemplate, BlogResponse, BlogFilters } from "@/types/blog";

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

interface BlogsClientProps {
  initialBlogs: Blog[];
}

export default function BlogsClient({ initialBlogs }: BlogsClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTemplate, setSelectedTemplate] =
    useState<BlogTemplate>("blog_3");
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<BlogFilters>({
    search: "",
    tags: "",
    author: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "date",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: initialBlogs.length,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchBlogs = useCallback(async (newFilters: BlogFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/blogs?${params.toString()}`);
      const data: BlogResponse = await response.json();

      setBlogs(data.blogs);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(
      "Blogs: ",
      blogs?.map((blog) => blog.metadata.seo.schema_markup?.properties?.image)
    );
  }, [blogs]);

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value, page: 1 };
    setFilters(newFilters);
    fetchBlogs(newFilters);
  };

  const handleFilterChange = (key: keyof BlogFilters, value: string) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    fetchBlogs(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    fetchBlogs(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: BlogFilters = {
      search: "",
      tags: "",
      author: "",
      dateFrom: "",
      dateTo: "",
      sortBy: "date",
      sortOrder: "desc",
      page: 1,
      limit: 10,
    };
    setFilters(clearedFilters);
    fetchBlogs(clearedFilters);
  };

  const getAllTags = () => {
    const allTags = new Set<string>();
    initialBlogs.forEach((blog) => {
      blog.metadata.tags.forEach((tag) => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  };

  return (
    <>
      {/* Search and Filter Header */}
      <motion.div variants={fadeIn} className="space-y-6 mb-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search blogs by title, description, or tags..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filter Toggle and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-foreground">
              All Posts ({pagination.totalCount})
            </h2>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              aria-label="Switch to grid view"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              aria-label="Switch to list view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border border-border rounded-lg bg-muted/50"
          >
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="word_count">Word Count</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  handleFilterChange("sortOrder", e.target.value)
                }
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <select
                value={filters.tags}
                onChange={(e) => handleFilterChange("tags", e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="">All Tags</option>
                {getAllTags().map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Author
              </label>
              <input
                type="text"
                placeholder="Filter by author..."
                value={filters.author}
                onChange={(e) => handleFilterChange("author", e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground mt-2">Loading blogs...</p>
        </div>
      )}

      {/* Blogs Grid/List */}
      {!loading && (
        <motion.div
          variants={stagger}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {blogs.map((blog, index) => (
            <motion.div key={blog.id} variants={fadeIn} className="h-full">
              <Card className="group hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden h-full flex flex-col">
                <Link
                  href={`/blogs/${blog.slug}?template=${selectedTemplate}`}
                  className="h-full flex flex-col"
                >
                  {viewMode === "grid" ? (
                    <>
                      {/* Grid View - Thumbnail on top */}
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={
                            blog.metadata.seo.schema_markup?.properties?.image
                              ? blog.metadata.seo.schema_markup?.properties
                                  ?.image
                              : "/avatar.webp"
                          }
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* Tags overlay */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {blog.metadata.tags
                            .slice(0, 2)
                            .map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="secondary"
                                className="text-xs bg-background/80 backdrop-blur-sm"
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] cursor-pointer">
                          {blog.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                          {blog.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{blog.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(
                                  blog.metadata.publish_date
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {Math.ceil(blog.metadata.word_count / 200)} min
                            </span>
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
                            src={blog.metadata.seo.image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 200px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                          {/* Tags overlay */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                            {blog.metadata.tags
                              .slice(0, 2)
                              .map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="text-xs bg-background/80 backdrop-blur-sm"
                                >
                                  {tag}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {blog.title}
                          </h3>

                          <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                            {blog.description}
                          </p>

                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{blog.author.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(
                                    blog.metadata.publish_date
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {Math.ceil(blog.metadata.word_count / 200)} min
                              </span>
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
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
        <motion.div variants={fadeIn} className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No blogs found matching your criteria.
          </p>
          <Button variant="outline" onClick={clearFilters} className="mt-4">
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <motion.div
          variants={fadeIn}
          className="flex justify-center items-center gap-2 mt-8"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from(
              { length: Math.min(5, pagination.totalPages) },
              (_, i) => {
                const pageNum = Math.max(1, pagination.currentPage - 2) + i;
                if (pageNum > pagination.totalPages) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={
                      pageNum === pagination.currentPage ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              }
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </>
  );
}
