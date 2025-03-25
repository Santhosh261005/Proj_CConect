import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import Chatbot from "./pages/Chatbot";
import Rewards from "./pages/Rewards";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css"; // Ensure the CSS is imported


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
