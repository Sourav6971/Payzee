import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import Market from "./pages/Market";
import Password from "./pages/Password";
import BACKEND_URL from "./config";
import NotFound from "./pages/NotFoundPage"; // Import the 404 page component

const App = () => {
  useEffect(() => {
    axios
      .post(BACKEND_URL + "user/me", {
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
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/Password/*" element={<Password />} />
        <Route path="*" element={<NotFound />} /> {/* 404 route */}
      </Routes>
    </div>
  );
};

export default App;
