import { Route, Routes } from "react-router";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import AddExpensesPage from "./pages/AddExpensesPage";
import AuthLayout from "./pages/AuthLayout";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import LoginProtection from "./components/LoginProtection";
import ProtectedRoute from "./components/ProtectedRoute";
import { ExpenseRangeProvider } from "./context/ExpenseRangeContext";
import SEO from "./components/seo";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginProtection />}>
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <>
                  <SEO
                    title="Login | Expense Tracker"
                    description="Welcome to the login page of Expense Tracker."
                    name="Anjal K Biju"
                    canonicalUrl="https://expensetrackerbyanjal.vercel.app/"
                  />
                  <LoginForm />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <SEO
                    title="Login | Expense Tracker"
                    description="Welcome to the login page of Expense Tracker."
                    name="Anjal K Biju"
                    canonicalUrl="https://expensetrackerbyanjal.vercel.app/"
                  />
                  <SignupForm />
                </>
              }
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <ExpenseRangeProvider>
                <AppLayout />
              </ExpenseRangeProvider>
            }
          >
            <Route
              index
              element={
                <>
                  <SEO
                    title="Dashboard | Expense Tracker"
                    description="Welcome to the homepage of Expense Tracker."
                    name="Anjal K Biju"
                    canonicalUrl="https://expensetrackerbyanjal.vercel.app/"
                  />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="expenses"
              element={
                <>
                  <SEO
                    title="Expenses | Expense Tracker"
                    description="List of all the expenses."
                    name="Anjal K Biju"
                    canonicalUrl="https://expensetrackerbyanjal.vercel.app/expenses"
                  />
                  <ExpensesPage />
                </>
              }
            />
            <Route
              path="new"
              element={
                <>
                  <SEO
                    title="Add Expenses | Expense Tracker"
                    description="You can create or Add new expenses here."
                    name="Anjal K Biju"
                    canonicalUrl="https://expensetrackerbyanjal.vercel.app/new"
                  />
                  <AddExpensesPage />
                </>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
