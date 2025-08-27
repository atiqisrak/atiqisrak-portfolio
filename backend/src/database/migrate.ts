import pool from "./config";

async function migrate() {
  try {
    console.log("Starting comprehensive database migration...");

    // Enable pgvector extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS vector;');
    console.log("✓ pgvector extension enabled");

    // Create comprehensive portfolio schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_sections (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255),
        content TEXT,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ portfolio_sections table created");

    // Create personal_info table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS personal_info (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        bio TEXT,
        avatar_url VARCHAR(500),
        resume_url VARCHAR(500),
        contact_info JSONB,
        social_links JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ personal_info table created");

    // Create skills table with categories
    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
        description TEXT,
        use_cases TEXT[],
        years_experience INTEGER,
        projects_used_in TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        embedding vector(1536)
      );
    `);
    console.log("✓ skills table created");

    // Create experience table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS experience (
        id SERIAL PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE,
        current BOOLEAN DEFAULT false,
        description TEXT,
        achievements TEXT[],
        technologies TEXT[],
        responsibilities TEXT[],
        impact TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        embedding vector(1536)
      );
    `);
    console.log("✓ experience table created");

    // Create education table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        institution VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        field_of_study VARCHAR(255),
        start_date DATE,
        end_date DATE,
        gpa DECIMAL(3,2),
        achievements TEXT[],
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ education table created");

    // Create certifications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS certifications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        issuer VARCHAR(255) NOT NULL,
        issue_date DATE,
        expiry_date DATE,
        credential_id VARCHAR(255),
        credential_url VARCHAR(500),
        description TEXT,
        skills_covered TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ certifications table created");

    // Create achievements table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE,
        category VARCHAR(100),
        impact TEXT,
        metrics JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ achievements table created");

    // Create expertise table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS expertise (
        id SERIAL PRIMARY KEY,
        domain VARCHAR(255) NOT NULL,
        description TEXT,
        years_experience INTEGER,
        key_projects TEXT[],
        methodologies TEXT[],
        technologies TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ expertise table created");

    // Create methodologies table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS methodologies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        use_cases TEXT[],
        benefits TEXT[],
        implementation_steps TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ methodologies table created");

    // Create ai_training table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ai_training (
        id SERIAL PRIMARY KEY,
        model_name VARCHAR(255) NOT NULL,
        purpose TEXT,
        training_data TEXT[],
        performance_metrics JSONB,
        use_cases TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ ai_training table created");

    // Update projects table with comprehensive fields
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
        challenge TEXT,
        solution TEXT,
        impact TEXT[],
        technical_details JSONB,
        business_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        embedding vector(1536)
      );
    `);
    console.log("✓ projects table created");

    // Add missing columns to existing projects table
    try {
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge TEXT;');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution TEXT;');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS impact TEXT[];');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS technical_details JSONB;');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS business_value TEXT;');
      await pool.query('ALTER TABLE projects ADD COLUMN IF NOT EXISTS embedding vector(1536);');
      console.log("✓ missing columns added to projects table");
    } catch (error) {
      console.log("Some columns already exist or error occurred:", error);
    }

    // Add embedding columns to skills and experience tables if they don't exist
    try {
      await pool.query('ALTER TABLE skills ADD COLUMN IF NOT EXISTS embedding vector(1536);');
      await pool.query('ALTER TABLE experience ADD COLUMN IF NOT EXISTS embedding vector(1536);');
      console.log("✓ embedding columns added to skills and experience tables");
    } catch (error) {
      console.log("Embedding columns already exist or error occurred:", error);
    }

    // Create vector indexes for similarity search
    await pool.query(`
      CREATE INDEX IF NOT EXISTS skills_embedding_idx 
      ON skills 
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `);
    console.log("✓ skills vector index created");

    await pool.query(`
      CREATE INDEX IF NOT EXISTS experience_embedding_idx 
      ON experience 
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `);
    console.log("✓ experience vector index created");

    await pool.query(`
      CREATE INDEX IF NOT EXISTS projects_embedding_idx 
      ON projects 
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `);
    console.log("✓ projects vector index created");

    // Create indexes for common queries
    await pool.query('CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_experience_company ON experience(company);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);');
    console.log("✓ performance indexes created");

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

    // Create triggers for updated_at
    const tables = [
      'portfolio_sections', 'personal_info', 'skills', 'experience', 
      'education', 'certifications', 'achievements', 'expertise', 
      'methodologies', 'ai_training', 'projects'
    ];

    for (const table of tables) {
      await pool.query(`
        DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};
        CREATE TRIGGER update_${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
      `);
      console.log(`✓ ${table} updated_at trigger created`);
    }

    console.log("Comprehensive migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

migrate().catch(console.error);
