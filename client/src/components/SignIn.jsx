import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "./Loader";

import BACKEND_URL from "./../config";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/Dashboard");
  }, []);

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
      const response = await axios.post(BACKEND_URL + "user/signin", {
        username: inputForm.username,
        password: inputForm.password,
      });

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
    <div
      className="sign-in-container"
      style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}
    >
      <h2
        className="form-title"
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        Sign In
      </h2>
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          name="username"
          onChange={handleChange}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <div
          className="password-container"
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              flex: "1",
            }}
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              cursor: "pointer",
            }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="submit-btn"
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007BFF",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        )}
      </form>
    </div>
  );
};

export default SignIn;
