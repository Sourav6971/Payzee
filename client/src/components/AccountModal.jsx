import React from "react";

const AccountModal = ({ isOpen, onClose, onCreate, onAddExisting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl w-96 backdrop-blur-lg text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Choose an Option
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Would you like to create a new account or add an existing one?
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={onCreate}
            className="btn btn-primary btn-block bg-blue-600 hover:bg-blue-700 glass rounded-md py-2"
          >
            Create New Account
          </button>
          <button
            onClick={onAddExisting}
            className="btn btn-secondary btn-block bg-gray-700 hover:bg-gray-800 glass rounded-md py-2"
          >
            Add Existing Account
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm text-gray-300 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
