import React, { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import AuthCard from "../components/AuthCard";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center ">
        <div className="mt-96">
          <AuthCard />
        </div>
      </div>
    </>
  );
};

export default Landing;
