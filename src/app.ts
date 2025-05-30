import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { sequelize } from "./config/db";
import { startOrderSyncJob } from "./jobs/orderSync";
import walmartRoutes from "./routes/walmart.routes";
import authRoutes from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

dotenv.config();
const app = express();

app.use(express.json());

sequelize.sync().then(() => {
  console.log("Database connected.");
  startOrderSyncJob();
});

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use("/auth", authRoutes)

app.use(authMiddleware);

app.use("/walmart", walmartRoutes);

export default app;
