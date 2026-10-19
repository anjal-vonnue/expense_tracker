import type { ExpenseType } from "@/hooks/useRecent";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useExpense } from "./ExpenseContext";
import type { ChartData } from "@/components/page/SpendingCategory";

type ExpenseRangeContextType = {
  dateRange: string[];
  expenses: ExpenseType[];
  total: number;
  transactionCount: number;
  category: ChartData[];
  highestPaid: ChartData | null;
  isLoading: boolean;
  error: Error | null;
  expenseChange: number;
  transactionChange: number;
  retry: () => void;
  setDateRange: (range: string[]) => void;
};

const ExpenseRangeContext = createContext<ExpenseRangeContextType | undefined>(
  undefined,
);

export function ExpenseRangeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useExpense();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const shiftDays = (value: string, days: number) => {
    const [y, m, d] = value.split("-").map((number) => Number(number));
    return formatDate(new Date(y, m - 1, d + days));
  };

  const today = new Date();

  const [dateRange, setDateRange] = useState<string[]>([
    formatDate(new Date(today.getFullYear(), today.getMonth(), 1)),
    formatDate(today),
  ]);

  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [preExpenses, setPreExpenses] = useState<ExpenseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!token || dateRange.length !== 2) {
      setExpenses([]);
      setPreExpenses([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchExpenseRange = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          fromDate: dateRange[0],
          toDate: dateRange[1],
        });

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/expenses/filter-by-date?${params}`,
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

        setExpenses(result.data);

        const preParams = new URLSearchParams({
          fromDate: shiftDays(dateRange[0], -30),
          toDate: shiftDays(dateRange[0], -1),
        });

        const preResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/expenses/filter-by-date?${preParams}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!preResponse.ok) {
          throw new Error("failed to fetch expenses in that range");
        }

        const preResult = await preResponse.json();

        setPreExpenses(preResult.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("failed to fetch expenses in that range"));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchExpenseRange();

    return () => controller.abort();
  }, [token, dateRange, retryCount]);

  const transactionCount = expenses.length;

  let total = 0;

  const category: ChartData[] = [
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
    const amount = Number(item.amount) || 0;

    total += amount;

    const matchCategory = category.find(
      (c) => c.category.toLowerCase() === String(item.category).toLowerCase(),
    );

    if (matchCategory) {
      matchCategory.spend += amount;
    }
  });

  let preTotal = 0;
  preExpenses.forEach((item) => {
    preTotal += Number(item.amount) || 0;
  });

  const highestPaid = category
    .filter((item) => item.spend > 0)
    .sort((a, b) => b.spend - a.spend)[0];

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  function percentageChange(current: number, previous: number) {
    return previous === 0 ? 0 : ((current - previous) / previous) * 100;
  }

  const expenseChange = percentageChange(total, preTotal);
  const transactionChange = percentageChange(
    transactionCount,
    preExpenses.length,
  );

  console.log("PRE TOTAL: ", preTotal);
  console.log("PRE LENGTH: ", preExpenses.length);

  return (
    <ExpenseRangeContext.Provider
      value={{
        dateRange,
        expenses,
        total,
        transactionCount,
        category,
        highestPaid,
        isLoading,
        error,
        expenseChange,
        transactionChange,
        retry,
        setDateRange,
      }}
    >
      {children}
    </ExpenseRangeContext.Provider>
  );
}

export function useExpenseRange() {
  const context = useContext(ExpenseRangeContext);
  if (!context) {
    throw new Error(
      "useExpenseRange should be wrapped in ExpenseRangeProvider",
    );
  }

  return context;
}
