import { useExpense } from "@/context/ExpenseContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ExpenseType } from "./useRecent";

type DeleteExpenseResponse = {
  data: ExpenseType;
};

export default function useDelete() {
  const { token } = useExpense();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number): Promise<DeleteExpenseResponse> => {
      if (!token) {
        throw new Error("authentication token is missing");
      }
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

      return response.json();
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });

  return {
    deleteExpense: deleteMutation.mutateAsync,
    isPending: deleteMutation.isPending,
    error: deleteMutation.error?.message ?? null,
    data: deleteMutation.data?.data ?? null,
    reset: deleteMutation.reset,
  };
}
