import { useExpense } from "@/context/ExpenseContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user } = useExpense();

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
