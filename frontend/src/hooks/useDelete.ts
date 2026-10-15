import { useState } from "react";
import { type ExpenseType } from "./useRecent";
import { useExpense } from "@/context/ExpenseContext";

export default function useDelete() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ExpenseType | null>(null);

  const { token } = useExpense();

  const deleteExpense = async (id: number) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/${id}`,

        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("failed to delete expense");
      }

      const result = await response.json();

      setData(result.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("failed to fetch recent expenses");
      }
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, error, data, deleteExpense };
}
