import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "./../components/Navbar";
import AccountInfo from "./../components/AccountInfo";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen"></div>
      <Footer />
    </>
  );
};

export default Dashboard;
