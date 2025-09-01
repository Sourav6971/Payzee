import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { UserContext } from "../context/user/context";
import { SideBar } from "../components/ui/Index";
import toast from "react-hot-toast";
export default function Dashboard() {
	const { setUser, connectWallet, connected } = useContext(UserContext);

	useEffect(() => {}, []);

	return (
		<>
			<div className="min-h-screen">
				<div className="shadow">
					<div className="flex justify-between  p-6 max-w-[1800px] mx-auto">
						<div className="text-blue-900 flex flex-col justify-center">
							<text className="text-2xl ml-3 font-semibold ">Dashboard</text>
						</div>
						<button
							className="bg-blue-800 hover:bg-blue-900 text-white py-3 px-6 cursor-pointer outline-none rounded-full"
							onClick={() => {
								connectWallet();
							}}
						>
							{connected ? "Disconnect wallet" : "Connect Wallet"}
						</button>
					</div>
				</div>
				<SideBar />
			</div>
			<Footer />
		</>
	);
}
