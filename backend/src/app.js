import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.js";
import swaggerSpec from "./config/swagger.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();


// Security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// CORS
app.use(cors());


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve uploads folder
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// API routes
app.use("/api", routes);


// Root route
app.get("/", (req, res) => {
  res.send("Netson Solar System API running 🚀");
});


// Global error handler
app.use(errorHandler);

export default app;