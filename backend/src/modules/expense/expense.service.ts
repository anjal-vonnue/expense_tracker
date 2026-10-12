import { CategoryType } from "../../generated/prisma/enums.js";
import prisma from "../../prisma/connection.js";
import type { expenseSchemaInput } from "../../zod/expense.schema.js";

type Expense = {
  title: string;
  amount: string;
  category: string;
  expenseDate: string;
  notes?: string;
};

export async function getExpenses() {
  const expenses = await prisma.expense.findMany();

  return expenses;
}

export async function getExpenseById() {}

export async function createExpense(
  expense: expenseSchemaInput,
  userId: number,
) {
  const newExpense = await prisma.expense.create({
    data: {
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      ...(expense.expenseDate && {
        expenseDate: new Date(expense.expenseDate),
      }),
      ...(expense.notes && { notes: expense.notes }),
      userId,
    },
  });

  return newExpense;
}

export async function updateExpense() {}

export async function deleteExpense() {}
