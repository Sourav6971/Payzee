import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "./../components/Navbar";
import AccountInfo from "./../components/AccountInfo";
import axios from "axios";

import BACKEND_URL from "./../config";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [userAccount, setUserAccount] = useState([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(BACKEND_URL + "account/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserAccount(res.data.user.accounts);
        setUserName(res.data.user.firstName);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bg-gray-800 rounded-xl m-4 p-4 min-h-[100vh] ">
        <div className=" flex justify-end align-middle  ">
          <button className=" border-none outline-none cursor-pointer bg-blue-500 hover:bg-blue-600 p-4 rounded-3xl ">
            Add Account
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="p-4 text-3xl font-mono font-semibold ">
              Welcome{" "}
              {String(userName).charAt(0).toUpperCase() +
                String(userName).slice(1)}
              !
            </div>
            {userAccount.length ? (
              <div>
                {userAccount.map((value, index) => {
                  return (
                    <AccountInfo account={value} index={index} key={value.id} />
                  );
                })}
              </div>
            ) : (
              <div className="text-center">No Accounts Created</div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
