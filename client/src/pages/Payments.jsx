import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Payments = () => {
  const [availableUsers, setAvailableUsers] = useState([]);

  return (
    <div className="min-h-screen bg-background-dark text-text-light ">
      <Navbar />
      <div className="flex justify-center">
        <form className="flex self-center justify-center bg-[#693382] py-4 px-10 mt-20 rounded-2xl  align-middle">
          <input placeholder="Search users.." className="outline-none"></input>
          <button type="submit" className="cursor-pointer">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payments;
