import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Market = () => {
  return (
    <div className="min-h-screen bg-background-dark text-text-light pt-20">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-background-light p-6 rounded-lg shadow-lg ">
          <h1 className="text-2xl font-bold mb-4">Market</h1>
          <p>Market page content goes here.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Market;
