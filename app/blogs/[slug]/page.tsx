import { notFound } from 'next/navigation';
import { Blog } from '@/types/blog';
import Template1 from '@/components/Blog/Template1';
import Template2 from '@/components/Blog/Template2';
import Template3 from '@/components/Blog/Template3';

interface BlogPageProps {
  params: { slug: string };
  searchParams: { template?: string };
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3054';
    const response = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3054';
    const response = await fetch(`${baseUrl}/api/blogs`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.blogs?.map((blog: Blog) => ({
      slug: blog.slug,
    })) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: blog.metadata.seo.meta_title,
    description: blog.metadata.seo.meta_description,
    keywords: blog.keywords.join(', '),
    authors: [{ name: blog.author.name }],
    openGraph: {
      title: blog.metadata.seo.meta_title,
      description: blog.metadata.seo.meta_description,
      type: 'article',
      publishedTime: blog.metadata.publish_date,
      authors: [blog.author.name],
      images: blog.content.sections
        .flatMap(section => section.images)
        .map(image => image.url),
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metadata.seo.meta_title,
      description: blog.metadata.seo.meta_description,
      images: blog.content.sections
        .flatMap(section => section.images)
        .map(image => image.url),
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const blog = await getBlog(params.slug);
  const template = (searchParams.template as 'blog_1' | 'blog_2' | 'blog_3') || 'blog_1';

  if (!blog) {
    notFound();
  }

  const TemplateComponent = {
    blog_1: Template1,
    blog_2: Template2,
    blog_3: Template3,
  }[template];

  return <TemplateComponent blog={blog} />;
}
