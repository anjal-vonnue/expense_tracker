import { Route, Routes } from "react-router";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import AddExpensesPage from "./pages/AddExpensesPage";
import AuthLayout from "./pages/AuthLayout";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="new" element={<AddExpensesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
