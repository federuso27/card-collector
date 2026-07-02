import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
