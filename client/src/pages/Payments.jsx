import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import BACKEND_URL from "../config";
import { useDebounce } from "./../hooks/UseDebounce";

const Payments = () => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const debouncedFilter = useDebounce(userFilter);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/Auth");
    axios
      .get(`${BACKEND_URL}user/get-users?filter=${debouncedFilter}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setAvailableUsers(res.data.users))
      .catch((err) => console.log(err));
  }, [debouncedFilter]);

  const handleSend = (user) => {
    console.log(user);
  };

  const toSentenceCase = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-background-dark text-text-light">
      <Navbar />
      <div className="flex justify-center mt-10 px-4">
        <input
          placeholder="Search users..."
          className="outline-none p-2 rounded-lg w-full max-w-md bg-[#693382] text-white"
          onChange={(e) => setUserFilter(e.target.value)}
        />
      </div>

      <div className="mt-8 px-4">
        {availableUsers.length ? (
          <ul className="space-y-4 p-4 ">
            {availableUsers.map((user) => (
              <li key={user.id} className="p-4 rounded-lg bg-[#2a2a2a] ">
                <div className="text-2xl py-2 font-semibold">
                  {`${toSentenceCase(user.firstName)} ${toSentenceCase(
                    user.lastName
                  )}`}
                </div>
                <ul className="mt-2 space-y-2">
                  {user.accounts.length ? (
                    user.accounts.map((account, index) => (
                      <li
                        key={account.publicKey}
                        className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-2 bg-[#1a1a1a] rounded-lg"
                      >
                        <span className="mb-2 sm:mb-0">{`${
                          index + 1
                        }) ${account.publicKey.slice(
                          0,
                          6
                        )}...................${account.publicKey.slice(
                          -6
                        )}`}</span>
                        <button
                          className="bg-green-700 px-4 py-2 rounded-lg hover:bg-green-600 w-full sm:w-auto cursor-pointer min-w-32"
                          onClick={() => handleSend(user)}
                        >
                          Send
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-center text-gray-400">
                      No accounts available
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center mt-20 text-lg">No users found</div>
        )}
      </div>
    </div>
  );
};

export default Payments;
