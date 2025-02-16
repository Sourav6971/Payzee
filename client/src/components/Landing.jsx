import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Landing = () => {
  const [isSignUp, setIsSignUp] = useState(true);
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
          {isSignUp ? <SignUp /> : <SignIn />}
          <p className="toggle-text" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
