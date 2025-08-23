import express, { Request, Response } from "express";
import pool from "../database/config";
import { HealthResponse } from "../types";

const router: express.Router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check the health status of the API and database connection
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy and database is connected
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       500:
 *         description: API is unhealthy or database is disconnected
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    // Test database connection
    await pool.query("SELECT NOW()");

    const response: HealthResponse = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      uptime: process.uptime(),
    };

    res.json(response);
  } catch (error) {
    const response: HealthResponse = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      uptime: process.uptime(),
      error: error instanceof Error ? error.message : "Unknown error",
    };

    res.status(500).json(response);
  }
});

export default router;
