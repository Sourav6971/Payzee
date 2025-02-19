import React from "react";
import Home from "./components/Home";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
