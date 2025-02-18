import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputForm, setInputForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/signin",
        {
          username: inputForm.username,
          password: inputForm.password,
        }
      );

      if (response.status === 200) {
        console.log(response.data.token);
        alert("Sign in succesfull");
        navigate("/signinho");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      alert("Sign in failed");
    }
  };
  return (
    <div className="form-container">
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
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
