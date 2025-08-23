import pool from './src/database/config';
import { VectorSearchService } from './src/services/vectorSearch';

async function testVectorSearch() {
  try {
    console.log("Testing vector search functionality...");
    
    const query = "React web application";
    const limit = 3;
    const threshold = 0.6;
    
    console.log("1. Generating query embedding...");
    const queryEmbedding = await VectorSearchService.createProjectEmbedding({
      title: query,
      description: query,
      content: query,
      technologies: [],
      category: ""
    });
    console.log(`✓ Query embedding generated, length: ${queryEmbedding.length}`);
    
    console.log("2. Testing vector similarity search query...");
    const searchQuery = `
      SELECT 
        id, title, description, content, slug, image_url, github_url, 
        live_url, technologies, category, featured, created_at, updated_at,
        1 - (embedding <=> $1) as similarity
      FROM projects 
      WHERE 1 - (embedding <=> $1) > $2
      ORDER BY embedding <=> $1
      LIMIT $3
    `;
    
    console.log("3. Executing search query...");
    const result = await pool.query(searchQuery, [queryEmbedding, threshold, limit]);
    console.log(`✓ Search query executed successfully`);
    console.log(`Results found: ${result.rows.length}`);
    
    if (result.rows.length > 0) {
      console.log("Sample result:", {
        id: result.rows[0].id,
        title: result.rows[0].title,
        similarity: result.rows[0].similarity
      });
    }
    
  } catch (error) {
    console.error("Vector search test failed:", error);
  } finally {
    await pool.end();
  }
}

testVectorSearch();
