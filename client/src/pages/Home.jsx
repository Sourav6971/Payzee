import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaWallet,
  FaChartLine,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaQuoteLeft,
  FaQuestionCircle,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const slides = [
    { title: "Market", icon: <FaChartLine size={50} /> },
    { title: "Payments", icon: <FaMoneyBillWave size={50} /> },
    { title: "Wallet", icon: <FaWallet size={50} /> },
    { title: "Dashboard", icon: <FaTachometerAlt size={50} /> },
  ];

  const reviews = [
    {
      name: "Alice Johnson",
      comment: "Fastest payments I've ever used!",
      icon: <FaUser size={40} />,
    },
    {
      name: "Mark Spencer",
      comment: "Secure and hassle-free transactions.",
      icon: <FaUser size={40} />,
    },
    {
      name: "Sophia Lee",
      comment: "Love the smooth experience!",
      icon: <FaUser size={40} />,
    },
  ];

  const faqs = [
    {
      question: "How secure are the transactions?",
      answer:
        "All transactions are encrypted and secured with Solana's blockchain technology.",
    },
    {
      question: "What are the transaction fees?",
      answer:
        "Our platform offers minimal transaction fees compared to traditional payment systems.",
    },
    {
      question: "Can I use multiple wallets?",
      answer:
        "Yes, you can connect multiple wallets and manage them seamlessly.",
    },
  ];

  const totalSlides = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-urbanist overflow-hidden">
      <Navbar />

      {/* Hero Section with Animated Waves */}
      <div className="relative flex flex-col items-center text-center pt-20 pb-32 px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
          Seamless Payments, Powered by Solana
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-300 max-w-xl md:max-w-2xl">
          Experience fast, secure, and low-cost transactions like never before.
        </p>
        <button
          className="mt-6 bg-green-600 py-3 px-8 md:py-4 md:px-12 text-sm md:text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/Dashboard")}
        >
          Get Started
        </button>
      </div>

      {/* Feature Carousel */}
      <div className="max-w-6xl mx-auto py-16 px-6 relative flex justify-center gap-6 flex-wrap">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`transition-all duration-700 ease-in-out transform flex flex-col items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-3xl shadow-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-4 md:p-6 backdrop-blur-lg border border-white/20 hover:scale-105`}
            onClick={() => {
              if (slide.title === "Market") navigate("/Market");
              if (slide.title === "Wallet") navigate("/Dashboard");
              if (slide.title === "Dashboard") navigate("/Dashboard");
              if (slide.title === "Payments") navigate("/Payments");
            }}
          >
            {slide.icon}
            <h3 className="mt-4 text-xl md:text-2xl font-bold">
              {slide.title}
            </h3>
          </div>
        ))}
      </div>

      {/* User Reviews Section */}
      <div className="max-w-6xl mx-auto py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          What Our Users Say
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch flex-wrap gap-6">
          {reviews.map((review) => (
            <div className="w-full md:w-72 p-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-md shadow-lg text-white flex flex-col items-center">
              <FaQuoteLeft size={30} className="text-gray-400" />
              <p className="text-base md:text-lg mt-4">"{review.comment}"</p>
              <div className="mt-4 flex items-center gap-2">
                {review.icon}
                <span>{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg text-left"
            >
              <div className="flex items-center text-base md:text-lg font-semibold text-green-400">
                <FaQuestionCircle className="mr-2" /> {faq.question}
              </div>
              <p className="mt-2 text-sm md:text-base text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
