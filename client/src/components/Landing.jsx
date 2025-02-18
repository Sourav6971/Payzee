import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Landing = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="landing-page">
      <div className="landing-box">
        {/* Plain Paragraph Section */}
        <div className="info-section">
          <p>
            Welcome to our platform! Experience a seamless and secure way to
            manage your payments in crypto with ease.
          </p>
        </div>
        <div className="auth-section">
          {isSignIn ? <SignIn /> : <SignUp />}
          <p className="toggle-text" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
