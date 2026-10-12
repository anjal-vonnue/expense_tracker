import type { Response } from "express";
import type { AuthRequest } from "../auth/auth.middleware.js";
import * as expenseService from "./expense.service.js";
import { Result } from "pg";
import { expenseSchema } from "../../zod/expense.schema.js";
import { error } from "node:console";
import { idSchema } from "../../zod/id.schema.js";

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
    const validation = expenseSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: "validation failed",
        details: validation.error.flatten().fieldErrors,
      });
    }

    const expenseData = {
      title: validation.data.title,
      amount: validation.data.amount,
      category: validation.data.category,
      expenseDate: validation.data.expenseDate,
      notes: validation.data.notes,
    };
    const result = await expenseService.createExpense(
      expenseData,
      Number(req.userId),
    );
    return res.status(201).json({
      data: result,
    });
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
    const validation = idSchema.safeParse(req.params.id);

    if (!validation.success) {
      return res.status(400).json({
        error: "validation error",
        details: validation.error.flatten().formErrors,
      });
    }
    const result = await expenseService.getExpenseById(validation.data);

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(500).json({ error: "internal server error" });
  }
}
