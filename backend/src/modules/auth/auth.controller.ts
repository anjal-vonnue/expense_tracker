import type { Request, Response } from "express";
import * as authServices from "./auth.service.js";
import type { AuthRequest } from "./auth.middleware.js";

export async function registerHandler(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const result = await authServices.register(name, email, password);

    return res.status(201).json({ data: result.newUser, token: result.token });
  } catch (error) {
    console.log(error);

    if (error instanceof Error && error.message === "ALREADY") {
      return res.status(409).json({ error: "unable to register" });
    }

    return res.status(500).json({ error: "internal server error" });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "all fields are required" });
    }
    const result = await authServices.login(email, password);

    return res.status(201).json({ data: result.user, token: result.token });
  } catch (error) {
    console.log(error);

    if (error instanceof Error && error.message === "INVALID") {
      return res.status(400).json({ error: "invalid email or password" });
    }

    return res.status(500).json({ error: "internal server error" });
  }
}

export async function meHandler(req: AuthRequest, res: Response) {
  try {
    const result = await authServices.whoami(Number(req.userId));
    return res.status(200).json({ data: result });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(400).json({ error: "user not found" });
    }

    return res.status(500).json({ error: "internal server error" });
  }
}
