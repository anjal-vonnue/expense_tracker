import type { User } from "@/context/ExpenseContext";

export type registerResponse = {
  user: User;
  token: string;
};

export async function registerApi(
  name: string,
  email: string,
  password: string,
): Promise<registerResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("unable to register");
  }

  return response.json();
}
