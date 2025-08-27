import pool from "./config";

async function cleanup() {
  try {
    console.log("Starting database cleanup...");

    // Drop all tables in the correct order
    const dropQueries = [
      "DROP TABLE IF EXISTS ai_training CASCADE",
      "DROP TABLE IF EXISTS methodologies CASCADE",
      "DROP TABLE IF EXISTS expertise CASCADE",
      "DROP TABLE IF EXISTS achievements CASCADE",
      "DROP TABLE IF EXISTS certifications CASCADE",
      "DROP TABLE IF EXISTS education CASCADE",
      "DROP TABLE IF EXISTS experience CASCADE",
      "DROP TABLE IF EXISTS skills CASCADE",
      "DROP TABLE IF EXISTS projects CASCADE",
      "DROP TABLE IF EXISTS portfolio_sections CASCADE",
      "DROP TABLE IF EXISTS personal_info CASCADE"
    ];

    for (const query of dropQueries) {
      await pool.query(query);
      console.log(`✓ Dropped table: ${query.split(' ')[4]}`);
    }

    console.log("Cleanup completed successfully!");
  } catch (error) {
    console.error("Cleanup failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

cleanup().catch(console.error);
