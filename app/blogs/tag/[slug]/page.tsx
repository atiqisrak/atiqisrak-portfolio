import { notFound } from "next/navigation";
import { ArchivePost } from "@/types/blog";
import BlogsClient from "../../BlogsClient";
import Footer from "@/components/Footer";
import BlogNav from "@/components/BlogNav";
import { Home } from "lucide-react";
import Link from "next/link";

interface TagPageProps {
  params: {
    slug: string;
  };
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

// Tag slug to ID mapping for API calls
const tagSlugToId: Record<string, string> = {
  "product-management": "5c645129-c393-4ba0-a298-469c8c38cae2",
  "getting-pm-job": "5e8b673e-d6c1-40eb-9108-e004b66dde9c",
  "product-leadership": "fb85b3a9-b23f-478d-873a-fb0c399431bc",
  "product-growth-podcast": "133669", // This is actually a section, but we'll handle it as a tag
};

// Tag display names
const tagDisplayNames: Record<string, string> = {
  "product-management": "Succeeding as a PM",
  "getting-pm-job": "Getting a PM Job",
  "product-leadership": "Product Leadership",
  "product-growth-podcast": "Product Growth Podcast",
};

async function getHomepageData(): Promise<HomepageData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/homepage`;
    
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage data: ${response.status}`);
    }

    const data = await response.json();
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

export async function generateMetadata({ params }: TagPageProps) {
  const tagSlug = params.slug;
  const tagName = tagDisplayNames[tagSlug] || tagSlug;
  
  return {
    title: `${tagName} - Blog Posts | Atiq Israk`,
    description: `Explore all blog posts about ${tagName} by Atiq Israk. Insights on product management, AI, and technology.`,
    openGraph: {
      title: `${tagName} - Blog Posts`,
      description: `Explore all blog posts about ${tagName} by Atiq Israk.`,
      type: "website",
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const tagSlug = params.slug;
  const tagId = tagSlugToId[tagSlug];
  
  if (!tagId) {
    notFound();
  }

  const tagName = tagDisplayNames[tagSlug] || tagSlug;
  const homepageData = await getHomepageData();

  // Modify searchParams to include the tag filter
  const modifiedSearchParams = {
    ...searchParams,
    post_tag_id: tagId,
  };

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
          <Link
            href="/blogs"
            className="hover:text-primary transition-colors"
          >
            Blogs
          </Link>
          <span>/</span>
          <span className="text-foreground">{tagName}</span>
        </nav>

        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            {tagName}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my thoughts and insights on {tagName.toLowerCase()}
          </p>
        </header>

        <BlogsClient homepageData={homepageData} searchParams={modifiedSearchParams} />
      </div>
      <div className="mt-12 container">
        <Footer />
      </div>
    </div>
  );
}
