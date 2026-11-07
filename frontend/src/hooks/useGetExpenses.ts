import { useExpense } from "@/context/ExpenseContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

type ExpenseResponse = {
  data: ExpenseType[];
  pagination: PaginationType;
};

export default function useGetExpenses() {
  const { token } = useExpense();

  const [pageSize, setPageSize] = useState(13);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const expensesQuery = useQuery({
    queryKey: [
      "expenses",
      token,
      { page, pageSize, search: search.trim(), category: category.trim() },
    ],
    queryFn: async ({ signal }): Promise<ExpenseResponse> => {
      if (!token) {
        throw new Error("authenticatoin token is missing");
      }

      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (category.trim()) {
        params.set("category", category.trim());
      }

      console.log("Token exists:", !!token);
      console.log("Token type:", typeof token);
      console.log("Token parts:", token?.split(".").length);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal,
        },
      );

      if (!response.ok) {
        throw new Error("failed to fetch recent expenses");
      }

      return response.json();
    },

    enabled: Boolean(token),
    staleTime: 30_000,
  });

  return {
    expenses: expensesQuery.data?.data ?? [],
    pagination: expensesQuery.data?.pagination ?? null,

    isLoading: expensesQuery.isLoading,
    isFetching: expensesQuery.isFetching,
    error: expensesQuery.error,

    page,
    pageSize,
    setPage,
    setPageSize,

    setCategory: (value: string) => {
      setCategory(value);
      setPage(1);
    },

    setSearch: (value: string) => {
      setSearch(value);
      setPage(1);
    },

    retry: () => expensesQuery.refetch(),
  };
}
