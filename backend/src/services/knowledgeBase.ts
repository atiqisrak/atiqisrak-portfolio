import fs from 'fs';
import path from 'path';
import { OpenAIService } from './openai';

export interface KnowledgeBaseData {
  metadata: {
    version: string;
    lastUpdated: string;
    description: string;
    totalProjects: number;
    totalSkills: number;
    totalExperience: number;
  };
  personalInfo: {
    name: string;
    title: string;
    location: string;
    specialization: string;
    yearsOfExperience: string;
    coreExpertise: string[];
  };
  projects: Record<string, any>;
  skills: Record<string, any[]>;
  experience: Record<string, any>;
  methodologies: Record<string, string[]>;
  expertise: Record<string, string[]>;
  achievements: Record<string, string[]>;
  aiTraining: {
    context: string;
    responseGuidelines: string[];
    keyTopics: string[];
  };
}

export class KnowledgeBaseService {
  private static knowledgeBase: KnowledgeBaseData | null = null;
  private static knowledgeEmbeddings: Map<string, number[]> = new Map();

  /**
   * Load the knowledge base from multiple JSON files
   */
  static async loadKnowledgeBase(): Promise<KnowledgeBaseData> {
    if (this.knowledgeBase) {
      return this.knowledgeBase;
    }

    try {
      const basePath = path.join(__dirname, '../../knowledgebase');
      
      // Load metadata
      const metadataPath = path.join(basePath, 'metadata.json');
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      
      // Load personal info
      const personalInfoPath = path.join(basePath, 'personal-info.json');
      const personalInfo = JSON.parse(fs.readFileSync(personalInfoPath, 'utf-8'));
      
      // Load projects
      const projectsPath = path.join(basePath, 'projects');
      const projects: Record<string, any> = {};
      const projectFiles = fs.readdirSync(projectsPath);
      for (const file of projectFiles) {
        if (file.endsWith('.json')) {
          const projectPath = path.join(projectsPath, file);
          const project = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));
          projects[project.id] = project;
        }
      }
      
      // Load skills
      const skillsPath = path.join(basePath, 'skills.json');
      const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
      
      // Load experience
      const experiencePath = path.join(basePath, 'experience.json');
      const experience = JSON.parse(fs.readFileSync(experiencePath, 'utf-8'));
      
      // Load methodologies
      const methodologiesPath = path.join(basePath, 'methodologies.json');
      const methodologies = JSON.parse(fs.readFileSync(methodologiesPath, 'utf-8'));
      
      // Load expertise
      const expertisePath = path.join(basePath, 'expertise.json');
      const expertise = JSON.parse(fs.readFileSync(expertisePath, 'utf-8'));
      
      // Load achievements
      const achievementsPath = path.join(basePath, 'achievements.json');
      const achievements = JSON.parse(fs.readFileSync(achievementsPath, 'utf-8'));
      
      // Load AI training
      const aiTrainingPath = path.join(basePath, 'ai-training.json');
      const aiTraining = JSON.parse(fs.readFileSync(aiTrainingPath, 'utf-8'));
      
      // Construct the complete knowledge base
      this.knowledgeBase = {
        metadata,
        personalInfo,
        projects,
        skills,
        experience,
        methodologies,
        expertise,
        achievements,
        aiTraining
      };
      
      // Generate embeddings for key content
      await this.generateKnowledgeEmbeddings();
      
      if (!this.knowledgeBase) {
        throw new Error('Failed to load knowledge base data');
      }
      
