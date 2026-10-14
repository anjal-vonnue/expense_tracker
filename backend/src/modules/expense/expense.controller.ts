import type { Response } from "express";
import type { AuthRequest } from "../auth/auth.middleware.js";
import * as expenseService from "./expense.service.js";
import {
  expenseSchema,
  filterDateSchema,
  updateExpenseSchema,
} from "../../zod/expense.schema.js";
import { idSchema } from "../../zod/id.schema.js";
import { querySchema } from "../../zod/query.schema.js";

export async function getHandler(req: AuthRequest, res: Response) {
  try {
    const validation = querySchema.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({
        error: "validation failed",
        details: validation.error.flatten().fieldErrors,
      });
    }

    const result = await expenseService.getExpenses(
      validation.data,
      Number(req.userId),
    );
    return res.status(200).json({
      data: result.expenses,
      pagination: result.pagination,
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
    const validation = updateExpenseSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: "validation error",
        details: validation.error.flatten().fieldErrors,
      });
    }

    const idValidation = idSchema.safeParse(req.params.id);
    if (!idValidation.success) {
      return res.status(400).json({
        error: "validation error",
        details: idValidation.error.flatten().formErrors,
      });
    }

    const result = await expenseService.updateExpense(
      validation.data,
      Number(req.userId),
      idValidation.data,
    );

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(500).json({ error: "internal server error" });
  }
}

export async function deleteHandler(req: AuthRequest, res: Response) {
  try {
    const validation = idSchema.safeParse(req.params.id);

    if (!validation.success) {
      return res.status(400).json({
        error: "validation error",
        details: validation.error.flatten().formErrors,
      });
    }

    const result = await expenseService.deleteExpense(validation.data);

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "not found" });
    }

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
    const result = await expenseService.getExpenseById(
      validation.data,
      Number(req.userId),
    );

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(500).json({ error: "internal server error" });
  }
}

export async function filterByDateHandler(req: AuthRequest, res: Response) {
  try {
    console.log("hello");

    const validation = filterDateSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: "validation error",
        details: validation.error.flatten().formErrors,
      });
    }

    const result = await expenseService.filterExpense(
      req.body,
      Number(req.userId),
    );

    return res.status(200).json({ date: result });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "internal server error" });
  }
}
