import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import Chatbot from "./pages/Chatbot";
import Rewards from "./pages/Rewards";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
