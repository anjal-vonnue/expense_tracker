import { loginApi } from "@/api/login";
import { meApi } from "@/api/me";
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
  error: string | null;
  registerError: string | null;
  setRegisterError: (error: string | null) => void;
  setErrorFn: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const savedUser = localStorage.getItem("expense-user");
      const savedToken = localStorage.getItem("expense-token");

      if (!savedUser || !savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await meApi(savedToken);

        setToken(savedToken);
        setUser(data.data);
      } catch (error) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("expense-user");
        localStorage.removeItem("expense-token");
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function login(email: string, password: string) {
    try {
      setIsLoading(true);
      const data = await loginApi(email, password);

      // console.log(data);

      localStorage.setItem("expense-user", JSON.stringify(data.data));
      localStorage.setItem("expense-token", data.token);

      setUser(data.data);
      setToken(data.token);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("unable to login");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      setIsLoading(true);
      const data = await registerApi(name, email, password);
      localStorage.setItem("expense-user", JSON.stringify(data.data));
      localStorage.setItem("expense-token", data.token);

      setUser(data.data);
      setToken(data.token);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setRegisterError(error.message);
      } else {
        setRegisterError("unable to login");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setIsLoading(true);
    setUser(null);
    setToken(null);

    localStorage.removeItem("expense-user");
    localStorage.removeItem("expense-token");
    setIsLoading(false);
  }

  function setErrorFn(error: string | null) {
    setError(error);
  }

  return (
    <ExpenseContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        registerError,
        setRegisterError,
        setErrorFn,
        login,
        register,
        logout,
      }}
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
