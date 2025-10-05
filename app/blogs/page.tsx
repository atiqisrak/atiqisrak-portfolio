import { Home } from "lucide-react";
import Link from "next/link";
import { ArchivePost } from "@/types/blog";
import BlogsClient from "./BlogsClient";
import Footer from "@/components/Footer";
import BlogNav from "@/components/BlogNav";

interface BlogsPageProps {
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

async function getHomepageData(): Promise<HomepageData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/homepage`;
    console.log("Fetching from:", apiUrl);
    
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage data: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      newPosts: [],
      pinnedPosts: [],
      topPosts: [],
      contentBlockData: {
        postsBySectionId: {},
        postsByTagId: {},
      },
      recommendations: [],
    };
  }
}


export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  console.log("Starting to fetch homepage data...");
  const homepageData = await getHomepageData();
  console.log("Final Homepage Data:", homepageData);

  return (
    <div className="min-h-screen bg-background">
      <BlogNav />
      <div className="max-w-7xl mx-auto py-6 lg:py-12 px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link
            href="/"
            className="inline-flex items-center hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-foreground">Blogs</span>
        </nav>

        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Blog & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my thoughts on product management, AI, and technology
            through different perspectives and design approaches.
          </p>
        </header>

        <BlogsClient homepageData={homepageData} searchParams={searchParams} />
      </div>
      <div className="mt-12 container">
        <Footer />
      </div>
    </div>
  );
}
