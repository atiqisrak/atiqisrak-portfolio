import pool from "../config";

export async function seedAchievements(data: any) {
  console.log("Seeding achievements...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM achievements LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Achievements already exist, skipping...");
    return;
  }

  for (const achievement of data) {
    const query = `
      INSERT INTO achievements (title, description, date, category, impact, metrics)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    
    await pool.query(query, [
      achievement.title,
      achievement.description || '',
      achievement.date || null,
      achievement.category || '',
      achievement.impact || '',
      JSON.stringify(achievement.metrics || {})
    ]);
  }
  
  console.log("✓ Achievements seeded");
}
