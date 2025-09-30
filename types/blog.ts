export interface BlogAuthor {
  name: string;
  bio: string;
  profile_url: string;
}

export interface BlogList {
  type: 'ordered' | 'unordered';
  items: string[];
}

export interface BlogTable {
  headers: string[];
  rows: string[][];
}

export interface BlogImage {
  url: string;
  alt_text: string;
}

export interface BlogSection {
  heading: string;
  body: string;
  lists: BlogList[];
  tables: BlogTable[];
  images: BlogImage[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogCTA {
  text: string;
  url: string;
}

export interface BlogContent {
  introduction: string;
  sections: BlogSection[];
  faqs: BlogFAQ[];
  cta: BlogCTA;
}

export interface BlogSEO {
  meta_title: string;
  meta_description: string;
  schema_markup: {
    type: string;
    properties: Record<string, any>;
  };
}

export interface BlogMetadata {
  publish_date: string;
  platform: string;
  seo: BlogSEO;
  word_count: number;
  tags: string[];
}

export interface BlogLink {
  text: string;
  url: string;
}

export interface BlogLinks {
  internal: BlogLink[];
  external: BlogLink[];
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  author: BlogAuthor;
  content: BlogContent;
  metadata: BlogMetadata;
  links: BlogLinks;
  status: string;
  published_at: string;
  template: string;
}

export type BlogTemplate = 'blog_1' | 'blog_2' | 'blog_3';

export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogResponse {
  blogs: Blog[];
  pagination: BlogPagination;
}

export interface BlogFilters {
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
