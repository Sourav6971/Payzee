import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Input = ({ placeholder, name, type, handleChange, value }) => (
  <input
    placeholder={placeholder}
    name={name}
    type={type}
    onChange={(e) => handleChange(e, name)}
    value={value}
    className="my-2 w-full rounded-lg p-3 outline-none bg-transparent text-white border border-gray-500 text-sm white-glassmorphism"
  />
);

const Home = () => {
  const navigate = useNavigate();

  const [publicKey, setPublicKey] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e, field) => {
    if (field === "publicKey") setPublicKey(e.target.value);
    if (field === "addressTo") setAddressTo(e.target.value);
    if (field === "amount") setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://payzee-taupe.vercel.app/api/transaction",
        {
          fromAddress: publicKey,
          toAddress: addressTo,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setResponseMessage(response.data.msg);
      console.log(response.data.signature);
    } catch (error) {
      setResponseMessage("Transaction failed.");
    }
    setLoading(false);
    setTimeout(() => {
      setResponseMessage("");
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <div className="flex w-full min-h-screen justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-10">
          {/* Left Section */}
          <div className="flex flex-col items-start w-full md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-3xl text-white text-gradient leading-tight">
              <b className="text-6xl">One Stop Solution</b> <br /> to all your
              crypto needs....
            </h1>
            <p className="text-white text-lg font-light">
              Explore the crypto world. Buy and sell cryptocurrencies easily on{" "}
              <b className="text-xl">Payzee!</b>
              <button
                type="button"
                onClick={() => navigate("/Dashboard")}
                className="px-6 mt-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center w-full md:w-1/2 space-y-6">
            <div className="p-6 sm:w-96 w-full flex flex-col items-center blue-glassmorphism shadow-xl rounded-lg">
              <Input
                placeholder="Private Key of the account"
                name="publicKey"
                type="text"
                handleChange={handleChange}
                value={publicKey}
              />
              <Input
                placeholder="Recievers address"
                name="addressTo"
                type="text"
                handleChange={handleChange}
                value={addressTo}
              />
              <Input
                placeholder="Amount (SOL)"
                name="amount"
                handleChange={handleChange}
                value={amount}
              />

              <div className="h-[1px] w-full bg-gray-400 my-3" />
              {loading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3 text-white font-semibold border border-gray-500 rounded-full hover:bg-blue-700 transition-all cursor-pointer"
                >
                  Send Now
                </button>
              )}
              {responseMessage && (
                <p className="text-white mt-3">{responseMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
