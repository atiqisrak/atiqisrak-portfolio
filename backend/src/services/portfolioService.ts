import pool from '../database/config';
import { OpenAIService } from './openai';

export interface PortfolioSection {
  id: number;
  name: string;
  title: string;
  content: string;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  resume_url: string;
  contact_info: any;
  social_links: any;
  created_at: Date;
  updated_at: Date;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency_level: number;
  description: string;
  use_cases: string[];
  years_experience: number;
  projects_used_in: string[];
  created_at: Date;
  updated_at: Date;
  similarity?: number;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  start_date: Date;
  end_date?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  responsibilities: string[];
  impact: string[];
  created_at: Date;
  updated_at: Date;
  similarity?: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date?: Date;
  end_date?: Date;
  gpa?: number;
  achievements: string[];
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issue_date?: Date;
  expiry_date?: Date;
  credential_id?: string;
  credential_url?: string;
  description?: string;
  skills_covered: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Achievement {
  id: number;
  title: string;
  description?: string;
  date?: Date;
  category?: string;
  impact?: string;
  metrics: any;
  created_at: Date;
  updated_at: Date;
}

export interface Expertise {
  id: number;
  domain: string;
  description?: string;
  years_experience: number;
  key_projects: string[];
  methodologies: string[];
  technologies: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Methodology {
  id: number;
  name: string;
  description?: string;
  category?: string;
  use_cases: string[];
  benefits: string[];
  implementation_steps: string[];
  created_at: Date;
  updated_at: Date;
}

export interface AITraining {
  id: number;
  model_name: string;
  purpose?: string;
  training_data: string[];
  performance_metrics: any;
  use_cases: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  image_url: string;
  github_url: string;
  live_url: string;
  technologies: string[];
  category: string;
  featured: boolean;
  challenge: string;
  solution: string;
  impact: string[];
  technical_details: any;
  business_value: string;
  created_at: Date;
  updated_at: Date;
  similarity?: number;
}

export class PortfolioService {
  // Portfolio Sections
  static async getPortfolioSections(): Promise<PortfolioSection[]> {
    const query = 'SELECT * FROM portfolio_sections ORDER BY (metadata->>\'order\')::int';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getPortfolioSection(name: string): Promise<PortfolioSection | null> {
    const query = 'SELECT * FROM portfolio_sections WHERE name = $1';
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  // Personal Info
  static async getPersonalInfo(): Promise<PersonalInfo | null> {
    const query = 'SELECT * FROM personal_info LIMIT 1';
    const result = await pool.query(query);
    return result.rows[0] || null;
  }

  // Skills
  static async getAllSkills(): Promise<Skill[]> {
    const query = 'SELECT * FROM skills ORDER BY category, proficiency_level DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getSkillsByCategory(category: string): Promise<Skill[]> {
    const query = 'SELECT * FROM skills WHERE category = $1 ORDER BY proficiency_level DESC';
    const result = await pool.query(query, [category]);
    return result.rows;
  }

  static async searchSkills(query: string, limit: number = 5, threshold: number = 0.7): Promise<Skill[]> {
    const embedding = await OpenAIService.generateEmbedding(query);
    const vectorString = `[${embedding.join(',')}]`;
    
    const searchQuery = `
      SELECT *, 1 - (embedding <=> $1) as similarity
      FROM skills 
      WHERE 1 - (embedding <=> $1) > $2
      ORDER BY embedding <=> $1
      LIMIT $3
    `;
    
    const result = await pool.query(searchQuery, [vectorString, threshold, limit]);
    return result.rows;
  }

  // Experience
  static async getAllExperience(): Promise<Experience[]> {
    const query = 'SELECT * FROM experience ORDER BY start_date DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getExperienceById(id: number): Promise<Experience | null> {
    const query = 'SELECT * FROM experience WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async searchExperience(query: string, limit: number = 5, threshold: number = 0.7): Promise<Experience[]> {
    const embedding = await OpenAIService.generateEmbedding(query);
    const vectorString = `[${embedding.join(',')}]`;
    
    const searchQuery = `
      SELECT *, 1 - (embedding <=> $1) as similarity
      FROM experience 
      WHERE 1 - (embedding <=> $1) > $2
      ORDER BY embedding <=> $1
      LIMIT $3
    `;
    
    const result = await pool.query(searchQuery, [vectorString, threshold, limit]);
    return result.rows;
  }

  // Education
  static async getAllEducation(): Promise<Education[]> {
    const query = 'SELECT * FROM education ORDER BY start_date DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  // Certifications
  static async getAllCertifications(): Promise<Certification[]> {
    const query = 'SELECT * FROM certifications ORDER BY issue_date DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  // Achievements
  static async getAllAchievements(): Promise<Achievement[]> {
    const query = 'SELECT * FROM achievements ORDER BY date DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  // Expertise
  static async getAllExpertise(): Promise<Expertise[]> {
    const query = 'SELECT * FROM expertise ORDER BY years_experience DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  // Methodologies
  static async getAllMethodologies(): Promise<Methodology[]> {
    const query = 'SELECT * FROM methodologies ORDER BY name';
    const result = await pool.query(query);
    return result.rows;
  }

  // AI Training
  static async getAllAITraining(): Promise<AITraining[]> {
    const query = 'SELECT * FROM ai_training ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  // Projects
  static async getAllProjects(): Promise<Project[]> {
    const query = 'SELECT * FROM projects ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getProjectById(id: number): Promise<Project | null> {
    const query = 'SELECT * FROM projects WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async getProjectBySlug(slug: string): Promise<Project | null> {
    const query = 'SELECT * FROM projects WHERE slug = $1';
    const result = await pool.query(query, [slug]);
    return result.rows[0] || null;
  }

  static async getFeaturedProjects(limit: number = 6): Promise<Project[]> {
    const query = 'SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC LIMIT $1';
    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  static async searchProjects(query: string, limit: number = 5, threshold: number = 0.7): Promise<Project[]> {
    const embedding = await OpenAIService.generateEmbedding(query);
    const vectorString = `[${embedding.join(',')}]`;
    
    const searchQuery = `
      SELECT *, 1 - (embedding <=> $1) as similarity
      FROM projects 
      WHERE 1 - (embedding <=> $1) > $2
      ORDER BY embedding <=> $1
      LIMIT $3
    `;
    
    const result = await pool.query(searchQuery, [vectorString, threshold, limit]);
    return result.rows;
  }

  static async getProjectsByTechnology(technology: string, limit: number = 10): Promise<Project[]> {
    const query = `
      SELECT * FROM projects 
      WHERE $1 = ANY(technologies)
      ORDER BY created_at DESC
      LIMIT $2
    `;
    
    const result = await pool.query(query, [technology, limit]);
    return result.rows;
  }

  static async getProjectsByCategory(category: string, limit: number = 10): Promise<Project[]> {
    const query = `
      SELECT * FROM projects 
      WHERE category = $1
      ORDER BY created_at DESC
      LIMIT $2
    `;
    
    const result = await pool.query(query, [category, limit]);
    return result.rows;
  }

  // Comprehensive Search
  static async comprehensiveSearch(query: string, limit: number = 10, threshold: number = 0.7): Promise<{
    projects: Project[];
    skills: Skill[];
    experience: Experience[];
  }> {
    const [projects, skills, experience] = await Promise.all([
      this.searchProjects(query, Math.ceil(limit / 3), threshold),
      this.searchSkills(query, Math.ceil(limit / 3), threshold),
      this.searchExperience(query, Math.ceil(limit / 3), threshold)
    ]);

    return { projects, skills, experience };
  }

  // Get Portfolio Summary
  static async getPortfolioSummary(): Promise<{
    personalInfo: PersonalInfo | null;
    skillsCount: number;
    experienceCount: number;
    projectsCount: number;
    featuredProjects: Project[];
    recentExperience: Experience[];
  }> {
    const [
      personalInfo,
      skillsCount,
      experienceCount,
      projectsCount,
      featuredProjects,
      recentExperience
    ] = await Promise.all([
      this.getPersonalInfo(),
      pool.query('SELECT COUNT(*) FROM skills').then(r => parseInt(r.rows[0].count)),
      pool.query('SELECT COUNT(*) FROM experience').then(r => parseInt(r.rows[0].count)),
      pool.query('SELECT COUNT(*) FROM projects').then(r => parseInt(r.rows[0].count)),
      this.getFeaturedProjects(3),
      pool.query('SELECT * FROM experience ORDER BY start_date DESC LIMIT 3').then(r => r.rows)
    ]);

    return {
      personalInfo,
      skillsCount,
      experienceCount,
      projectsCount,
      featuredProjects,
      recentExperience
    };
  }

  // Update methods for admin operations
  static async updatePortfolioSection(name: string, data: Partial<PortfolioSection>): Promise<void> {
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at');
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = [name, ...fields.map(field => data[field as keyof PortfolioSection])];
    
    const query = `UPDATE portfolio_sections SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE name = $1`;
    await pool.query(query, values);
  }

  static async updatePersonalInfo(data: Partial<PersonalInfo>): Promise<void> {
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at');
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = [1, ...fields.map(field => data[field as keyof PersonalInfo])];
    
    const query = `UPDATE personal_info SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1`;
    await pool.query(query, values);
  }

  static async updateProject(id: number, data: Partial<Project>): Promise<void> {
    const fields = Object.keys(data).filter(key => key !== 'id' && key !== 'created_at');
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = [id, ...fields.map(field => data[field as keyof Project])];
    
    const query = `UPDATE projects SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1`;
    await pool.query(query, values);
  }
}
