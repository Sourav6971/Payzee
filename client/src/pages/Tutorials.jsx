import React from "react";
import Navbar from "../components/Navbar";

const Tutorials = () => {
  return (
    <div className="min-h-screen bg-background-dark text-text-light pt-20">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-background-light p-6 rounded-lg shadow-lg ">
          <h1 className="text-2xl font-bold mb-4">Tutorials</h1>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
