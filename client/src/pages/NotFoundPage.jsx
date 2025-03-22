import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
        backdropFilter: "blur(10px)",
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>404</h1>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          The page you are looking for does not exist.
        </p>
        <button
          onClick={goToHome}
          style={{
            padding: "15px 30px",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
