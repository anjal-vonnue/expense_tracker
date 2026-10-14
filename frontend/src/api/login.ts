import type { User } from "@/context/ExpenseContext";

export type LoginResponse = {
  user: User;
  token: string;
};

export async function loginApi(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("invalid email or password");
  }

  return response.json();
}
