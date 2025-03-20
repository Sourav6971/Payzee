import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import Tutorials from "./pages/Tutorials";
import Market from "./pages/Market";
import Password from "./pages/Password";

const App = () => {
  useEffect(() => {
    axios
      .post("https://payzee-taupe.vercel.app/api/user/me", {
        token: "Bearer " + localStorage.getItem("token"),
      })
      .then((res) => {
        if (!res.data.verification) {
          localStorage.removeItem("token");
        }
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Landing />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Tutorials" element={<Tutorials />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/Password" element={<Password />} />
      </Routes>
    </div>
  );
};

export default App;
