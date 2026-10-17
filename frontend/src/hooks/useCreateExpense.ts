import { createExpenseApi, type CreateExpenseType } from "@/api/createExpense";
import { useExpense } from "@/context/ExpenseContext";
import { useExpenseRange } from "@/context/ExpenseRangeContext";
import { useState } from "react";

type CreateExpensePayload = {
  title: string;
  amount: string;
  category: string;
  expenseDate: string;
};

export function useCreateExpense() {
  const [data, setData] = useState<CreateExpenseType | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useExpense();

  const { retry } = useExpenseRange();

  const createExpense = async (payload: CreateExpensePayload) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await createExpenseApi(
        payload.title,
        payload.amount,
        payload.category,
        payload.expenseDate,
        token!,
      );

      setData(result);
      retry();
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("failed to create expenses");
      }
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return {
    data,
    isPending,
    error,
    createExpense,
    setError,
  };
}
