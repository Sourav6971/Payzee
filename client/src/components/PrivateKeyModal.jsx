import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const PrivateKeyModal = ({ isOpen, onClose, onSave }) => {
  const [privateKey, setPrivateKey] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black rounded-lg p-6 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Enter Private Key</h2>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Paste your private key here..."
          onChange={(e) => setPrivateKey(e.target.value)}
        ></textarea>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => onSave(privateKey)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateKeyModal;
