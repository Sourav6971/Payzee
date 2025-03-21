import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Market = () => {
  return (
    <div className="min-h-screen bg-background-dark text-text-light">
      <Navbar />
      <Loader />
    </div>
  );
};

export default Market;
