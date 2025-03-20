import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
        }
      } catch (err) {
        alert("Incorrect Password!!");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className=" flex justify-center  absolute bg-gray-900 h-full w-full">
      <div className="white-glassmorphism mt-auto mb-auto flex flex-col p-4 h-max w-[500px] m-4 space-y-3 align-middle">
        <input
          className="blue-glassmorphism p-3 text-center"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {loading ? (
          <Loader />
        ) : (
          <>
            <button
              className="bg-blue-600 w-auto rounded-2xl p-3  hover:bg-blue-700 cursor-pointer "
              onClick={handleSubmit}
            >
              Confirm
            </button>
            <button
              className="white-glassmorphism w-auto rounded-2xl p-3 border-none outline-none cursor-pointer"
              onClick={() => {
                history.back();
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Password;
