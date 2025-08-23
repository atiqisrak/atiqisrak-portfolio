export interface PortfolioSection {
  id: number;
  name: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_url?: string;
  project_url?: string;
  github_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  timeline: string;
  description: string;
  skills: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  created_at: Date;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  database: string;
  uptime: number;
  error?: string;
}
