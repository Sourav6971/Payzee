import React from "react";
import Home from "./components/Home";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
