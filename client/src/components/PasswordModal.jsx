import React, { useState } from "react";
import Loader from "./Loader";

const PasswordModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl w-96 backdrop-blur-lg text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Enter Password
        </h2>
        <p className="text-gray-300 text-center mb-4">
          Please enter your password to proceed.
        </p>

        <input
          type="password"
          className="input input-bordered w-full bg-white/10 text-white placeholder-gray-300 backdrop-blur-md p-2 rounded-sm "
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="flex flex-col space-y-3 mt-6">
              <button
                onClick={() => onConfirm(password)}
                className="btn btn-primary btn-block bg-blue-600 hover:bg-blue-700 glass rounded-sm p-2 cursor-pointer"
              >
                Confirm
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="btn btn-outline btn-sm text-gray-300 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordModal;
