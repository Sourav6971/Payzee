import React from "react";
import { useNavigate } from "react-router-dom";

const PrivateKeyModal = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 bg-black bg-opacity-50">
      <div className="flex flex-col justify-center items-center white-glassmorphism w-96 px-20 py-14 rounded shadow-md">
        <h2 className="text-lg font-bold mb-6 ">Your Private Key</h2>
        <p className="mb-7 text-white break-all">{}</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="px-4 mt-8 py-2  bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PrivateKeyModal;
