import { Home } from "lucide-react";
import Link from "next/link";
import { Blog, BlogTemplate } from "@/types/blog";
import BlogsClient from "./BlogsClient";

async function getBlogs(): Promise<Blog[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-6 lg:py-12 px-4">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/"
              className="inline-flex items-center hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-foreground">Blogs</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <Home className="h-4 w-4 mr-2" />
            <span>Go to Homepage</span>
          </Link>
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

        <BlogsClient initialBlogs={blogs} />
      </div>
    </div>
  );
}
