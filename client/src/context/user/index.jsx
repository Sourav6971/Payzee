import { useState } from "react";
import { UserContext } from "./context";
import toast from "react-hot-toast";

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [connected, setConnected] = useState(false);
	const [wallet, setWallet] = useState(null);
	const connectWallet = async () => {
		if (connected) {
			await window?.solana?.disconnect();
			setConnected(false);
			setUser(null);
			toast.error("Wallet disconnected!");
			return;
		}
		const response = await window?.solana?.connect();
		if (response) {
			toast.success("Wallet connected!");
			setWallet(await response.publicKey.toBase58());
			setConnected(true);
		} else toast.error("Could not find wallet");
		console.error(response);
	};

	return (
		<UserContext.Provider
			value={{ user, setUser, connectWallet, connected, wallet }}
		>
			{children}
		</UserContext.Provider>
	);
}
