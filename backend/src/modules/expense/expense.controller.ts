import type { Response } from "express";
import type { AuthRequest } from "../auth/auth.middleware.js";
import * as expenseService from "./expense.service.js";

export async function getHandler(req: AuthRequest, res: Response) {
  try {
    const result = await expenseService.getExpenses();

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}

export async function postHandler(req: AuthRequest, res: Response) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}

export async function udpateHandler(req: AuthRequest, res: Response) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}

export async function deleteHandler(req: AuthRequest, res: Response) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}

export async function getByIdHandler(req: AuthRequest, res: Response) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
}
