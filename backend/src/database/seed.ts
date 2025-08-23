import pool from "./config";
import { VectorSearchService } from "../services/vectorSearch";

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Get all projects without embeddings
    const result = await pool.query("SELECT * FROM projects WHERE embedding IS NULL");
    const projects = result.rows;

    if (projects.length === 0) {
      console.log("No projects found without embeddings");
      return;
    }

    console.log(`Found ${projects.length} projects without embeddings`);

    // Generate embeddings for each project
    for (const project of projects) {
      try {
        console.log(`Generating embedding for: ${project.title}`);
        
        // Create content from description if content is null
        const content = project.content || project.description || '';
        
        // Create slug from title if slug is null
        const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        
        // Set default category if null
        const category = project.category || 'Web Development';
        
        // Set featured based on technologies or make it false
        const featured = project.featured || false;

        await VectorSearchService.updateProjectEmbedding(project.id, {
          title: project.title,
          description: project.description || '',
          content: content,
          technologies: project.technologies || [],
          category: category
        });

        // Verify the embedding was created
        const verifyResult = await pool.query("SELECT embedding FROM projects WHERE id = $1", [project.id]);
        const hasEmbedding = verifyResult.rows[0]?.embedding !== null;
        console.log(`✓ Embedding verification for ${project.title}: ${hasEmbedding ? 'SUCCESS' : 'FAILED'}`);

        // Update other missing fields
        await pool.query(`
          UPDATE projects 
          SET slug = $1, content = $2, category = $3, featured = $4
          WHERE id = $5
        `, [slug, content, category, featured, project.id]);

        console.log(`✓ Updated project: ${project.title}`);
      } catch (error) {
        console.error(`Error updating project ${project.title}:`, error);
      }
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
}

seed().catch(console.error);