import pool from "../config";

export async function seedPortfolioSections() {
  console.log("Seeding portfolio sections...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM portfolio_sections LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Portfolio sections already exist, skipping...");
    return;
  }

  const sections = [
    {
      name: 'hero',
      title: 'Atiq Israk Niloy',
      content: 'Full Stack Developer & AI Enthusiast',
      metadata: { type: 'hero', order: 1 }
    },
    {
      name: 'about',
      title: 'About Me',
      content: 'Passionate developer with expertise in modern web technologies and AI integration',
      metadata: { type: 'about', order: 2 }
    },
    {
      name: 'contact',
      title: 'Get In Touch',
      content: 'Ready to collaborate on your next project',
      metadata: { type: 'contact', order: 3 }
    }
  ];

  for (const section of sections) {
    const query = `
      INSERT INTO portfolio_sections (name, title, content, metadata)
      VALUES ($1, $2, $3, $4)
    `;
    
    await pool.query(query, [
      section.name,
      section.title,
      section.content,
      JSON.stringify(section.metadata)
    ]);
  }
  
  console.log("✓ Portfolio sections seeded");
}
