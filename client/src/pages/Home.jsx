import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

import { ApiContext } from "../api/context";

const Home = () => {
  const navigate = useNavigate();

  const { checkFunction } = useContext(ApiContext);
  checkFunction();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white font-urbanist overflow-hidden p-4">
        {/* Hero Section with Animated Text */}
        <motion.div
          className="relative flex flex-col items-center text-center my-48 px-6 md:px-12 min-w-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Seamless Payments, Powered by Solana
          </motion.h1>

          <motion.p
            className="mt-6 text-base md:text-lg text-gray-300 max-w-xl md:max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Experience fast, secure, and low-cost transactions like never
            before.
          </motion.p>

          <motion.button
            className="mt-6 bg-green-600 py-3 px-8 md:py-4 md:px-12 text-sm md:text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/Dashboard")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
