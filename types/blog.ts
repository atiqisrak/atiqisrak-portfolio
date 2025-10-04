// Archive API Types
export interface ArchivePostTag {
  id: string;
  publication_id: number;
  name: string;
  slug: string;
  hidden: boolean;
}

export interface ArchivePublication {
  id: number;
  name: string;
  subdomain: string;
  custom_domain: string;
  custom_domain_optional: boolean;
  hero_text: string;
  logo_url: string;
  author_id: number;
  primary_user_id: number;
  theme_var_background_pop: string;
  created_at: string;
  email_from_name: string;
  copyright: string;
  founding_plan_name: string;
  community_enabled: boolean;
  invite_only: boolean;
  payments_state: string;
  language: string | null;
  explicit: boolean;
  homepage_type: string | null;
  is_personal_mode: boolean;
}

export interface ArchivePublicationUser {
  id: number;
  user_id: number;
  publication_id: number;
  role: string;
  public: boolean;
  is_primary: boolean;
  publication: ArchivePublication;
}

export interface ArchiveByline {
  id: number;
  name: string;
  handle: string;
  previous_name: string | null;
  photo_url: string;
  bio: string;
  profile_set_up_at: string;
  reader_installed_at: string;
  publicationUsers: ArchivePublicationUser[];
  twitter_screen_name: string;
  is_guest: boolean;
  bestseller_tier: number;
  status: {
    bestsellerTier: number;
    subscriberTier: number | null;
    leaderboard: any;
    vip: boolean;
    badge: {
      type: string;
      tier: number;
    };
    paidPublicationIds: number[];
  };
}

export interface ArchivePost {
  id: number;
  editor_v2: boolean;
  publication_id: number;
  title: string;
  social_title: string;
  search_engine_title: string | null;
  search_engine_description: string | null;
  type: string;
  slug: string;
  post_date: string;
  audience: string;
  podcast_duration: number | null;
  video_upload_id: string | null;
  podcast_upload_id: string | null;
  write_comment_permissions: string;
  should_send_free_preview: boolean;
  free_unlock_required: boolean;
  default_comment_sort: string | null;
  canonical_url: string;
  section_id: number | null;
  top_exclusions: any[];
  pins: any[];
  is_section_pinned: boolean;
  section_slug: string | null;
  section_name: string | null;
  reactions: Record<string, number>;
  restacked_post_id: number | null;
  restacked_post_slug: string | null;
  restacked_pub_name: string | null;
  restacked_pub_logo_url: string | null;
  subtitle: string;
  cover_image: string;
  cover_image_is_square: boolean;
  cover_image_is_explicit: boolean;
  podcast_url: string | null;
  videoUpload: any;
  podcastFields: {
    post_id: number;
    podcast_episode_number: number | null;
    podcast_season_number: number | null;
    podcast_episode_type: string | null;
    should_syndicate_to_other_feed: boolean | null;
    syndicate_to_section_id: number | null;
    hide_from_feed: boolean;
    free_podcast_url: string | null;
    free_podcast_duration: number | null;
  };
  podcast_preview_upload_id: string | null;
  podcastUpload: any;
  podcastPreviewUpload: any;
  voiceover_upload_id: string | null;
  voiceoverUpload: any;
  has_voiceover: boolean;
  description: string;
  body_json: any;
  body_html: string | null;
  truncated_body_text: string;
  wordcount: number;
  postTags: ArchivePostTag[];
  teaser_post_eligible: boolean;
  postCountryBlocks: any[];
  headlineTest: any;
  coverImagePalette: any;
  publishedBylines: ArchiveByline[];
  reaction: any;
  reaction_count: number;
  comment_count: number;
  child_comment_count: number;
  audio_items: any[];
  is_geoblocked: boolean;
  hidden: boolean;
  hasCashtag: boolean;
}

// Legacy Blog Types (for backward compatibility)
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
  image: string;
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

export type BlogTemplate = 'blog_3';

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
