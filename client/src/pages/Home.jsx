import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccountModal from "../components/AccountModal";
import PasswordModal from "../components/PasswordModal";
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
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // To store selected action (Create or Add)

  const addAccount = () => {
    if (!localStorage.getItem("token")) {
      navigate("/Auth");
    } else {
      setIsAccountModalOpen(true);
    }
  };

  const handleCreateAccount = () => {
    setIsAccountModalOpen(false);
    setActionType("create");
    setIsPasswordModalOpen(true);
  };

  const handleAddExistingAccount = () => {
    setIsAccountModalOpen(false);
    setActionType("add");
    setIsPasswordModalOpen(true);
  };

  const handlePasswordConfirm = (password) => {
    setIsPasswordModalOpen(false);
    console.log(`${actionType} account with password:`, password);
    // Handle password authentication logic here
  };
  const handleSubmit = () => {};
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
            </p>
            <button
              type="button"
              onClick={addAccount}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all"
            >
              Add Account
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
                  className="w-full py-3 text-white font-semibold border border-gray-500 rounded-full hover:bg-green-700 transition-all cursor-pointer"
                >
                  Send Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal Component */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onCreate={handleCreateAccount}
        onAddExisting={handleAddExistingAccount}
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
      />
    </div>
  );
};

export default Home;
