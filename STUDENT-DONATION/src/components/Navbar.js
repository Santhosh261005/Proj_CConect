import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  // Ensure this file exists

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/donate">Donate</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/rewards">Rewards</Link></li>
      </ul>
    </nav>
  );
}