      return this.knowledgeBase;
    } catch (error) {
      console.error('Failed to load knowledge base:', error);
      throw new Error('Failed to load knowledge base');
    }
  }

  /**
   * Generate embeddings for key knowledge base content
   */
  private static async generateKnowledgeEmbeddings(): Promise<void> {
    if (!this.knowledgeBase) return;

    try {
      // Generate embeddings for projects
      for (const [projectId, project] of Object.entries(this.knowledgeBase.projects)) {
        const textToEmbed = `${project.title} ${project.overview} ${project.challenge} ${project.solution} ${project.impact.join(' ')} ${project.technologies?.join(' ') || ''}`;
        const embedding = await OpenAIService.generateEmbedding(textToEmbed);
        this.knowledgeEmbeddings.set(`project_${projectId}`, embedding);
      }

      // Generate embeddings for skills
      for (const [category, skills] of Object.entries(this.knowledgeBase.skills)) {
        for (const skill of skills) {
          const textToEmbed = `${skill.name} ${skill.useCases.join(' ')} ${skill.projects.join(' ')}`;
          const embedding = await OpenAIService.generateEmbedding(textToEmbed);
          this.knowledgeEmbeddings.set(`skill_${skill.name}`, embedding);
        }
      }

      // Generate embedding for personal info
      const personalInfoText = `${this.knowledgeBase.personalInfo.name} ${this.knowledgeBase.personalInfo.title} ${this.knowledgeBase.personalInfo.specialization} ${this.knowledgeBase.personalInfo.coreExpertise.join(' ')}`;
      const personalEmbedding = await OpenAIService.generateEmbedding(personalInfoText);
      this.knowledgeEmbeddings.set('personal_info', personalEmbedding);

      console.log(`Generated ${this.knowledgeEmbeddings.size} knowledge base embeddings`);
    } catch (error) {
      console.error('Failed to generate knowledge embeddings:', error);
    }
  }

  /**
   * Search knowledge base using semantic similarity
   */
  static async searchKnowledge(
    query: string,
    limit: number = 5,
    threshold: number = 0.7
  ): Promise<Array<{ content: any; similarity: number; type: string; id: string }>> {
    await this.loadKnowledgeBase();
    
    try {
      const queryEmbedding = await OpenAIService.generateEmbedding(query);
      const results: Array<{ content: any; similarity: number; type: string; id: string }> = [];

      // Search through all embeddings
      const entries = Array.from(this.knowledgeEmbeddings.entries());
      for (const [key, embedding] of entries) {
        const similarity = this.calculateCosineSimilarity(queryEmbedding, embedding);
        
        if (similarity >= threshold) {
          let content: any;
          let type: string;
          let id: string;

          if (key.startsWith('project_')) {
            const projectId = key.replace('project_', '');
            content = this.knowledgeBase!.projects[projectId];
            type = 'project';
            id = projectId;
          } else if (key.startsWith('skill_')) {
            const skillName = key.replace('skill_', '');
            content = this.findSkillByName(skillName);
            type = 'skill';
            id = skillName;
          } else if (key === 'personal_info') {
            content = this.knowledgeBase!.personalInfo;
            type = 'personal';
            id = 'personal_info';
          } else {
            continue; // Skip if key doesn't match any pattern
          }

          if (content) {
            results.push({ content, similarity, type, id });
          }
        }
      }

      // Sort by similarity and limit results
      return results
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit);
    } catch (error) {
      console.error('Knowledge search failed:', error);
      throw new Error('Knowledge search failed');
    }
  }

  /**
   * Get specific project information
   */
  static async getProject(projectId: string): Promise<any> {
    await this.loadKnowledgeBase();
    return this.knowledgeBase?.projects[projectId] || null;
  }

  /**
   * Get all projects
   */
  static async getAllProjects(): Promise<any[]> {
    await this.loadKnowledgeBase();
    return Object.values(this.knowledgeBase?.projects || {});
  }

  /**
   * Get skills by category
   */
  static async getSkillsByCategory(category: string): Promise<any[]> {
    await this.loadKnowledgeBase();
    return this.knowledgeBase?.skills[category] || [];
  }

  /**
   * Get personal information
   */
  static async getPersonalInfo(): Promise<any> {
    await this.loadKnowledgeBase();
    return this.knowledgeBase?.personalInfo || null;
  }

  /**
   * Get expertise and specializations
   */
  static async getExpertise(): Promise<any> {
    await this.loadKnowledgeBase();
    return this.knowledgeBase?.expertise || null;
  }

  /**
   * Get methodologies
   */
  static async getMethodologies(): Promise<any> {
    await this.loadKnowledgeBase();
    return this.knowledgeBase?.methodologies || null;
  }

  /**
   * Get achievements and metrics
   */
  static async getAchievements(): Promise<any> {
    await this.loadKnowledgeBase();
    return this.knowledgeBase?.achievements || null;
  }

  /**
   * Get AI training guidelines
   */
  static async getAITrainingGuidelines(): Promise<any> {
    await this.loadKnowledgeBase();
    return this.knowledgeBase?.aiTraining || null;
  }

  /**
   * Find skill by name across all categories
   */
  private static findSkillByName(skillName: string): any {
    if (!this.knowledgeBase) return null;

    for (const [category, skills] of Object.entries(this.knowledgeBase.skills)) {
      const skill = skills.find(s => s.name === skillName);
      if (skill) return skill;
    }
    return null;
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private static calculateCosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) return 0;

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    norm1 = Math.sqrt(norm1);
    norm2 = Math.sqrt(norm2);

    if (norm1 === 0 || norm2 === 0) return 0;

    return dotProduct / (norm1 * norm2);
  }

  /**
   * Get contextual response based on query
   */
  static async getContextualResponse(query: string): Promise<string> {
    const searchResults = await this.searchKnowledge(query, 3, 0.6);
    
    if (searchResults.length === 0) {
      return "I don't have specific information about that in my knowledge base. Could you please rephrase your question or ask about my projects, skills, or experience?";
    }

    // Get AI training guidelines to follow response style
    const aiGuidelines = await this.getAITrainingGuidelines();
    const isFocused = aiGuidelines?.responseStyle?.includes('focused') || false;
    
    if (isFocused) {
      // Focused response - only answer what's asked
      const topResult = searchResults[0];
      if (topResult.type === 'project') {
        return `${topResult.content.title}: ${topResult.content.overview}`;
      } else if (topResult.type === 'skill') {
        return `${topResult.content.name}: ${topResult.content.experience} experience`;
      } else if (topResult.type === 'personal') {
        return `${topResult.content.name}: ${topResult.content.title}`;
      }
    }

    // Default response (when not focused)
    let response = "Based on my knowledge base, here's what I can tell you:\n\n";
    
    for (const result of searchResults) {
      if (result.type === 'project') {
        response += `**${result.content.title}**: ${result.content.overview}\n`;
        response += `**Impact**: ${result.content.impact.slice(0, 2).join(', ')}\n\n`;
      } else if (result.type === 'skill') {
        response += `**${result.content.name}**: ${result.content.experience} experience, ${result.content.proficiency}% proficiency\n`;
        response += `**Use Cases**: ${result.content.useCases.slice(0, 2).join(', ')}\n\n`;
      } else if (result.type === 'personal') {
        response += `**${result.content.name}**: ${result.content.title} with ${result.content.yearsOfExperience} of experience\n`;
        response += `**Specialization**: ${result.content.specialization}\n\n`;
      }
    }

    return response;
  }

  /**
   * Refresh knowledge base (useful for updates)
   */
  static async refreshKnowledgeBase(): Promise<void> {
    this.knowledgeBase = null;
    this.knowledgeEmbeddings.clear();
    await this.loadKnowledgeBase();
  }

  /**
   * Force refresh knowledge base and regenerate embeddings
   */
  static async forceRefreshAndRetrain(): Promise<void> {
    console.log('Force refreshing knowledge base and regenerate embeddings...');
    this.knowledgeBase = null;
    this.knowledgeEmbeddings.clear();
    await this.loadKnowledgeBase();
    console.log('Knowledge base refreshed and embeddings regenerated successfully');
  }

  /**
   * Get focused response for specific query (follows AI guidelines)
   */
  static async getFocusedResponse(query: string): Promise<string> {
    const searchResults = await this.searchKnowledge(query, 1, 0.7);
    
    if (searchResults.length === 0) {
      return "I don't have specific information about that.";
    }

    const result = searchResults[0];
    
    if (result.type === 'project') {
      return `${result.content.title}: ${result.content.overview}`;
    } else if (result.type === 'skill') {
      return `${result.content.name}: ${result.content.experience} experience`;
    } else if (result.type === 'personal') {
      return `${result.content.name}: ${result.content.title}`;
    }
    
    return "I found some information but it's not in the expected format.";
  }
}
