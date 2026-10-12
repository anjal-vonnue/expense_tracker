import prisma from "../../prisma/connection.js";

export async function getExpenses() {
  const expenses = await prisma.expense.findMany();

  return expenses;
}

export async function getExpenseById() {}

export async function createExpense() {}

export async function updateExpense() {}

export async function deleteExpense() {}
