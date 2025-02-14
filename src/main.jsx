import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes.jsx";
import AppContextProvider from "./contexts";
import "./index.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
