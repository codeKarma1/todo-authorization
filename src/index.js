import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider
import { BrowserRouter } from "react-router-dom"; // ✅ import Router
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
