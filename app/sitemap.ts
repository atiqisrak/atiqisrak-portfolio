import { MetadataRoute } from 'next';
import { getBlogsData } from '@/lib/blogs';
import projectsData from './projects/data.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://atiqisrak.vercel.app';
  
  // Get blog data for dynamic blog pages
  const blogs = await getBlogsData();
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/producthunter`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
  ];

  // Dynamic blog pages
  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.metadata.publish_date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic project pages
  const projectPages = Object.keys(projectsData).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogPages, ...projectPages];
}
