import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blogsDir = path.join(process.cwd(), 'app/api/data/blogs');
    const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.json') && file !== 'schema.json');
    
    for (const file of files) {
      const filePath = path.join(blogsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const blog = JSON.parse(content);
      
      if (blog.slug === params.slug) {
        return NextResponse.json({ blog });
      }
    }

    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
