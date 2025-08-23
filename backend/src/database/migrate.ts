import pool from "./config";

async function migrate() {
  try {
    console.log("Starting database migration...");

    // Enable pgvector extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS vector;');
    console.log("✓ pgvector extension enabled");

    // Create projects table with vector support
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content TEXT,
        slug VARCHAR(255) UNIQUE NOT NULL,
        image_url VARCHAR(500),
        github_url VARCHAR(500),
        live_url VARCHAR(500),
        technologies TEXT[],
        category VARCHAR(100),
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        embedding vector(1536)
      );
    `);
    console.log("✓ projects table created/updated");

    // Add missing columns to existing table
    try {
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS content TEXT;');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug VARCHAR(255);');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url VARCHAR(500);');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS category VARCHAR(100);');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;');
      console.log("✓ missing columns added/verified");
    } catch (error) {
      console.log("Some columns already exist or error occurred:", error);
    }

    // Add embedding column if it doesn't exist
    try {
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS embedding vector(1536);');
      console.log("✓ embedding column added/verified");
    } catch (error) {
      console.log("embedding column already exists or error occurred:", error);
    }

    // Create vector index for similarity search
    await pool.query(`
      CREATE INDEX IF NOT EXISTS projects_embedding_idx 
      ON projects 
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `);
    console.log("✓ vector index created");

    // Create function to update updated_at timestamp
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);
    console.log("✓ update_updated_at_column function created");

    // Create trigger for updated_at
    await pool.query(`
      DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
      CREATE TRIGGER update_projects_updated_at
        BEFORE UPDATE ON projects
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log("✓ projects updated_at trigger created");

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

migrate().catch(console.error);
