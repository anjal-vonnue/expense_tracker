import { useEffect, useState } from "react";
import type { ExpenseType } from "./useRecent";
import { useExpense } from "@/context/ExpenseContext";

export const useExpenseRange = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const { token } = useExpense();

  useEffect(() => {
    const controller = new AbortController();

    const fetchExpenseRange = async () => {
      console.log("hello hello");
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/expenses/filter-by-date?fromDate=2026-10-01&toDate=2026-10-14`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("failed to fetch expenses in that range");
        }

        const result = await response.json();

        console.log("useExpense: ", result.data);

        setExpenses(result.data);
      } catch (error) {
        console.log(error);

        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("failed to fetch expenses in that range"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenseRange();

    return () => {
      controller.abort();
    };
  }, [retryCount, token]);

  useEffect(() => {
    if (expenses.length === 0) {
      return;
    }

    let totalAmount = 0;

    expenses.map((item) => {
      console.log(item.amount);

      totalAmount = totalAmount + Number(item.amount);
    });

    setTotal(totalAmount);
    setTransactionCount(expenses.length);

    console.log("TotalAmount: ", total);
  }, [expenses]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return { expenses, total, transactionCount, isLoading, error, retry };
};
