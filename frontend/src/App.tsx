import { Route, Routes } from "react-router";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import AddExpensesPage from "./pages/AddExpensesPage";

function App() {
  return (
    <>
      <Routes>
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
