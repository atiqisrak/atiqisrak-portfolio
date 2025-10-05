"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { ArchivePost, BlogTemplate, BlogFilters } from "@/types/blog";
import BlogCard from "./components/BlogCard";
import FeaturedPosts from "./components/FeaturedPosts";
import TopPosts from "./components/TopPosts";
import BlogFiltersComponent from "./components/BlogFilters";
import ContentBlocks from "./components/ContentBlocks";

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

interface InfiniteScrollMeta {
  totalCount: number;
  limit: number;
  hasMore: boolean;
  currentPage: number;
}

interface HomepageData {
  newPosts: ArchivePost[];
  pinnedPosts: ArchivePost[];
  topPosts: ArchivePost[];
  contentBlockData: {
    postsBySectionId: Record<string, ArchivePost[]>;
    postsByTagId: Record<string, ArchivePost[]>;
  };
  recommendations: any[];
}

interface BlogsClientProps {
  homepageData: HomepageData;
  searchParams: {
    search?: string;
    tags?: string;
    author?: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    limit?: string;
    post_tag_id?: string;
  };
}

export default function BlogsClient({
  homepageData,
  searchParams,
}: BlogsClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTemplate, setSelectedTemplate] =
    useState<BlogTemplate>("blog_3");
  const [blogs, setBlogs] = useState<ArchivePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<BlogFilters>({
    search: searchParams.search || "",
    tags: searchParams.tags || "",
    author: searchParams.author || "",
    dateFrom: searchParams.dateFrom || "",
    dateTo: searchParams.dateTo || "",
    sortBy: (searchParams.sortBy as "date" | "title" | "word_count") || "date",
    sortOrder: (searchParams.sortOrder as "asc" | "desc") || "desc",
    page: parseInt(searchParams.page || "1"),
    limit: parseInt(searchParams.limit || "21"),
  });

  // Handle tag filtering from URL (for tag pages)
  const tagParam = searchParams.post_tag_id;

  // Effect to handle initial data loading
  useEffect(() => {
    if (tagParam) {
      // If we're on a tag page, fetch filtered results
      const customParams: { post_tag_id?: string } = {};
      if (tagParam) customParams.post_tag_id = tagParam;
      
      fetchBlogs(filters, false, customParams);
    } else {
      // If we're on the main blogs page, show homepage data
      setBlogs(homepageData.newPosts || []);
      setMeta({
        totalCount: homepageData.newPosts?.length || 0,
        limit: filters.limit || 21,
        hasMore: false,
        currentPage: 1,
      });
    }
  }, [tagParam, homepageData.newPosts]);
  const [meta, setMeta] = useState<InfiniteScrollMeta>({
    totalCount: homepageData.newPosts?.length || 0,
    limit: filters.limit || 21,
    hasMore: false,
    currentPage: 1,
  });

  const fetchBlogs = useCallback(
    async (newFilters: BlogFilters, isLoadMore = false, customParams?: { post_tag_id?: string }) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        
        // Use current page for load more, or page 1 for initial load
        const currentPage = isLoadMore ? meta.currentPage + 1 : 1;
        
        // Build params with current page
        Object.entries(newFilters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            if (key === 'page') {
              params.append(key, currentPage.toString());
            } else {
              params.append(key, value.toString());
            }
          }
        });

        // Add custom parameters for tag filtering
        if (customParams?.post_tag_id) {
          params.append("post_tag_id", customParams.post_tag_id);
        }

        const response = await fetch(`/api/archive?${params.toString()}`);
        const result = await response.json();

        // The archive API now returns an array directly
        const resultArray = Array.isArray(result) ? result : [];
        const hasMore = resultArray.length === (newFilters.limit || 21);
        
        if (isLoadMore) {
          setBlogs((prev) => [...prev, ...resultArray]);
        } else {
          setBlogs(resultArray);
        }
        setMeta({
          totalCount: isLoadMore ? meta.totalCount + resultArray.length : resultArray.length,
          limit: newFilters.limit || 21,
          hasMore,
          currentPage,
        });
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    },
    [meta.currentPage]
  );

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    fetchBlogs(newFilters);
  };

  const handleFilterChange = (key: keyof BlogFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchBlogs(newFilters);
  };

  const loadMore = () => {
    if (meta.hasMore && !loading) {
      fetchBlogs(filters, true);
    }
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
      limit: 21,
    };
    setFilters(clearedFilters);
    fetchBlogs(clearedFilters);
  };

  const getAllTags = () => {
    const allTags = new Set<string>();
    blogs.forEach((blog) => {
      blog.postTags?.forEach((tag) => allTags.add(tag.name));
    });
    return Array.from(allTags).sort();
  };

  return (
    <>
      <motion.div variants={fadeIn} className="space-y-8 mb-8">
        {/* Featured Posts Section - only show on main blogs page */}
        {!tagParam && <FeaturedPosts posts={homepageData.topPosts || []} />}

        {/* Top Posts Section - only show on main blogs page */}
        {!tagParam && <TopPosts posts={homepageData.topPosts || []} />}

        {/* Content Blocks Section - only show on main blogs page */}
        {!tagParam && <ContentBlocks contentBlockData={homepageData.contentBlockData} />}

        {/* Search and Filters */}
        <div className="space-y-4">
          <BlogFiltersComponent
            filters={filters}
            showFilters={showFilters}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onClearFilters={clearFilters}
            allTags={getAllTags()}
            totalCount={meta.totalCount}
          />

          <div className="flex items-center justify-end gap-2">
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
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} viewMode={viewMode} />
          ))}
        </motion.div>
      )}

      {/* Load More Button */}
      {!loading && blogs.length > 0 && meta.hasMore && (
        <motion.div variants={fadeIn} className="text-center py-8">
          <Button
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="px-8 py-3"
          >
            Load More Posts
          </Button>
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
    </>
  );
}
