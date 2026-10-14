import { loginApi } from "@/api/login";
import { registerApi } from "@/api/register";
import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type ExpenseContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("expense-user");
    const savedToken = localStorage.getItem("expense-token");

    if (savedUser && savedToken) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const data = await loginApi(email, password);

    console.log(data);

    localStorage.setItem("expense-user", JSON.stringify(data.data));
    localStorage.setItem("expense-token", data.token);
  }

  async function register(name: string, email: string, password: string) {
    const data = await registerApi(name, email, password);
    localStorage.setItem("expense-user", JSON.stringify(data.user));
    localStorage.setItem("expense-token", data.token);

    setUser(data.user);
    setToken(data.token);
  }

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("expense-user");
    localStorage.removeItem("expense-token");
  }

  return (
    <ExpenseContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("context is undefined");
  }

  return context;
}
