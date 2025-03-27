import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "./../components/Navbar";
import AccountInfo from "./../components/AccountInfo";
import Footer from "../components/Footer";

import { useAccount } from "../store/store";
import BACKEND_URL from "./../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const setAccount = useAccount((state) => state.setAccount);
  const account = useAccount((state) => state.account);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/Auth");
    setLoading(true);
    axios
      .get(BACKEND_URL + "account/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserName(res.data.user.firstName);
        setAccount(res.data.user.accounts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-800 rounded-xl m-4 p-4 min-h-[100vh]">
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 p-4 rounded-3xl w-full sm:w-auto">
            Add Account
          </button>
        </div>
        {loading ? (
          <div className="mt-28">
            <Loader />
          </div>
        ) : (
          <>
            <div className="p-4 text-3xl font-mono font-semibold text-center sm:text-left">
              Welcome{" "}
              {String(userName).charAt(0).toUpperCase() +
                String(userName).slice(1)}
              !
            </div>
            {account.length ? (
              <div className="space-y-4">
                {account.map((value, index) => (
                  <AccountInfo
                    account={value}
                    index={index}
                    key={value.id}
                    className="p-4 bg-[#2a2a2a] rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center mt-10 text-lg">
                No Accounts Created
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
