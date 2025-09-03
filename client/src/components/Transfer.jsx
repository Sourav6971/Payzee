import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { FiCopy } from "react-icons/fi";
import { MdDone } from "react-icons/md";

import {
	clusterApiUrl,
	Connection,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";
import { UserContext } from "../context/user/context";

const toKey = import.meta.env.VITE_APP_PUBLIC_KEY;

export default function Transfer() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [copy, setCopy] = useState(false);
	const [wallet, setWallet] = useState("");
	const provider = window?.phantom?.solana;
	const connectWallet = async () => {
		const res = await provider.connect();
		setWallet(res?.publicKey.toBase58());
	};
	const { paySol } = useContext(UserContext);

	useEffect(() => {
		if (!provider) {
			toast.error("Wallet does not exist");
			return;
		}
		try {
			connectWallet();
		} catch {
			toast.error("Error connecting wallet");
		}
	}, [provider, wallet]);

	// const timeStamp = searchParams.get("timeStamp");
	// const expiry = new Date();

	// const newMinutes = expiry.getMinutes() + 10;
	// expiry.setMinutes(newMinutes);

	return (
		<div className="h-screen">
			<div className=" flex justify-center h-full ">
				<div className="my-auto shadow px-10 bg-white py-12 ">
					<img src="logo.png" width={100} className=" mb-14" />
					<span className=" flex justify-center">
						<QRCode value={toKey} />
					</span>
					<span className="flex justify-center text-2xl m-4">Scan QR</span>
					<div className="flex gap-4 mt-10 shadow p-4 rounded">
						<input value={toKey} className="outline-none" disabled={true} />
						<span
							className=" flex flex-col justify-center cursor-pointer"
							onClick={() => {
								navigator.clipboard.writeText(toKey);
								setCopy(true);
								setTimeout(() => setCopy(false), 2000);
							}}
						>
							{copy ? <MdDone /> : <FiCopy />}
						</span>
					</div>
					<div className="flex justify-center mt-16">
						<button
							className="px-5 py-2 text-white font-mono cursor-pointer rounded-2xl "
							style={{ background: "rgb(171 159 242)" }}
							onClick={async () => {
								await paySol(0.001, toKey, wallet);
							}}
						>
							<span className=" flex gap-4">
								<span className=" flex flex-col justify-center text-2xl">
									Phantom
								</span>
								<img
									src="https://mintlify.s3.us-west-1.amazonaws.com/phantom-e50e2e68/resources/images/Phantom_SVG_Icon.svg"
									width={40}
								/>
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
