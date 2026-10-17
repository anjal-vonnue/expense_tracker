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

type PaginationType = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export default function useGetExpenses() {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { token } = useExpense();
  const [pageSize, setPageSize] = useState<number>(13);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationType | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecent = async () => {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });

      if (search.trim()) {
        params.set("search", search);
      }

      if (category.trim()) {
        params.set("category", category);
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/expenses?${params}`,
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

        setExpenses(result.data);
        setPagination(result.pagination);
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
        setIsLoading(false);
      }
    };
    fetchRecent();

    return () => {
      controller.abort();
    };
  }, [retryCount, token, page, pageSize, search, category]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return {
    expenses,
    isLoading,
    error,
    page,
    pagination,
    pageSize,
    setPage,
    setCategory,
    setSearch,
    retry,
    setPageSize,
  };
}
