import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user/context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Wallet({ children }) {
	const { connected, connectWallet } = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!connected) {
			connectWallet();
			navigate("/dashboard");
		}
	}, []);
	return children;
}
