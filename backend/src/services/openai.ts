import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIService {
  static async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-ada-002',
        input: text,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw new Error('Failed to generate embedding');
    }
  }

  static async generateProjectDescription(projectData: {
    title: string;
    technologies: string[];
    description?: string;
  }): Promise<string> {
    try {
      const prompt = `Generate a concise, engaging description for a project titled "${projectData.title}" using technologies: ${projectData.technologies.join(', ')}. 
      ${projectData.description ? `Original description: ${projectData.description}` : ''}
      
      Make it professional, highlight key features, and keep it under 200 words.`;

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional software developer and technical writer. Write clear, engaging project descriptions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || 'Description generation failed';
    } catch (error) {
      console.error('Error generating project description:', error);
      throw new Error('Failed to generate project description');
    }
  }

  static async searchSimilarProjects(query: string, limit: number = 5): Promise<string> {
    try {
      const prompt = `Given this search query: "${query}", generate a semantic search query that would help find similar projects. 
      Focus on key technologies, concepts, and project types. Keep it concise and relevant.`;

      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a search optimization expert. Help users find relevant projects by improving their search queries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.5,
      });

      return response.choices[0]?.message?.content || query;
    } catch (error) {
      console.error('Error optimizing search query:', error);
      return query; // Fallback to original query
    }
  }
}
