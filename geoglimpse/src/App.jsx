import { ClerkProvider } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Header from "./components/Header";
import Home from "./components/Home";
import News from "./components/News";
import Weather from "./components/Weather";
import Maps from "./components/Maps";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing publishable key");
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/maps" element={<Maps />} />
      </Routes>
    </ClerkProvider>
  );
}

export default App;
