import { useState } from "react";
import { UserContext } from "./context";
import toast from "react-hot-toast";

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [connected, setConnected] = useState(false);
	const connectWallet = async () => {
		if (connected) {
			await window?.solana?.disconnect();
			setConnected(false);
			toast.error("Wallet disconnected!");
			return;
		}
		const response = await window?.solana?.connect();
		if (response) {
			toast.success("Wallet connected!");
			setUser({ publicKey: await response.publicKey.toBase58() });
			setConnected(true);
		} else toast.error("Could not find wallet");
		console.error(response);
	};

	return (
		<UserContext.Provider value={{ user, setUser, connectWallet, connected }}>
			{children}
		</UserContext.Provider>
	);
}
