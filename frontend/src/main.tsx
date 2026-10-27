import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { BrowserRouter } from "react-router";
import { ExpenseProvider } from "./context/ExpenseContext.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { HelmetProvider } from "react-helmet-async";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryclient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryclient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <ExpenseProvider>
              <SidebarProvider>
                <App />
              </SidebarProvider>
            </ExpenseProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
