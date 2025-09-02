import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { UserContext } from "../context/user/context";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const DASHBOARD_NAV_ITEMS = ["Home", "Docs"];

export default function Dashboard() {
	const { user, connectWallet, connected } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {}, []);

	return (
		<>
			<div className="min-h-screen">
				<div className="shadow">
					<div className="flex justify-between  p-6 max-w-[1800px] mx-auto">
						<div className="text-blue-900 flex flex-col justify-center">
							<span className="text-2xl ml-3 font-semibold ">Dashboard</span>
						</div>
						<div className="flex gap-14">
							<div className="flex gap-8">
								{DASHBOARD_NAV_ITEMS.map((item) => (
									<span
										key={item}
										className="flex flex-col justify-center hover:underline underline-offset-4 cursor-pointer"
										onClick={() => navigate(`/${item.toLowerCase()}`)}
									>
										{item}
									</span>
								))}
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
				</div>
				<SideBar />
			</div>
			<Footer />
		</>
	);
}
