import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Market = () => {
  return (
    <div className="min-h-screen bg-background-dark text-text-light">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-background-light p-6 rounded-lg shadow-lg ">
          <h1 className="text-2xl font-bold mb-4">Market</h1>
        </div>
      </div>
    </div>
  );
};

export default Market;
