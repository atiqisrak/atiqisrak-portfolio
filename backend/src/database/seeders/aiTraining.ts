import pool from "../config";

export async function seedAITraining(data: any) {
  console.log("Seeding AI training...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM ai_training LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("AI training already exists, skipping...");
    return;
  }

  for (const training of data) {
    const query = `
      INSERT INTO ai_training (model_name, purpose, training_data, performance_metrics, use_cases)
      VALUES ($1, $2, $3, $4, $5)
    `;
    
    await pool.query(query, [
      training.model_name,
      training.purpose || '',
      training.training_data || [],
      JSON.stringify(training.performance_metrics || {}),
      training.use_cases || []
    ]);
  }
  
  console.log("✓ AI training seeded");
}
