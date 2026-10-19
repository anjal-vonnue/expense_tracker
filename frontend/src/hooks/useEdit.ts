import { useState } from "react";
import { type ExpenseType } from "./useRecent";
import { useExpense } from "@/context/ExpenseContext";

export default function useEdit() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ExpenseType | null>(null);

  const { token } = useExpense();

  const editExpense = async (id: number, editData: Partial<ExpenseType>) => {
    setError(null);
    setIsPending(true);
    // console.log(editData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/${id}`,

        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        },
      );

      if (!response.ok) {
        throw new Error("failed to delete expense");
      }

      const result = await response.json();
      console.log(result);
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

  return { isPending, error, data, editExpense };
}
