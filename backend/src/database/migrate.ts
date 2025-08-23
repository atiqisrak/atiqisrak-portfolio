import pool from "./config";

const createTables = async (): Promise<void> => {
  try {
    // Create portfolio_sections table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_sections (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        technologies TEXT[],
        image_url VARCHAR(500),
        project_url VARCHAR(500),
        github_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create experience table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS experience (
        id SERIAL PRIMARY KEY,
        position VARCHAR(200) NOT NULL,
        company VARCHAR(200) NOT NULL,
        timeline VARCHAR(100),
        description TEXT,
        skills TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create skills table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(100),
        proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create media table for file management
    await pool.query(`
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        size BIGINT NOT NULL,
        path VARCHAR(500) NOT NULL,
        public_url VARCHAR(500) NOT NULL,
        alt_text VARCHAR(255),
        caption TEXT,
        uploaded_by VARCHAR(100) DEFAULT 'system',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create blogs table with SEO fields
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        featured_image_id INTEGER REFERENCES media(id),
        author VARCHAR(100) DEFAULT 'Atiq Israk',
        status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
        published_at TIMESTAMP,
        meta_title VARCHAR(255),
        meta_description TEXT,
        meta_keywords TEXT[],
        og_title VARCHAR(255),
        og_description TEXT,
        og_image_id INTEGER REFERENCES media(id),
        twitter_title VARCHAR(255),
        twitter_description TEXT,
        twitter_image_id INTEGER REFERENCES media(id),
        canonical_url VARCHAR(500),
        reading_time INTEGER,
        view_count INTEGER DEFAULT 0,
        tags TEXT[],
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

const runMigrations = async (): Promise<void> => {
  try {
    await createTables();
    console.log("All migrations completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

runMigrations();
