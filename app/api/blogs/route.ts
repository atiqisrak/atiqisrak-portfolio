import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  author: {
    name: string;
    bio: string;
    profile_url: string;
  };
  metadata: {
    publish_date: string;
    platform: string;
    word_count: number;
    tags: string[];
  };
  status: string;
  published_at: string;
  template: string;
}

interface QueryParams {
  search?: string;
  tags?: string;
  category?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'date' | 'title' | 'word_count';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params: QueryParams = {
      search: searchParams.get('search') || undefined,
      tags: searchParams.get('tags') || undefined,
      category: searchParams.get('category') || undefined,
      author: searchParams.get('author') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      sortBy: (searchParams.get('sortBy') as 'date' | 'title' | 'word_count') || 'date',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20')
    };

    const blogsDir = path.join(process.cwd(), 'app/api/data/blogs');
    const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.json') && file !== 'schema.json');
    
    let blogs: Blog[] = files.map(file => {
      const filePath = path.join(blogsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    });

    // Apply search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      blogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.description.toLowerCase().includes(searchTerm) ||
        blog.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
        blog.metadata.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply tag filter
    if (params.tags) {
      const filterTags = params.tags.split(',').map(tag => tag.trim().toLowerCase());
      blogs = blogs.filter(blog => 
        filterTags.some(filterTag => 
          blog.metadata.tags.some(tag => tag.toLowerCase().includes(filterTag))
        )
      );
    }

    // Apply author filter
    if (params.author) {
      const authorName = params.author.toLowerCase();
      blogs = blogs.filter(blog => 
        blog.author.name.toLowerCase().includes(authorName)
      );
    }

    // Apply date range filter
    if (params.dateFrom || params.dateTo) {
      blogs = blogs.filter(blog => {
        const publishDate = new Date(blog.metadata.publish_date);
        if (params.dateFrom && publishDate < new Date(params.dateFrom)) return false;
        if (params.dateTo && publishDate > new Date(params.dateTo)) return false;
        return true;
      });
    }

    // Apply sorting
    blogs.sort((a, b) => {
      let comparison = 0;
      
      switch (params.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'word_count':
          comparison = a.metadata.word_count - b.metadata.word_count;
          break;
        case 'date':
        default:
          comparison = new Date(a.metadata.publish_date).getTime() - new Date(b.metadata.publish_date).getTime();
          break;
      }
      
      return params.sortOrder === 'asc' ? comparison : -comparison;
    });

    // Apply pagination
    const totalCount = blogs.length;
    const totalPages = Math.ceil(totalCount / params.limit!);
    const startIndex = (params.page! - 1) * params.limit!;
    const endIndex = startIndex + params.limit!;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);

    const response = NextResponse.json({
      blogs: paginatedBlogs,
      pagination: {
        currentPage: params.page,
        totalPages,
        totalCount,
        limit: params.limit,
        hasNextPage: params.page! < totalPages,
        hasPrevPage: params.page! > 1
      }
    });

    // Add cache headers
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    return response;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
