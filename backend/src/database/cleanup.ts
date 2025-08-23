import pool from "./config";

async function cleanup() {
  try {
    console.log("Starting database cleanup...");

    // Fix malformed embedding values
    await pool.query("UPDATE projects SET embedding = NULL WHERE embedding = 'null'");
    console.log("✓ Fixed malformed embedding values");

    console.log("Cleanup completed successfully!");
  } catch (error) {
    console.error("Cleanup failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

cleanup().catch(console.error);
