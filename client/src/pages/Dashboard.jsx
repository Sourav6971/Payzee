import React from "react";

import Navbar from "./../components/Navbar";
import AccountInfo from "./../components/AccountInfo";

const Dashboard = () => {
  const userAccount = [
    {
      id: "1",
      balance: "1234",
      publicKey: "afdadf",
      privateKey: "pehla wala",
    },
    {
      id: "2",
      balance: "1234",
      publicKey: "afdadf",
      privateKey: "dusra wala",
    },
    {
      id: "3",
      balance: "1234",
      publicKey: "afdadf",
      privateKey: "teesra wala",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="white-glassmorphism m-4 p-4">
        <div className="p-4 text-3xl font-mono font-semibold ">
          Welcome Sourav!
        </div>
        <div>
          {userAccount.map((index) => {
            return <AccountInfo account={index} key={index.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
