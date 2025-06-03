import { Request, Response } from "express";
import walmartAxios from "../config/axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const logRequest = (req: Request) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Headers:`, req.headers);
  console.log(`Body:`, req.body);
};

export const handleError = (res: Response, error: any, message: string) => {
  console.error('Error Details:', JSON.stringify({
    message: error?.message || message,
    status: error?.status,
    data: error?.data,
    stack: error?.stack
  }, null, 2));

  let errorMessage: string;
  let statusCode: number = error?.status || 500;

  try {
    // Attempt to handle JSON error structure
    errorMessage =
      typeof error?.data?.error === "string"
        ? error?.data?.error
        : error?.data?.error?.[0]?.info || error?.message || message;
  } catch (err) {
    // Handle circular structure or unexpected error format
    errorMessage = error?.message || message || "An error occurred, but it could not be serialized.";
    console.error("Error serialization issue:", err);
  }

  res.status(statusCode).json({ error: errorMessage, success: false });
};

const clientId = process.env.WALMART_CLIENT_ID;
const clientSecret = process.env.WALMART_CLIENT_SECRET;
const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
)}`;

export async function getWalmartToken() {
  try {
    const response = await walmartAxios.post(
      `/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
          "WM_SVC.NAME": "Walmart Marketplace",
          "WM_QOS.CORRELATION_ID": uuidv4(),
        },
      }
    );

    return response.data.access_token;
  } catch (error: any) {
    console.error("Token Error:", error?.response?.data || error?.message);
    throw error;
  }
}
