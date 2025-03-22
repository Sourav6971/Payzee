import React from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const Payments = () => {
  return (
    <div className="min-h-screen bg-background-dark text-text-light ">
      <Navbar />
      <Loader />
    </div>
  );
};

export default Payments;
