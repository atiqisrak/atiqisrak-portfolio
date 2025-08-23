import express, { Request, Response } from "express";
import pool from "../database/config";
import { VectorSearchService } from "../services/vectorSearch";
import { OpenAIService } from "../services/openai";

const router: express.Router = express.Router();

/**
 * @swagger
 * /api/portfolio/sections:
 *   get:
 *     summary: Get all portfolio sections
 *     description: Retrieve all portfolio sections like about, hero, etc.
 *     tags: [Portfolio Sections]
 *     responses:
 *       200:
 *         description: List of portfolio sections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PortfolioSection'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/sections", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM portfolio_sections ORDER BY name");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch portfolio sections" });
  }
});

/**
 * @swagger
 * /api/portfolio/sections/{name}:
 *   get:
 *     summary: Get portfolio section by name
 *     description: Retrieve a specific portfolio section by its name
 *     tags: [Portfolio Sections]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the portfolio section
 *     responses:
 *       200:
 *         description: Portfolio section details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PortfolioSection'
 *       404:
 *         description: Section not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/sections/:name", async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const result = await pool.query("SELECT * FROM portfolio_sections WHERE name = $1", [name]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Section not found" });
    }
    
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch portfolio section" });
  }
});

/**
 * @swagger
 * /api/portfolio/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve all portfolio projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/projects", async (req: Request, res: Response) => {
  try {
    const projects = await VectorSearchService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

/**
 * @swagger
 * /api/portfolio/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     description: Retrieve a specific project by its ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/projects/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Failed to fetch project" });
    }
    
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch project" });
  }
});

/**
 * @swagger
 * /api/portfolio/experience:
 *   get:
 *     summary: Get all experience
 *     description: Retrieve all work experience entries
 *     tags: [Experience]
 *     responses:
 *       200:
 *         description: List of experience entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/experience", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM experience ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experience" });
  }
});

/**
 * @swagger
 * /api/portfolio/experience/{id}:
 *   get:
 *     summary: Get experience by ID
 *     description: Retrieve a specific experience entry by its ID
 *     tags: [Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Experience details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/experience/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM experience WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Experience not found" });
    }
    
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch experience" });
  }
});

/**
 * @swagger
 * /api/portfolio/skills:
 *   get:
 *     summary: Get all skills
 *     description: Retrieve all skills organized by category
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: List of skills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/skills", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM skills ORDER BY category, proficiency DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

/**
 * @swagger
 * /api/portfolio/skills/category/{category}:
 *   get:
 *     summary: Get skills by category
 *     description: Retrieve skills filtered by a specific category
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill category
 *     responses:
 *       200:
 *         description: List of skills in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/skills/category/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const result = await pool.query("SELECT * FROM skills WHERE category = $1 ORDER BY proficiency DESC", [category]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills by category" });
  }
});

/**
 * @swagger
 * /api/portfolio/blogs:
 *   get:
 *     summary: Get all published blogs
 *     description: Retrieve all published blog posts with featured images
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of published blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/blogs", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT b.*, m.public_url as featured_image_url 
      FROM blogs b 
      LEFT JOIN media m ON b.featured_image_id = m.id 
      WHERE b.status = 'published' 
      ORDER BY b.published_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/**
 * @swagger
 * /api/portfolio/blogs/{slug}:
 *   get:
 *     summary: Get blog by slug
 *     description: Retrieve a specific blog post by its slug and increment view count
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post slug
 *     responses:
 *       200:
 *         description: Blog post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/blogs/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(`
      SELECT b.*, m.public_url as featured_image_url 
      FROM blogs b 
      LEFT JOIN media m ON b.featured_image_id = m.id 
      WHERE b.slug = $1 AND b.status = 'published'
    `, [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    
    // Increment view count
    await pool.query("UPDATE blogs SET view_count = view_count + 1 WHERE id = $1", [result.rows[0].id]);
    
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch blog" });
  }
});

/**
 * @swagger
 * /api/portfolio/blogs/category/{category}:
 *   get:
 *     summary: Get blogs by category
 *     description: Retrieve published blog posts filtered by category
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog category
 *     responses:
 *       200:
 *         description: List of blogs in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/blogs/category/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const result = await pool.query(`
      SELECT b.*, m.public_url as featured_image_url 
      FROM blogs b 
      LEFT JOIN media m ON b.featured_image_id = m.id 
      WHERE b.category = $1 AND b.status = 'published' 
      ORDER BY b.published_at DESC
    `, [category]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs by category" });
  }
});

/**
 * @swagger
 * /api/portfolio/media:
 *   get:
 *     summary: Get all media
 *     description: Retrieve all media files
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: List of media files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Media'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/media", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM media ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

/**
 * @swagger
 * /api/portfolio/media/{id}:
 *   get:
 *     summary: Get media by ID
 *     description: Retrieve a specific media file by its ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Media ID
 *     responses:
 *       200:
 *         description: Media file details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       404:
 *         description: Media not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/media/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM media WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Media not found" });
    }
    
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch media" });
  }
});

/**
 * @swagger
 * /api/portfolio/projects/search:
 *   post:
 *     summary: Search projects using vector similarity
 *     description: Search for projects using semantic similarity with OpenAI embeddings
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: Search query text
 *               limit:
 *                 type: integer
 *                 description: Maximum number of results (default: 5)
 *               threshold:
 *                 type: number
 *                 description: Similarity threshold (default: 0.7)
 *     responses:
 *       200:
 *         description: List of similar projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/projects/search", async (req: Request, res: Response) => {
  try {
    const { query, limit = 5, threshold = 0.7 } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const projects = await VectorSearchService.searchSimilarProjects(query, limit, threshold);
    return res.json(projects);
  } catch (error) {
    console.error("Vector search error:", error);
    return res.status(500).json({ error: "Failed to perform vector search" });
  }
});

/**
 * @swagger
 * /api/portfolio/projects/technology/:tech:
 *   get:
 *     summary: Get projects by technology
 *     description: Retrieve projects that use a specific technology
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: tech
 *         required: true
 *         schema:
 *           type: string
 *         description: Technology name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of results (default: 10)
 *     responses:
 *       200:
 *         description: List of projects using the technology
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/projects/technology/:tech", async (req: Request, res: Response) => {
  try {
    const { tech } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const projects = await VectorSearchService.searchByTechnology(tech, limit);
    return res.json(projects);
  } catch (error) {
    console.error("Technology search error:", error);
    return res.status(500).json({ error: "Failed to search projects by technology" });
  }
});

/**
 * @swagger
 * /api/portfolio/projects/featured:
 *   get:
 *     summary: Get featured projects
 *     description: Retrieve all featured projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of results (default: 6)
 *     responses:
 *       200:
 *         description: List of featured projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/projects/featured", async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    const projects = await VectorSearchService.getFeaturedProjects(limit);
    return res.json(projects);
  } catch (error) {
    console.error("Featured projects error:", error);
    return res.status(500).json({ error: "Failed to fetch featured projects" });
  }
});

/**
 * @swagger
 * /api/portfolio/projects/slug/:slug:
 *   get:
 *     summary: Get project by slug
 *     description: Retrieve a specific project by its slug
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Project slug
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/slug'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/projects/slug/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await VectorSearchService.getProjectBySlug(slug);
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    return res.json(project);
  } catch (error) {
    console.error("Project by slug error:", error);
    return res.status(500).json({ error: "Failed to fetch project" });
  }
});

/**
 * @swagger
 * /api/portfolio/ai/optimize-query:
 *   post:
 *     summary: Optimize search query using AI
 *     description: Use OpenAI to optimize a search query for better results
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *         schema:
 *           type: object
 *           properties:
 *             query:
 *               type: string
 *               description: Original search query
 *     responses:
 *       200:
 *         description: Optimized search query
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               optimized_query:
 *                 type: string
 *                 description: AI-optimized search query
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/ai/optimize-query", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const optimizedQuery = await OpenAIService.searchSimilarProjects(query);
    return res.json({ optimized_query: optimizedQuery });
  } catch (error) {
    console.error("Query optimization error:", error);
    return res.status(500).json({ error: "Failed to optimize query" });
  }
});

export default router;
