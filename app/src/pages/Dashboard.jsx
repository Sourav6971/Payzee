import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { UserContext } from "../context/user/context";
import SideBar from "../components/SideBar";
import Navbar from "../components/ui/Navbar";

const DASHBOARD_NAV_ITEMS = ["Home", "Docs"];

export default function Dashboard() {
	const { user, wallet, connectWallet, disconnectWallet, connected } =
		useContext(UserContext);

	useEffect(() => {
		connectWallet();
	}, []);

	return (
		<>
			<div className="min-h-screen">
				<Navbar
					title={
						<div className="text-blue-900 flex flex-col justify-center">
							<span className="text-2xl ml-3 font-semibold ">Dashboard</span>
						</div>
					}
					options={DASHBOARD_NAV_ITEMS}
					button={connected ? "Disconnect wallet" : "Connect Wallet"}
					buttonOnClick={() =>
						connected ? disconnectWallet() : connectWallet()
					}
				/>
				<SideBar />
			</div>
			<Footer />
		</>
	);
}
