import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing publishable key");
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Router>
      <App />
    </Router>
  // </ClerkProvider>
);
