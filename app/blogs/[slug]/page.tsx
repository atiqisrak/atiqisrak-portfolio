import { notFound } from "next/navigation";
import { Blog } from "@/types/blog";
import { getBlogBySlug, getBlogsData } from "@/lib/blogs";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import BlogNav from "@/components/BlogNav";

// Dynamic imports for blog templates
const Template1 = dynamic(() => import("@/components/Blog/Template1"), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
});
const Template2 = dynamic(() => import("@/components/Blog/Template2"), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
});
const Template3 = dynamic(() => import("@/components/Blog/Template3"), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
});

interface BlogPageProps {
  params: { slug: string };
  searchParams: { template?: string };
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    return await getBlogBySlug(slug);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await getBlogsData();
    return blogs.map((blog: Blog) => ({
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
    title: blog.metadata.seo.meta_title,
    description: blog.metadata.seo.meta_description,
    keywords: blog.keywords.join(", "),
    authors: [{ name: blog.author.name }],
    openGraph: {
      title: blog.metadata.seo.meta_title,
      description: blog.metadata.seo.meta_description,
      type: "article",
      publishedTime: blog.metadata.publish_date,
      authors: [blog.author.name],
      images: blog.content.sections
        .flatMap((section) => section.images)
        .map((image) => image.url),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metadata.seo.meta_title,
      description: blog.metadata.seo.meta_description,
      images: blog.content.sections
        .flatMap((section) => section.images)
        .map((image) => image.url),
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const blog = await getBlog(params.slug);
  const template =
    (searchParams.template as "blog_1" | "blog_2" | "blog_3") || "blog_1";

  if (!blog) {
    notFound();
  }

  const TemplateComponent = {
    blog_1: Template1,
    blog_2: Template2,
    blog_3: Template3,
  }[template];

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: blog.title,
    description: blog.metadata.seo.meta_description,
    publishedAt: blog.metadata.publish_date,
    updatedAt: blog.metadata.publish_date,
    image: blog.metadata.seo.schema_markup?.properties?.image || "/avatar.webp",
    slug: blog.slug,
    tags: blog.metadata.tags,
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
      <TemplateComponent blog={blog} />
      <Footer />
    </>
  );
}
