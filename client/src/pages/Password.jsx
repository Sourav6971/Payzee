import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import PrivateKeyModal from "../components/PrivateKeyModal";

const Password = () => {
  const [password, setPassword] = useState("");
  const [paramsValue] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const navigate = useNavigate();

  const handlePasswordConfirm = () => {
    const searchValue = paramsValue.get("value");
    switch (searchValue) {
      case "private-key": {
        setShowPrivateKey(true);
      }
    }
  };

  const handleSubmit = async () => {
    if (!password) alert("Password cannot be empty");
    else {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://payzee-taupe.vercel.app/api/user/verify-password",
          {
            password,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.data.msg) {
          alert("Incorrect Password!!");
        } else {
          alert("Password matched");
          handlePasswordConfirm();
        }
      } catch (err) {
        alert("Incorrect Password!!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {showPrivateKey ? (
        <PrivateKeyModal />
      ) : (
        <div className="flex justify-center absolute bg-gray-900 h-full w-full">
          <div className="white-glassmorphism mt-auto mb-auto flex flex-col p-4 h-max w-[500px] m-4 space-y-3 align-middle">
            <input
              className="blue-glassmorphism p-3 text-center"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {loading ? (
              <Loader />
            ) : (
              <>
                <button
                  className="bg-blue-600 w-auto rounded-2xl p-3 hover:bg-blue-700 cursor-pointer"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
                <button
                  className="white-glassmorphism w-auto rounded-2xl p-3 border-none outline-none cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Password;
