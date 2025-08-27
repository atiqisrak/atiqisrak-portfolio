import pool from "../config";

export async function seedEducation(data: any) {
  console.log("Seeding education...");
  
  // Check if already exists
  const existing = await pool.query("SELECT id FROM education LIMIT 1");
  if (existing.rows.length > 0) {
    console.log("Education already exists, skipping...");
    return;
  }

  for (const edu of data) {
    const query = `
      INSERT INTO education (institution, degree, field_of_study, start_date, end_date, gpa, achievements, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    
    // Parse year to date format
    const startDate = edu.year ? `${edu.year}-01-01` : null;
    
    await pool.query(query, [
      edu.institution,
      edu.degree,
      edu.field || '',
      startDate,
      null, // end_date not provided
      null, // gpa not provided
      [], // achievements not provided
      '' // description not provided
    ]);
  }
  
  console.log("✓ Education seeded");
}
