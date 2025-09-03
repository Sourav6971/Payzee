import React, { Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Fallback from "../../components/Fallback";
import NotFound from "../404";
import { FaArrowLeft } from "react-icons/fa6";
import SideBar from "../../components/SideBar";
import Wallet from "../../utils/walletWrapper";
import Footer from "../../components/Footer";
const Buy = React.lazy(() => import("./Buy"));
const Send = React.lazy(() => import("./Send"));
const Swap = React.lazy(() => import("./Swap"));
const Receive = React.lazy(() => import("./Receive"));

const tabComponents = {
	buy: Buy,
	send: Send,
	swap: Swap,
	receive: Receive,
};

export default function Index() {
	const [searchParams] = useSearchParams();
	const tab = searchParams.get("tab")?.toLowerCase();
	const Component = tabComponents[tab];

	return (
		<Suspense fallback={<Fallback />}>
			{Component ? (
				<div className="min-h-screen">
					<SideBarNav />
					<div className="flex -mt-2 ">
						<SideBar />
						<Wallet>
							<div className=" max-w-[1200px] mx-auto">
								<Component />
							</div>
						</Wallet>
					</div>
				</div>
			) : (
				<NotFound />
			)}
			<Footer />
		</Suspense>
	);
}

function SideBarNav() {
	const navigate = useNavigate();
	return (
		<div
			className=" flex justify-start p-10 cursor-pointer"
			onClick={() => navigate("/dashboard")}
		>
			<div className="flex flex-col justify-center mr-2">
				<FaArrowLeft />
			</div>
			<span className="hover:underline underline-offset-4">Dashboard</span>
		</div>
	);
}
