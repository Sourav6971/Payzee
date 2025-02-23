import React, { useState } from "react";
import { motion } from "framer-motion";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";
import "../styles/landing.css";

const Landing = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const variants = {
    hiddenLeft: { x: "-100%", opacity: 0 }, // Start from the left
    visible: { x: "0%", opacity: 1, transition: { duration: 0.7 } }, // Slide to center
    exitRight: { x: "100%", opacity: 0, transition: { duration: 0.7 } }, // Exit to the right
  };

  return (
    <div>
      <Navbar />
      <div className="landing-page">
        <div className="landing-box">
          {/* Info Section */}
          <div className="info-section">
            <div className="info-content">
              <h2>About Payzee</h2>
              <p>Payzee is a revolutionary payment platform...</p>
            </div>
          </div>

          {/* Auth Section */}
          <div className="auth-section">
            <div className="form-container">
              <motion.div
                key={isSignIn ? "signIn" : "signUp"}
                initial="hiddenLeft" // Always start from the left
                animate="visible" // Animate to the center
                exit="exitRight" // Always exit to the right
                variants={variants}
                className="auth-container"
              >
                {isSignIn ? <SignIn /> : <SignUp />}
              </motion.div>
              <p className="toggle-text" onClick={() => setIsSignIn(!isSignIn)}>
                {isSignIn
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
