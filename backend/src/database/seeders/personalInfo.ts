import pool from "../config";

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  resume_url: string;
  contact_info: any;
  social_links: any;
}

export async function seedPersonalInfo(data: any) {
  console.log("Seeding personal info...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM personal_info LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Personal info already exists, skipping...");
    return;
  }

  const query = `
    INSERT INTO personal_info (name, title, bio, avatar_url, resume_url, contact_info, social_links)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  
  await pool.query(query, [
    data.name || 'Atiq Israk Niloy',
    data.title || 'Full Stack Developer',
    data.bio || '',
    data.avatar_url || '',
    data.resume_url || '',
    JSON.stringify(data.contact_info || {}),
    JSON.stringify(data.social_links || {})
  ]);
  
  console.log("✓ Personal info seeded");
}
