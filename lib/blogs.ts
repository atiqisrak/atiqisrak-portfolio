import fs from 'fs';
import path from 'path';
import { Blog } from '@/types/blog';

export async function getBlogsData(): Promise<Blog[]> {
  try {
    const blogsDir = path.join(process.cwd(), 'app/api/data/blogs');
    const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.json') && file !== 'schema.json');
    
    const blogs: Blog[] = files.map(file => {
      const filePath = path.join(blogsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    });

    return blogs;
  } catch (error) {
    console.error('Error loading blogs data:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const blogs = await getBlogsData();
    return blogs.find(blog => blog.slug === slug) || null;
  } catch (error) {
    console.error('Error loading blog by slug:', error);
    return null;
  }
}
