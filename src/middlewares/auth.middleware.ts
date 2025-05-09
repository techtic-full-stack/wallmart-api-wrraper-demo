import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/extended";

export const authMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Token is missing" });
      return;
    } else {
      req.token = token;
      next();
      return;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
