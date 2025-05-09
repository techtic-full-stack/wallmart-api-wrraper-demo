import { Request, Response } from "express";
import { getWalmartToken, handleError } from "../helpers/utils";
import dotenv from "dotenv";
dotenv.config();

export const getToken = async (req: Request, res: Response) => {
  try {
    const clientId = process.env.WALMART_CLIENT_ID;
    const clientSecret = process.env.WALMART_CLIENT_SECRET;

    const headerClientId = req.headers["x-api-key"] as string;
    const headerClientSecret = req.headers["x-api-secret"] as string;

    if (headerClientId !== clientId || headerClientSecret !== clientSecret) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const token = await getWalmartToken();
    res.json({ success: true, data: { token } });
    return;
  } catch (error) {
    handleError(res, error, "Failed to fetch Walmart token");
    return;
  }
};
