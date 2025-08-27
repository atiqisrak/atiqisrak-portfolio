import pool from "../config";

export async function seedExpertise(data: any) {
  console.log("Seeding expertise...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM expertise LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Expertise already exists, skipping...");
    return;
  }

  for (const exp of data) {
    const query = `
      INSERT INTO expertise (domain, description, years_experience, key_projects, methodologies, technologies)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    
    await pool.query(query, [
      exp.domain,
      exp.description || '',
      exp.years_experience || 0,
      exp.key_projects || [],
      exp.methodologies || [],
      exp.technologies || []
    ]);
  }
  
  console.log("✓ Expertise seeded");
}
