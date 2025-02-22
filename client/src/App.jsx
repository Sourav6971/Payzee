import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/user/me", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.verification) setSignedIn(true);
        else setSignedIn(false);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
