import pool from "./config";

async function fixEmbeddings() {
  try {
    console.log("Starting embedding column fix...");

    // Drop the embedding column and recreate it
    await pool.query("ALTER TABLE projects DROP COLUMN IF EXISTS embedding");
    console.log("✓ Dropped embedding column");
    
    await pool.query("ALTER TABLE projects ADD COLUMN embedding vector(1536)");
    console.log("✓ Recreated embedding column");

    // Recreate the vector index
    await pool.query(`
      CREATE INDEX IF NOT EXISTS projects_embedding_idx 
      ON projects 
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `);
    console.log("✓ Recreated vector index");

    console.log("Embedding column fix completed successfully!");
  } catch (error) {
    console.error("Fix failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

fixEmbeddings().catch(console.error);
