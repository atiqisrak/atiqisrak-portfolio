import pool from "../config";

export async function seedMethodologies(data: any) {
  console.log("Seeding methodologies...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM methodologies LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Methodologies already exist, skipping...");
    return;
  }

  for (const method of data) {
    const query = `
      INSERT INTO methodologies (name, description, category, use_cases, benefits, implementation_steps)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    
    await pool.query(query, [
      method.name,
      method.description || '',
      method.category || '',
      method.use_cases || [],
      method.benefits || [],
      method.implementation_steps || []
    ]);
  }
  
  console.log("✓ Methodologies seeded");
}
