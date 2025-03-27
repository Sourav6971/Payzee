import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BACKEND_URL from "../config";
import { useAccount } from "../store/store";
import Loader from "../components/Loader"; // Added missing import

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const account = useAccount((state) => state.account);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/Auth");
    const addressFromParams = searchParams.get("key");
    if (addressFromParams) {
      setToAddress(addressFromParams);
    }
  }, [searchParams]);

  const handleConfirm = async () => {
    if (!toAddress || !amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid address and amount.");
      return;
    }
    try {
      setLoading(true); // Ensure loading state is set before API call
      await axios.post(
        BACKEND_URL + "/transaction",
        {
          fromAddress,
          toAddress,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      alert("Transaction Successfull");
      setLoading(false);
      navigate("/Payments");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404) {
          alert("Insufficient funds");
        } else if (error.response.status === 401) {
          alert("Account not found");
        } else {
          alert(error.response.data?.message || "An unexpected error occurred");
        }
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/Payments");
  };
  const handleAccount = (value) => {
    setFromAddress(value.privateKey);
  };

  return loading ? (
    <div className="flex flex-col justify-center align-middle my-auto mx-auto min-h-173">
      <Loader />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="glassmorphism-container p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Send Money
        </h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-white mb-2">To Address</label>
            <input
              type="text"
              placeholder="Enter recipient's address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-white mb-2">From Address</label>
            <input
              type="text"
              placeholder="Your account address...."
              value={fromAddress}
              readOnly
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Amount (SOL)</label>
            <input
              type="number"
              placeholder="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition cursor-pointer"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <div>
            <ul className="min-w-100 h-max white-glassmorphism p-4">
              <span className="block  font-semibold mb-4">
                Choose from the below accounts.{" "}
              </span>
              {account.map((value) => {
                return (
                  <li
                    key={value.publicKey}
                    className="p-2 cursor-pointer"
                    onClick={() => handleAccount(value)}
                  >
                    {value.publicKey.slice(0, 8) +
                      "....................................." +
                      value.publicKey.slice(-6)}
                  </li>
                );
              })}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
