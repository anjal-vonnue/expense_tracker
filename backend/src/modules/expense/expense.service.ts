import prisma from "../../prisma/connection.js";
import type {
  expenseSchemaInput,
  updateSchemaInput,
} from "../../zod/expense.schema.js";

export async function getExpenses() {
  const expenses = await prisma.expense.findMany();

  return expenses;
}

export async function getExpenseById(id: number) {
  const expense = await prisma.expense.findUnique({
    where: {
      id,
    },
  });

  if (!expense) {
    throw new Error("NOT_FOUND");
  }

  return expense;
}

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

export async function updateExpense(
  expense: updateSchemaInput,
  userId: number,
  expenseId: number,
) {
  const expenseFound = await prisma.expense.findFirst({
    where: {
      id: expenseId,
      userId,
    },
  });

  if (!expenseFound) {
    throw new Error("NOT_FOUND");
  }

  const updatedExpense = await prisma.expense.update({
    where: {
      id: expenseFound.id,
    },
    data: {
      ...(expense.title && { title: expense.title }),
      ...(expense.amount && { amount: expense.amount }),
      ...(expense.category && { category: expense.category }),
      ...(expense.notes && { notes: expense.notes }),
      ...(expense.expenseDate && {
        expenseDate: new Date(expense.expenseDate),
      }),
    },
  });

  return updatedExpense;
}

export async function deleteExpense(id: number) {
  const expense = await prisma.expense.findUnique({ where: { id } });

  if (!expense) {
    throw new Error("NOT_FOUND");
  }

  const deletedExpense = await prisma.expense.delete({
    where: { id: expense.id },
  });

  return deletedExpense;
}
