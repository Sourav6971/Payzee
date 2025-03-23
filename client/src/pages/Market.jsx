import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Market = () => {
  return (
    <div className="min-h-screen bg-background-dark text-text-light  align-middle">
      <Navbar />

      <a
        className="text-red-300 mx-[630px] "
        href="https://cryptoplace-alpha.vercel.app/"
        target="blank"
      >
        Click here to view crypto market
      </a>
    </div>
  );
};

export default Market;
