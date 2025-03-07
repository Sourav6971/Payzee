import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "./Loader";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inputForm, setInputForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://payzee-taupe.vercel.app/api/user/signin",
        {
          username: inputForm.username,
          password: inputForm.password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Sign in successful");
        navigate("/Dashboard");
      } else {
        alert("Sign in failed");
      }
    } catch (err) {
      alert("Sign in failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="sign-in-container">
      <h2 className="form-title">Sign In</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          name="username"
          onChange={handleChange}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <button type="submit" className="submit-btn">
            Sign In
          </button>
        )}
      </form>
    </div>
  );
};

export default SignIn;
