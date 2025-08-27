import pool from "../config";

export async function seedCertifications(data: any) {
  console.log("Seeding certifications...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM certifications LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Certifications already exist, skipping...");
    return;
  }

  for (const cert of data) {
    const query = `
      INSERT INTO certifications (name, issuer, issue_date, expiry_date, credential_id, credential_url, description, skills_covered)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    
    // Parse year to date format
    const issueDate = cert.year ? `${cert.year}-01-01` : null;
    
    await pool.query(query, [
      cert.name,
      cert.issuer,
      issueDate,
      null, // expiry_date not provided
      '', // credential_id not provided
      cert.url || '',
      '', // description not provided
      [] // skills_covered not provided
    ]);
  }
  
  console.log("✓ Certifications seeded");
}
