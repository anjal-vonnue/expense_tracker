import { useExpense } from "@/context/ExpenseContext";
import { useEffect, useState } from "react";

export type ExpenseType = {
  id: number;
  title: string;
  amount: string;
  category: string;
  notes: string | null;
  expenseDate: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export default function useRecent() {
  const [recent, setRecent] = useState<ExpenseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { token } = useExpense();

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/expenses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("failed to fetch recent expenses");
        }

        const result = await response.json();

        setRecent(result.data);
        // console.log("Result: ", result.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("failed to fetch recent expenses"));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    fetchRecent();

    return () => {
      controller.abort();
    };
  }, [retryCount, token]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return { recent, isLoading, error, retry };
}
