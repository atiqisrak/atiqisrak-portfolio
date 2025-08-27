import pool from "../config";
import { OpenAIService } from "../../services/openai";

export async function seedProject(data: any) {
  console.log(`Seeding project: ${data.title}`);
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM projects WHERE slug = $1", [data.id]);
  if (existing.rows.length > 0) {
    console.log(`Project ${data.title} already exists, skipping...`);
    return;
  }

  const embedding = await OpenAIService.generateEmbedding(
    `${data.title} ${data.overview} ${data.challenge} ${data.solution} ${data.technicalDetails?.technologies?.join(' ') || ''} ${data.category}`
  );
  
  const query = `
    INSERT INTO projects (title, description, content, slug, image_url, github_url, live_url, technologies, category, featured, challenge, solution, impact, technical_details, business_value, embedding)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16::vector)
  `;
  
  await pool.query(query, [
    data.title,
    data.overview || '',
    data.overview || '', // content same as overview
    data.id, // use id as slug
    '', // image_url not provided
    '', // github_url not provided
    data.projectUrl || '',
    data.technicalDetails?.technologies || [],
    data.category || 'Web Development',
    false, // featured not specified
    data.challenge || '',
    data.solution || '',
    data.impact || [],
    JSON.stringify(data.technicalDetails || {}),
    data.businessValue || '',
    `[${embedding.join(',')}]`
  ]);
  
  console.log(`✓ Project ${data.title} seeded`);
}
