import pool from './src/database/config';

async function checkDatabase() {
  try {
    console.log("Checking database state...");
    
    // Check total projects
    const totalResult = await pool.query("SELECT COUNT(*) as total FROM projects");
    console.log(`Total projects: ${totalResult.rows[0].total}`);
    
    // Check projects with embeddings
    const withEmbeddingsResult = await pool.query("SELECT COUNT(*) as count FROM projects WHERE embedding IS NOT NULL");
    console.log(`Projects with embeddings: ${withEmbeddingsResult.rows[0].count}`);
    
    // Check projects without embeddings
    const withoutEmbeddingsResult = await pool.query("SELECT COUNT(*) as count FROM projects WHERE embedding IS NULL");
    console.log(`Projects without embeddings: ${withoutEmbeddingsResult.rows[0].count}`);
    
    // Check a sample project
    const sampleResult = await pool.query("SELECT id, title, embedding FROM projects LIMIT 1");
    const sample = sampleResult.rows[0];
    console.log(`Sample project: ID=${sample.id}, Title="${sample.title}", Embedding=${sample.embedding}`);
    
    // Check if embedding column exists and its type
    const columnResult = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'embedding'
    `);
    console.log(`Embedding column info:`, columnResult.rows[0] || 'Column not found');
    
  } catch (error) {
    console.error("Database check failed:", error);
  } finally {
    await pool.end();
  }
}

checkDatabase();
