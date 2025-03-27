import { LuCopy } from "react-icons/lu";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountInfo = ({ account, index }) => {
  const navigate = useNavigate();

  const handlePrivateKey = (account) => {
    navigate(`/password?value=private-key&id=${index}`);
  };
  return (
    <>
      <div className="p-4 m-4  blue-glassmorphism sm:flex justify-between  md::flex-col">
        <ul>
          <li>{"Account " + Number(index + 1)}</li>
          <li className="flex">
            {"public Key: " + account.publicKey}
            <LuCopy className="mt-1 mx-2 cursor-pointer" />
          </li>
        </ul>
        <button
          className=" bg-red-700 hover:bg-red-800 cursor-pointer  rounded-2xl p-2 h-max "
          onClick={() => {
            handlePrivateKey(account);
          }}
        >
          View Private Key
        </button>
      </div>
    </>
  );
};
export default AccountInfo;
