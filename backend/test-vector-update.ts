import pool from './src/database/config';
import { VectorSearchService } from './src/services/vectorSearch';

async function testVectorUpdate() {
  try {
    console.log("Testing vector update functionality...");
    
    // Test with a simple project
    const projectData = {
      title: "Test Project",
      description: "A test project for vector search",
      content: "This is a test project content",
      technologies: ["React", "Node.js"],
      category: "Web Development"
    };
    
    console.log("1. Generating embedding...");
    const embedding = await VectorSearchService.createProjectEmbedding(projectData);
    console.log(`✓ Embedding generated, length: ${embedding.length}`);
    
    console.log("2. Formatting vector string...");
    const vectorString = `[${embedding.join(',')}]`;
    console.log(`✓ Vector string created, length: ${vectorString.length}`);
    
    console.log("3. Testing database update...");
    const query = `
      UPDATE projects 
      SET embedding = $1::vector, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `;
    
    const result = await pool.query(query, [vectorString]);
    console.log(`✓ Database update successful, rows affected: ${result.rowCount}`);
    
    console.log("4. Verifying update...");
    const checkResult = await pool.query("SELECT embedding FROM projects WHERE id = 1");
    const hasEmbedding = checkResult.rows[0]?.embedding !== null;
    console.log(`✓ Embedding verification: ${hasEmbedding ? 'SUCCESS' : 'FAILED'}`);
    
  } catch (error) {
    console.error("Vector update test failed:", error);
  } finally {
    await pool.end();
  }
}

testVectorUpdate();
