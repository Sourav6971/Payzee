import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import Password from "./pages/Password";
import BACKEND_URL from "./config";
import NotFound from "./pages/NotFoundPage"; // Import the 404 page component
import SendMoney from "./pages/SendMoney";
import Api from "./api";

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
      <Api>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Landing />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/Password/*" element={<Password />} />
          <Route path="/send-money/*" element={<SendMoney />} />
          <Route path="*" element={<NotFound />} /> {/* 404 route */}
        </Routes>
      </Api>
    </div>
  );
};

export default App;
