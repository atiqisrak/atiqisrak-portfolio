import { notFound } from "next/navigation";
import { ArchivePost } from "@/types/blog";
import { getBlogBySlug, getBlogsData } from "@/lib/blogs";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import BlogNav from "@/components/BlogNav";

// Dynamic import for blog template
const Template3 = dynamic(() => import("@/components/Blog/Template3"), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
});

interface BlogPageProps {
  params: { slug: string };
}

async function getBlog(slug: string): Promise<ArchivePost | null> {
  try {
    return await getBlogBySlug(slug);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const result = await getBlogsData();

    // Handle new format with pagination
    if (result && typeof result === "object" && "data" in result) {
      const blogs = (result as { data: ArchivePost[]; pagination: any }).data;
      return blogs.map((blog: ArchivePost) => ({
        slug: blog.slug,
      }));
    }

    // Handle old format
    const blogs = result as ArchivePost[];
    return blogs.map((blog: ArchivePost) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.search_engine_description || blog.description,
    keywords: blog.postTags.map((tag) => tag.name).join(", "),
    authors: [{ name: blog.publishedBylines[0]?.name }],
    openGraph: {
      title: blog.title,
      description: blog.search_engine_description || blog.description,
      type: "article",
      publishedTime: blog.post_date,
      authors: [blog.publishedBylines[0]?.name],
      images: [blog.cover_image],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.search_engine_description || blog.description,
      images: [blog.cover_image],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: blog.title,
    description: blog.search_engine_description || blog.description,
    publishedAt: blog.post_date,
    updatedAt: blog.post_date,
    image: blog.cover_image || "/avatar.webp",
    slug: blog.slug,
    tags: blog.postTags.map((tag) => tag.name),
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: blog.title, url: `/blogs/${blog.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogNav />
      <Template3 blog={blog} />
      <Footer />
    </>
  );
}
