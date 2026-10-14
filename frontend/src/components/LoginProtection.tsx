import { useExpense } from "@/context/ExpenseContext";
import { Navigate, Outlet } from "react-router";

const LoginProtection = () => {
  const { user } = useExpense();

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default LoginProtection;
