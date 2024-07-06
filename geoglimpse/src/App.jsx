import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import News from "./components/News";
import Weather from "./components/Weather";
import Maps from "./components/Maps";
import Plan from "./components/Plan";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </>
  );
}

export default App;
