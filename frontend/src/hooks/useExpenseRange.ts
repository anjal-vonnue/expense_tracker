import { useEffect, useState } from "react";
import type { ExpenseType } from "./useRecent";
import { useExpense } from "@/context/ExpenseContext";
import type { ChartData } from "@/components/page/SpendingCategory";

export const useExpenseRange = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [category, setCategory] = useState<ChartData[]>([]);
  const [highestPaid, setHighestPaid] = useState<
    Record<string, number | string>
  >({});
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

    const categorySpend: ChartData[] = [
      { category: "food", spend: 0, fill: "var(--color-food)" },
      { category: "transport", spend: 0, fill: "var(--color-transport)" },
      { category: "shopping", spend: 0, fill: "var(--color-shopping)" },
      { category: "bills", spend: 0, fill: "var(--color-bills)" },
      {
        category: "entertainment",
        spend: 0,
        fill: "var(--color-entertainment)",
      },
      { category: "others", spend: 0, fill: "var(--color-others)" },
    ];

    expenses.forEach((item) => {
      console.log(item.amount);

      const amount = Number(item.amount) || 0;

      totalAmount += amount;

      const matchCategory = categorySpend.find(
        (c) => c.category.toLowerCase() === String(item.category).toLowerCase(),
      );

      if (matchCategory) {
        matchCategory.spend += amount;
      }
    });

    const highestCategory = categorySpend
      .filter((item) => item.spend > 0)
      .sort((a, b) => b.spend - a.spend)[0];

    setTotal(totalAmount);
    setTransactionCount(expenses.length);
    setCategory(categorySpend);

    setHighestPaid(highestCategory);
  }, [expenses]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return {
    expenses,
    total,
    transactionCount,
    category,
    highestPaid,
    isLoading,
    error,
    retry,
  };
};
