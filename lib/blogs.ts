import { ArchivePost, Blog, BlogFilters } from '@/types/blog';

export async function getBlogsData(filters?: BlogFilters): Promise<ArchivePost[] | { data: ArchivePost[]; pagination: any }> {
  try {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value.toString());
        }
      });
    } else {
      params.append('limit', '10');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/archive?${params.toString()}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Return the new format with pagination if available
    if (result && typeof result === 'object' && 'data' in result && 'pagination' in result) {
      return result;
    }
    
    // Fallback for old format
    return result as ArchivePost[];
  } catch (error) {
    console.error('Error loading blogs data:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<ArchivePost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/archive/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }
    
    const blog: ArchivePost = await response.json();
    return blog;
  } catch (error) {
    console.error('Error loading blog by slug:', error);
    return null;
  }
}

// Helper function to convert ArchivePost to legacy Blog format for backward compatibility
export function convertArchivePostToBlog(post: ArchivePost): Blog {
  const author = post.publishedBylines[0];
  
  return {
    id: post.id.toString(),
    slug: post.slug,
    title: post.title,
    description: post.description || post.subtitle,
    keywords: post.postTags.map(tag => tag.name),
    author: {
      name: author.name,
      bio: author.bio,
      profile_url: `https://${author.publicationUsers[0]?.publication?.custom_domain || 'atiqisrak.com'}`,
    },
    content: {
      introduction: post.truncated_body_text || post.description,
      sections: [], // Will be populated from body_html if needed
      faqs: [],
      cta: {
        text: "Read more on the original platform",
        url: post.canonical_url,
      },
    },
    metadata: {
      publish_date: post.post_date,
      platform: "Archive",
      seo: {
        meta_title: post.title,
        meta_description: post.search_engine_description || post.description,
        image: post.cover_image,
        schema_markup: {
          type: "Article",
          properties: {
            image: post.cover_image,
          },
        },
      },
      word_count: post.wordcount,
      tags: post.postTags.map(tag => tag.name),
    },
    links: {
      internal: [],
      external: [],
    },
    status: "published",
    published_at: post.post_date,
    template: "blog_3",
  };
}
