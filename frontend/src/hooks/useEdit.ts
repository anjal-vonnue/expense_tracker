import { useExpense } from "@/context/ExpenseContext";
import type { ExpenseType } from "./useRecent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditExpenseResponse = {
  data: ExpenseType;
};

export default function useEdit() {
  const { token } = useExpense();
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async ({
      id,
      editData,
    }: {
      id: number;
      editData: Partial<ExpenseType>;
    }): Promise<EditExpenseResponse> => {
      if (!token) {
        throw new Error("authentication token is missing");
      }

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

      return response.json();
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });

  return {
    editExpense: editMutation.mutateAsync,
    isPending: editMutation.isPending,
    error: editMutation.error?.message ?? null,
    data: editMutation.data?.data ?? null,
    reset: editMutation.reset,
  };
}
