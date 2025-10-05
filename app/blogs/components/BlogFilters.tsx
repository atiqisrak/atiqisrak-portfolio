"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { BlogFilters as BlogFiltersType } from "@/types/blog";
import Link from "next/link";

interface BlogFiltersProps {
  filters: BlogFiltersType;
  showFilters: boolean;
  onSearch: (value: string) => void;
  onFilterChange: (key: keyof BlogFiltersType, value: string) => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
  allTags: string[];
  totalCount: number;
}

export default function BlogFilters({
  filters,
  showFilters,
  onSearch,
  onFilterChange,
  onToggleFilters,
  onClearFilters,
  allTags,
  totalCount,
}: BlogFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          placeholder="Search blogs by title, description, or tags..."
          value={filters.search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Filter Toggle and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            All Posts ({totalCount})
          </h2>
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={onToggleFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <Link className="text-sm text-muted-foreground hover:text-primary" href="/blogs/all-posts">View All</Link>
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
              onChange={(e) => onFilterChange("sortBy", e.target.value)}
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
              onChange={(e) => onFilterChange("sortOrder", e.target.value)}
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
              onChange={(e) => onFilterChange("tags", e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
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
              onChange={(e) => onFilterChange("author", e.target.value)}
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
              onChange={(e) => onFilterChange("dateFrom", e.target.value)}
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
              onChange={(e) => onFilterChange("dateTo", e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
