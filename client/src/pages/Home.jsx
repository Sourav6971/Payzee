import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const slides = ["market", "payments", "wallet", "dashboard"];
  const totalSlides = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white font-urbanist">
        <div className="flex justify-center pt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
            Seamless Payments, Powered by Solana
          </h1>
        </div>
        <div className="flex justify-center text-center p-2">
          <p className="mt-4 text-lg text-gray-300 max-w-xl ">
            Experience fast, secure, and low-cost transactions like never
            before.
          </p>
        </div>
        <div className="flex justify-center p-10">
          <button
            className="bg-green-600 py-4 px-10 cursor-pointer hover:bg-green-700 rounded-4xl"
            onClick={() => navigate("/Dashboard")}
          >
            Get Started
          </button>
        </div>

        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="carousel w-full">
            {slides.map((slide, index) => (
              <div
                key={slide}
                className={`carousel-item relative w-full ${
                  currentSlide === index ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center justify-center h-64 bg-gray-800 text-white text-3xl font-bold">
                  {slide}
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === 0 ? totalSlides - 1 : prev - 1
                      )
                    }
                    className="btn btn-circle"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() =>
                      setCurrentSlide((prev) => (prev + 1) % totalSlides)
                    }
                    className="btn btn-circle"
                  >
                    ❯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
