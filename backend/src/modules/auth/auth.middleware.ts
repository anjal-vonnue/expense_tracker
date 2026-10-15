import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  userId?: number;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res
        .status(401)
        .json({ error: "authorization headers are missing" });
    }

    const [name, token] = authorization.split(" ");
    if (name !== "Bearer" || !token) {
      return res.status(401).json({ error: "invalid headers" });
    }

    const payload = jwt.verify(token, JWT_SECRET!) as { userId: number };

    req.userId = payload.userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "invalid or expired token" });
  }
}
