export type CreateExpenseType = {
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

export async function createExpenseApi(
  title: string,
  amount: string,
  category: string,
  expenseDate: string,
  token: string,
): Promise<CreateExpenseType> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, amount, category, expenseDate }),
  });

  if (!response.ok) {
    throw new Error("error while creating post");
  }

  return response.json();
}
