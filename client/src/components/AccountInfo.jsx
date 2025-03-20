import { LuCopy } from "react-icons/lu";

const AccountInfo = ({ account }) => {
  const handlePrivateKey = (account) => {
    console.log(account.privateKey);
  };
  return (
    <>
      <div className="p-4 m-4  blue-glassmorphism flex justify-between">
        <ul>
          <li>{"id: " + account.id}</li>
          <li>{"balance: " + account.balance}</li>
          <li className="flex">
            {"public Key: " + account.publicKey}{" "}
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
