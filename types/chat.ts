export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  slug: string;
  technologies: string[];
  image_url?: string;
  github_url?: string;
  live_url?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface SearchResponse {
  projects: Project[];
  similarity_scores: number[];
}
