import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  // Hardcoded values for transactions and accounts
  const transactions = [
    { id: 1, description: "Coffee Shop", amount: "-$5.50", date: "2023-10-01" },
    {
      id: 2,
      description: "Freelance Payment",
      amount: "+$250.00",
      date: "2023-10-02",
    },
    {
      id: 3,
      description: "Electric Bill",
      amount: "-$80.00",
      date: "2023-10-03",
    },
  ];

  const accounts = [
    { id: 1, name: "Checking Account", balance: "$3,450.00" },
    { id: 2, name: "Savings Account", balance: "$7,200.00" },
    { id: 3, name: "Crypto Wallet", balance: "0.25 BTC" },
    { id: 4, name: "mywallet", balance: "0.34 sou" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#1F2937] text-white pt-20">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Dashboard Header */}
        <div className="p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-[#38BDF8]">Dashboard</h1>
        </div>

        {/* Box Container for Content */}
        <div className="mt-6 p-6 bg-white/10 backdrop-blur-md shadow-md border border-white/20 rounded-lg">
          {/* Account Information Section */}
          <div className="mb-8">
            <div className="border-b border-white/20 pb-2 mb-4">
              <h2 className="text-2xl font-semibold text-[#38BDF8]">
                Accounts
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="card bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 p-6 rounded-lg transition transform hover:scale-105"
                >
                  <h3 className="text-xl font-bold">{account.name}</h3>
                  <p className="text-lg">
                    Balance:{" "}
                    <span className="badge badge-primary">
                      {account.balance}
                    </span>
                  </p>
                  <button className="btn btn-outline btn-sm mt-3 hover:bg-[#38BDF8] hover:text-white">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions Section */}
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
