import { useExpense } from "@/context/ExpenseContext";
import { Navigate, Outlet } from "react-router";
import { Spinner } from "./ui/spinner";

const LoginProtection = () => {
  const { user, isLoading } = useExpense();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center gap-4">
        <Spinner />
      </div>
    );
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default LoginProtection;
