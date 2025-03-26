import React from "react";


import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Student Donation</h1>
      <p className="text-gray-600 mt-4">Donate books and clothes to those in need.</p>
      <Link to="/donate">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
