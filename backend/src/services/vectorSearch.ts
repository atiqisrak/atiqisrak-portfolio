import pool from '../database/config';
import { OpenAIService } from './openai';

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
  created_at: Date;
  updated_at: Date;
  similarity?: number;
}

export class VectorSearchService {
  static async createProjectEmbedding(projectData: {
    title: string;
    description: string;
    content: string;
    technologies: string[];
    category: string;
  }): Promise<number[]> {
    const textToEmbed = `${projectData.title} ${projectData.description} ${projectData.content} ${projectData.technologies.join(' ')} ${projectData.category}`;
    return await OpenAIService.generateEmbedding(textToEmbed);
  }

  static async insertProjectWithEmbedding(projectData: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'similarity'>): Promise<number> {
    const embedding = await this.createProjectEmbedding(projectData);
    
    // Format embedding as a proper vector string for pgvector
    const vectorString = `[${embedding.join(',')}]`;
    
    const query = `
      INSERT INTO projects (
        title, description, content, slug, image_url, github_url, 
        live_url, technologies, category, featured, embedding
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::vector)
      RETURNING id
    `;
    
    const values = [
      projectData.title,
      projectData.description,
      projectData.content,
      projectData.slug,
      projectData.image_url,
      projectData.github_url,
      projectData.live_url,
      projectData.technologies,
      projectData.category,
      projectData.featured,
      vectorString
    ];

    const result = await pool.query(query, values);
    return result.rows[0].id;
  }

  static async updateProjectEmbedding(projectId: number, projectData: {
    title: string;
    description: string;
    content: string;
    technologies: string[];
    category: string;
  }): Promise<void> {
    const embedding = await this.createProjectEmbedding(projectData);
    
    // Format embedding as a proper vector string for pgvector
    const vectorString = `[${embedding.join(',')}]`;
    
    const query = `
      UPDATE projects 
      SET title = $1, description = $2, content = $3, technologies = $4, 
          category = $5, embedding = $6::vector, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
    `;
    
    const values = [
      projectData.title,
      projectData.description,
      projectData.content,
      projectData.technologies,
      projectData.category,
      vectorString,
      projectId
    ];

    await pool.query(query, values);
  }

  static async searchSimilarProjects(
    query: string,
    limit: number = 5,
    threshold: number = 0.7
  ): Promise<Project[]> {
    // Generate embedding for the search query
    const queryEmbedding = await OpenAIService.generateEmbedding(query);
    
    // Format query embedding as a proper vector string for pgvector
    const queryVectorString = `[${queryEmbedding.join(',')}]`;
    
    // Perform vector similarity search
    const searchQuery = `
      SELECT 
        id, title, description, content, slug, image_url, github_url, 
        live_url, technologies, category, featured, created_at, updated_at,
        1 - (embedding <=> $1) as similarity
      FROM projects 
      WHERE 1 - (embedding <=> $1) > $2
      ORDER BY embedding <=> $1
      LIMIT $3
    `;
    
    const result = await pool.query(searchQuery, [queryVectorString, threshold, limit]);
    return result.rows;
  }

  static async searchByTechnology(technology: string, limit: number = 10): Promise<Project[]> {
    const query = `
      SELECT 
        id, title, description, content, slug, image_url, github_url, 
        live_url, technologies, category, featured, created_at, updated_at
      FROM projects 
      WHERE $1 = ANY(technologies)
      ORDER BY created_at DESC
      LIMIT $2
    `;
    
    const result = await pool.query(query, [technology, limit]);
    return result.rows;
  }

  static async getFeaturedProjects(limit: number = 6): Promise<Project[]> {
    const query = `
      SELECT 
        id, title, description, content, slug, image_url, github_url, 
        live_url, technologies, category, featured, created_at, updated_at
      FROM projects 
      WHERE featured = true
      ORDER BY created_at DESC
      LIMIT $1
    `;
    
    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  static async getAllProjects(): Promise<Project[]> {
    const query = `
      SELECT 
        id, title, description, content, slug, image_url, github_url, 
        live_url, technologies, category, featured, created_at, updated_at
      FROM projects 
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    return result.rows;
  }

  static async getProjectBySlug(slug: string): Promise<Project | null> {
    const query = `
      SELECT 
        id, title, description, content, slug, image_url, github_url, 
        live_url, technologies, category, featured, created_at, updated_at
      FROM projects 
      WHERE slug = $1
    `;
    
    const result = await pool.query(query, [slug]);
    return result.rows[0] || null;
  }
}
