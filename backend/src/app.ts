import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

// Import routes and swagger
import healthRoutes from "./routes/health";
import portfolioRoutes from "./routes/portfolio";
import { specs } from "./swagger";

// Load environment variables
dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 5001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));
app.use(morgan("combined"));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder
app.use("/uploads", express.static("uploads"));

// Swagger UI - Make this the landing page
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Portfolio Backend API Documentation",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    docExpansion: "list",
    filter: true,
    showRequestHeaders: true,
  },
}));

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/portfolio", portfolioRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;
