import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// swiper core and module styles (imported globally once)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>;    </BrowserRouter>
  </React.StrictMode>
);
