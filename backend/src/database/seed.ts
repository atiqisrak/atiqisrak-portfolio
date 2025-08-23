import pool from "./config";

const seedData = async (): Promise<void> => {
  try {
    // Seed portfolio sections
    await pool.query(`
      INSERT INTO portfolio_sections (name, content) VALUES
      ('about', 'Product leader with 6+ years of experience in tech, specializing in building innovative digital solutions that drive business growth.'),
      ('hero', 'Hi, I''m Atiq Israk 👋 Product Manager, Ether Technologies 🚀')
    `);

    // Seed projects
    await pool.query(`
      INSERT INTO projects (title, description, technologies, image_url, project_url, github_url) VALUES
      ('MAVE CMS', 'Enterprise-grade headless CMS with MACH architecture', ARRAY['MACH Architecture', 'GraphQL', 'AWS'], '/mave-cms.png', 'https://mave.ethertech.ltd', 'https://github.com/example/mave-cms'),
      ('MAVE LMS', 'AI-Driven Learning Management System', ARRAY['AI/ML', 'Analytics', 'LMS'], '/mave-lms.png', 'https://mave-lms.ethertech.ltd', 'https://github.com/example/mave-lms'),
      ('Aranya E-Commerce', 'NextJS-based e-commerce platform', ARRAY['NextJS', 'Redux', 'UX Research'], '/aranya-ecommerce.png', 'https://aranya.example.com', 'https://github.com/example/aranya')
    `);

    // Seed experience
    await pool.query(`
      INSERT INTO experience (position, company, timeline, description, skills) VALUES
      ('Product Manager', 'Ether Technologies', 'June 2023 — Present', 'Leading product vision and strategy, focusing on user journey optimization and go-to-market execution.', ARRAY['Product Strategy', 'Go-to-Market Planning', 'User Journey Optimization']),
      ('Technical Project Manager', 'Navana Group', 'Aug 2020 — Mar 2023', 'Oversaw AI-driven chatbot projects and digital transformation initiatives.', ARRAY['Technical Project Management', 'AI Implementation', 'Digital Transformation']),
      ('Frontend Web Developer', 'TechCare Inc.', 'Feb 2019 — July 2020', 'Developed and productized 120+ web templates using React/NextJS.', ARRAY['Frontend Development', 'React/NextJS', 'UI/UX Design'])
    `);

    // Seed skills
    await pool.query(`
      INSERT INTO skills (name, category, proficiency) VALUES
      ('Product Strategy', 'Product Management', 90),
      ('React/NextJS', 'Frontend', 85),
      ('AI/ML', 'Technology', 80),
      ('User Experience', 'Design', 85),
      ('Project Management', 'Leadership', 90)
    `);

    // Seed media
    await pool.query(`
      INSERT INTO media (filename, original_name, mime_type, size, path, public_url, alt_text, caption) VALUES
      ('blog-featured-1.jpg', 'product-management-tips.jpg', 'image/jpeg', 245760, '/uploads/blog-featured-1.jpg', '/uploads/blog-featured-1.jpg', 'Product Management Tips', 'Featured image for product management blog'),
      ('blog-featured-2.jpg', 'ai-implementation-guide.jpg', 'image/jpeg', 198432, '/uploads/blog-featured-2.jpg', '/uploads/blog-featured-2.jpg', 'AI Implementation Guide', 'Featured image for AI implementation blog'),
      ('blog-featured-3.jpg', 'ux-design-principles.jpg', 'image/jpeg', 312456, '/uploads/blog-featured-3.jpg', '/uploads/blog-featured-3.jpg', 'UX Design Principles', 'Featured image for UX design blog')
    `);

    // Seed blogs with SEO data
    await pool.query(`
      INSERT INTO blogs (title, slug, excerpt, content, featured_image_id, author, status, published_at, meta_title, meta_description, meta_keywords, og_title, og_description, twitter_title, twitter_description, reading_time, tags, category) VALUES
      ('10 Essential Product Management Tips for 2024', 'product-management-tips-2024', 'Learn the key strategies that successful product managers use to drive growth and innovation in today''s competitive market.', 'Product management is evolving rapidly with new technologies and methodologies...', 1, 'Atiq Israk', 'published', NOW(), 'Product Management Tips 2024 - Expert Guide', 'Discover 10 essential product management strategies for 2024. Learn from industry experts about driving growth and innovation.', ARRAY['product management', 'strategy', 'innovation', 'growth'], 'Product Management Tips 2024 - Expert Guide', 'Discover 10 essential product management strategies for 2024. Learn from industry experts about driving growth and innovation.', 'Product Management Tips 2024', 'Discover 10 essential product management strategies for 2024. Learn from industry experts about driving growth and innovation.', 8, ARRAY['product management', 'strategy', 'innovation'], 'Product Management'),
      ('AI Implementation Guide: From Concept to Production', 'ai-implementation-guide', 'A comprehensive guide to implementing AI solutions in enterprise environments, covering everything from planning to deployment.', 'Artificial Intelligence is transforming how businesses operate...', 2, 'Atiq Israk', 'published', NOW(), 'AI Implementation Guide - Complete Tutorial', 'Master AI implementation with our comprehensive guide. Learn planning, development, and deployment strategies for enterprise AI solutions.', ARRAY['AI', 'machine learning', 'implementation', 'enterprise'], 'AI Implementation Guide - Complete Tutorial', 'Master AI implementation with our comprehensive guide. Learn planning, development, and deployment strategies for enterprise AI solutions.', 'AI Implementation Guide', 'Master AI implementation with our comprehensive guide. Learn planning, development, and deployment strategies for enterprise AI solutions.', 12, ARRAY['AI', 'machine learning', 'implementation'], 'Technology'),
      ('UX Design Principles That Drive User Engagement', 'ux-design-principles', 'Explore the fundamental UX design principles that create engaging and intuitive user experiences across digital platforms.', 'User Experience design is crucial for product success...', 3, 'Atiq Israk', 'published', NOW(), 'UX Design Principles - User Engagement Guide', 'Learn the fundamental UX design principles that drive user engagement and create intuitive digital experiences.', ARRAY['UX design', 'user experience', 'design principles', 'engagement'], 'UX Design Principles - User Engagement Guide', 'Learn the fundamental UX design principles that drive user engagement and create intuitive digital experiences.', 'UX Design Principles', 'Learn the fundamental UX design principles that drive user engagement and create intuitive digital experiences.', 10, ARRAY['UX design', 'user experience', 'design'], 'Design')
    `);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

const runSeeds = async (): Promise<void> => {
  try {
    await seedData();
    console.log("All seeds completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

runSeeds();
