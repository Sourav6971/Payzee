import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LuCopy } from "react-icons/lu";
import { MdOutlineCheckCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
    } else {
      navigate("/Auth");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#1F2937] text-white pt-20">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Dashboard Header */}
        <div className="p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-[#38BDF8]">Accounts</h1>
        </div>

        {/* Box Container for Content */}
        <div className="mt-6 p-6 bg-white/10 backdrop-blur-md shadow-md border border-white/20 rounded-lg">
          {/* Account Information Section */}
          <div className="mb-8">
            <div className="border-b border-white/20 pb-2 mb-4">
              {/* <h2 className="text-2xl font-semibold text-[#38BDF8]">
                Accounts
              </h2> */}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="card bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 py-2 px-6 rounded-lg  h-max w-full flex flex-col-1 justify-between  "
                >
                  <div>
                    <h3 className="text-xl font-bold">{account.name}</h3>
                    <p className="text-lg flex items-center space-x-2">
                      <span>Balance: </span>
                      <span className="badge badge-primary ">
                        {account.balance + " (SOL)"}
                      </span>
                    </p>
                    <p className="text-lg flex items-center space-x-2">
                      <span className="badge badge-primary">
                        {account.publicKey.substring(0, 3) +
                          "..............." +
                          account.publicKey.substring(
                            account.publicKey.length - 4,
                            account.publicKey.length
                          )}
                      </span>
                      <button
                        onClick={() => {
                          console.log("clicked");
                          navigator.clipboard.writeText(account.publicKey);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500);
                        }}
                        className="p-1  transition cursor-pointer "
                      >
                        {copied ? (
                          <MdOutlineCheckCircle size={20} />
                        ) : (
                          <LuCopy />
                        )}
                      </button>
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-outline btn-sm mt-3 rounded-md py-3 bg-red-600 hover:bg-red-700 hover:text-white h-10 w-max p-3 text-center flex items-center cursor-pointer ">
                      View Private Key
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions Section
          <div>
            <div className="border-b border-white/20 pb-2 mb-4">
              <h2 className="text-2xl font-semibold text-[#38BDF8]">
                Recent Transactions
              </h2>
            </div>
            <div className="overflow-x-auto bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="text-gray-300 text-left border-b border-gray-600">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-white/20 transition"
                    >
                      <td className="py-3 px-4">{transaction.id}</td>
                      <td className="py-3 px-4">{transaction.description}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`badge ${
                            transaction.amount.includes("-")
                              ? "badge-error"
                              : "badge-success"
                          }`}
                        >
                          {transaction.amount}
                        </span>
                      </td>
                      <td className="py-3 px-4">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
