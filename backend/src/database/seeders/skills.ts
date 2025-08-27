import pool from "../config";
import { OpenAIService } from "../../services/openai";

// Convert percentage proficiency to 1-5 scale
function convertProficiencyToScale(percentage: number): number {
  if (percentage >= 90) return 5;
  if (percentage >= 80) return 4;
  if (percentage >= 70) return 3;
  if (percentage >= 60) return 2;
  return 1;
}

export async function seedSkills(data: any) {
  console.log("Seeding skills...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM skills LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Skills already exist, skipping...");
    return;
  }

  for (const category in data) {
    const skills = data[category];
    for (const skill of skills) {
      const embedding = await OpenAIService.generateEmbedding(
        `${skill.name} ${skill.description || ''} ${skill.useCases?.join(' ') || ''} ${category}`
      );
      
      const query = `
        INSERT INTO skills (name, category, proficiency_level, description, use_cases, years_experience, projects_used_in, embedding)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8::vector)
      `;
      
      // Extract years from experience string (e.g., "5+ years" -> 5)
      const yearsMatch = (skill.experience || '').match(/(\d+)/);
      const yearsExperience = yearsMatch ? parseInt(yearsMatch[1]) : 0;
      
      // Convert percentage proficiency to 1-5 scale
      const proficiencyLevel = convertProficiencyToScale(skill.proficiency || 0);
      
      await pool.query(query, [
        skill.name,
        category,
        proficiencyLevel,
        skill.description || '',
        skill.useCases || [],
        yearsExperience,
        skill.projects || [],
        `[${embedding.join(',')}]`
      ]);
    }
  }
  
  console.log("✓ Skills seeded");
}
