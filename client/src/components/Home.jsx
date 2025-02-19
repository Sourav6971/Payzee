import React from "react";
import { SiSolana } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "./Loader";
import Navbar from "./Navbar";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, handleChange, value }) => (
  <input
    placeholder={placeholder}
    name={name}
    type={type}
    onChange={(e) => handleChange(e, name)}
    step={"0.0001"}
    value={value}
    className="my-2 w-full rounded-lg p-3 outline-none bg-transparent text-white border border-gray-500 text-sm white-glassmorphism"
  />
);

const Home = () => {
  const connectWallet = () => {};
  const handleSubmit = () => {};
  return (
    <div>
      <Navbar />
      <div className="flex w-full min-h-screen justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-10">
          {/* Left Section */}
          <div className="flex flex-col items-start w-full md:w-1/2 space-y-6">
            <h1 className="text-xl md:text-5xl text-white text-gradient leading-tight">
              <b className="text-6xl">One Stop Solution</b> <br /> to all your
              crypto needs....
            </h1>
            <p className="text-white text-lg font-light">
              Explore the crypto world. Buy and sell cryptocurrencies easily on{" "}
              <b className="text-2xl">Payzee!</b>
            </p>
            <button
              type="button"
              onClick={connectWallet}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all"
            >
              Connect Wallet
            </button>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center w-full md:w-1/2 space-y-6">
            <div className="p-6 sm:w-96 w-full flex flex-col items-center blue-glassmorphism shadow-xl rounded-lg">
              <Input
                placeholder="Address To"
                name="addressTo"
                type="text"
                handleChange={() => {}}
              />
              <Input
                placeholder="Amount (SOL)"
                name="amount"
                type="number"
                handleChange={() => {}}
              />
              <Input
                placeholder="Keyword (Gif)"
                name="keyword"
                type="text"
                handleChange={() => {}}
              />
              <Input
                placeholder="Enter Message"
                name="message"
                type="text"
                handleChange={() => {}}
              />
              <div className="h-[1px] w-full bg-gray-400 my-3" />
              {false ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3 text-white font-semibold border border-gray-500 rounded-full hover:bg-gray-700 transition-all"
                >
                  Send Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      /
    </div>
  );
};

export default Home;
