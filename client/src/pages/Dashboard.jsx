import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LuCopy } from "react-icons/lu";
import { MdOutlineCheckCircle } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AccountModal from "../components/AccountModal";
import PasswordModal from "../components/PasswordModal";
import Loader from "../components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPrivateKeyModalOpen, setIsPrivateKeyModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const addAccount = () => {
    if (!localStorage.getItem("token")) {
      navigate("/Auth");
    } else {
      setIsAccountModalOpen(true);
    }
  };

  const handleCreateAccount = () => {
    setIsAccountModalOpen(false);
    setIsPasswordModalOpen(true);
  };

  const handleAddExistingAccount = () => {
    setIsAccountModalOpen(false);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordConfirm = async (password, accountId) => {
    const response = await axios.post(
      "http://localhost:8000/api/user/verify-password",
      { password },
      { headers: { authorization: "Bearer " + localStorage.getItem("token") } }
    );

    if (response.data.msg) {
      setSelectedAccount(accounts.find((acc) => acc._id === accountId));
      setIsPrivateKeyModalOpen(true);
    } else {
      alert("Wrong password");
    }
    setIsPasswordModalOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:8000/api/account/dashboard", {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((response) => {
          setAccounts(response.data.accounts);
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/Auth");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#1F2937] text-white pt-20">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="p-6 rounded-xl shadow-lg flex flex-col-1 justify-between">
          <h1 className="text-3xl font-bold text-[#38BDF8]">Accounts</h1>
          <button
            type="button"
            onClick={() => navigate("/Home")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all cursor-pointer"
          >
            Send Crypto
          </button>
        </div>

        <div className="mt-6 p-6 bg-white/10 backdrop-blur-md shadow-md border border-white/20 rounded-lg">
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-3">
              {!loading ? (
                accounts.map((account, index) => (
                  <div
                    key={account._id}
                    className="card bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 py-2 px-6 rounded-lg h-max w-full flex flex-col-1 justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-bold">
                        {"Account " + Number(index + 1)}
                      </h3>

                      <p className="text-lg flex items-center space-x-2">
                        <span className="badge badge-primary">
                          {account.publicKey.substring(0, 3) +
                            "..............." +
                            account.publicKey.substring(
                              account.publicKey.length - 4
                            )}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(account.publicKey);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1500);
                          }}
                          className="p-1 transition cursor-pointer"
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
                      <button
                        onClick={() => {
                          setSelectedAccount(account);
                          setIsPasswordModalOpen(true);
                        }}
                        className="btn btn-outline btn-sm mt-3 rounded-md py-3 bg-red-600 hover:bg-red-700 hover:text-white h-10 w-max p-3 text-center flex items-center cursor-pointer"
                      >
                        View Private Key
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <Loader />
              )}
              <div className="flex flex-col-1 justify-center">
                <button
                  type="button"
                  onClick={addAccount}
                  className="px-6 py-3 mt-5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition-all cursor-pointer"
                >
                  Add Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Private Key Modal */}
      {isPrivateKeyModalOpen && selectedAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              onClick={() => {
                setIsPrivateKeyModalOpen(false);
                setSelectedAccount(null);
              }}
            >
              <AiOutlineClose size={24} />
            </button>

            <p className="text-lg text-center mt-4 break-all bg-gray-100 p-3 rounded-md">
              {selectedAccount.privateKey}
            </p>
          </div>
        </div>
      )}

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onCreate={handleCreateAccount}
        onAddExisting={handleAddExistingAccount}
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={(password) =>
          handlePasswordConfirm(password, selectedAccount?._id)
        }
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
