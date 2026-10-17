import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { BrowserRouter } from "react-router";
import { ExpenseProvider } from "./context/ExpenseContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ExpenseProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </ExpenseProvider>
    </BrowserRouter>
  </StrictMode>,
);
