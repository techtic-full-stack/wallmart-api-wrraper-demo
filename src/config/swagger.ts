// src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Walmart API Wrapper",
      version: "1.0.0",
      description: "API documentation for Walmart API Wrapper",
    },
    servers: [
      {
        url: process.env.HOSTNAME || "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/docs/swagger-docs.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
