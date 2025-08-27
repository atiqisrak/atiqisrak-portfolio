import pool from "../config";
import { OpenAIService } from "../../services/openai";

// Helper function to convert month names to numbers
function getMonthNumber(monthName: string): string {
  const months: { [key: string]: string } = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };
  return months[monthName] || '01';
}

export async function seedExperience(data: any) {
  console.log("Seeding experience...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM experience LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Experience already exists, skipping...");
    return;
  }

  for (const exp of data) {
    const embedding = await OpenAIService.generateEmbedding(
      `${exp.company} ${exp.position} ${exp.description} ${exp.keyAchievements?.join(' ') || ''} ${exp.technologies?.join(' ') || ''}`
    );
    
    // Parse timeline to extract dates
    const timeline = exp.timeline || '';
    const startMatch = timeline.match(/(\w+)\s+(\d{4})/);
    const endMatch = timeline.match(/(\w+)\s+(\d{4})/);
    
    const startDate = startMatch ? `${startMatch[2]}-${getMonthNumber(startMatch[1])}-01` : null;
    const endDate = endMatch ? `${endMatch[2]}-${getMonthNumber(endMatch[1])}-01` : null;
    const isCurrent = timeline.includes('Present');
    
    const query = `
      INSERT INTO experience (company, position, start_date, end_date, current, description, achievements, technologies, responsibilities, impact, embedding)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::vector)
    `;
    
    await pool.query(query, [
      exp.company,
      exp.position,
      startDate,
      endDate,
      isCurrent,
      exp.description || '',
      exp.keyAchievements || [],
      exp.technologies || [],
      [], // responsibilities - not in source data
      [], // impact - not in source data
      `[${embedding.join(',')}]`
    ]);
  }
  
  console.log("✓ Experience seeded");
}
