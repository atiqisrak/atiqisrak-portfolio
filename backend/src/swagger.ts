import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio Backend API",
      version: "1.0.0",
      description: "Complete API documentation for Portfolio Backend with blogs, projects, experience, and media management",
      contact: {
        name: "Atiq Israk",
        email: "atiqisrak@gmail.com",
        url: "https://atiqisrak.vercel.app",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Development server",
      },
      {
        url: "https://api.atiqisrak.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        PortfolioSection: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "about" },
            content: { type: "string", example: "Product leader with 6+ years of experience..." },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "MAVE CMS" },
            description: { type: "string", example: "Enterprise-grade headless CMS..." },
            technologies: { type: "array", items: { type: "string" }, example: ["MACH Architecture", "GraphQL", "AWS"] },
            image_url: { type: "string", example: "/mave-cms.png" },
            project_url: { type: "string", example: "https://mave.ethertech.ltd" },
            github_url: { type: "string", example: "https://github.com/example/mave-cms" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Experience: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            position: { type: "string", example: "Product Manager" },
            company: { type: "string", example: "Ether Technologies" },
            timeline: { type: "string", example: "June 2023 — Present" },
            description: { type: "string", example: "Leading product vision and strategy..." },
            skills: { type: "array", items: { type: "string" }, example: ["Product Strategy", "Go-to-Market Planning"] },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Skill: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Product Strategy" },
            category: { type: "string", example: "Product Management" },
            proficiency: { type: "integer", minimum: 1, maximum: 100, example: 90 },
            created_at: { type: "string", format: "date-time" },
          },
        },
        Media: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            filename: { type: "string", example: "blog-featured-1.jpg" },
            original_name: { type: "string", example: "product-management-tips.jpg" },
            mime_type: { type: "string", example: "image/jpeg" },
            size: { type: "integer", example: 245760 },
            path: { type: "string", example: "/uploads/blog-featured-1.jpg" },
            public_url: { type: "string", example: "/uploads/blog-featured-1.jpg" },
            alt_text: { type: "string", example: "Product Management Tips" },
            caption: { type: "string", example: "Featured image for product management blog" },
            uploaded_by: { type: "string", example: "system" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Blog: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "10 Essential Product Management Tips for 2024" },
            slug: { type: "string", example: "product-management-tips-2024" },
            excerpt: { type: "string", example: "Learn the key strategies..." },
            content: { type: "string", example: "Product management is evolving rapidly..." },
            featured_image_id: { type: "integer", example: 1 },
            featured_image_url: { type: "string", example: "/uploads/blog-featured-1.jpg" },
            author: { type: "string", example: "Atiq Israk" },
            status: { type: "string", enum: ["draft", "published", "archived"], example: "published" },
            published_at: { type: "string", format: "date-time" },
            meta_title: { type: "string", example: "Product Management Tips 2024 - Expert Guide" },
            meta_description: { type: "string", example: "Discover 10 essential product management strategies..." },
            meta_keywords: { type: "array", items: { type: "string" }, example: ["product management", "strategy", "innovation"] },
            og_title: { type: "string", example: "Product Management Tips 2024 - Expert Guide" },
            og_description: { type: "string", example: "Discover 10 essential product management strategies..." },
            og_image_id: { type: "integer", nullable: true },
            twitter_title: { type: "string", example: "Product Management Tips 2024" },
            twitter_description: { type: "string", example: "Discover 10 essential product management strategies..." },
            twitter_image_id: { type: "integer", nullable: true },
            canonical_url: { type: "string", nullable: true },
            reading_time: { type: "integer", example: 8 },
            view_count: { type: "integer", example: 0 },
            tags: { type: "array", items: { type: "string" }, example: ["product management", "strategy", "innovation"] },
            category: { type: "string", example: "Product Management" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        HealthResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "healthy" },
            timestamp: { type: "string", format: "date-time" },
            database: { type: "string", example: "connected" },
            uptime: { type: "number", example: 108.6855945 },
            error: { type: "string", nullable: true },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string", example: "Resource not found" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/app.ts"],
};

export const specs = swaggerJsdoc(options);
