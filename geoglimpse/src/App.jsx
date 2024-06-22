import { useState } from "react";
import "./App.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import News from "./components/News";
import Navbar from "./components/Navbar_Test";
import NewSearch from "./components/NewSearch";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing publishable key");
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        {/* Defining the routes for the application */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/news" element={<News />} />
          <Route path="/newsearch" element={<NewSearch />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
