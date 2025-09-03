import { useNavigate } from "react-router-dom";
import Navbar from "./ui/Navbar";
import { FaArrowRight } from "react-icons/fa";

export default function Nav() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const button = token ? (
		<div className="flex gap-4 justify-center">
			Dashboard
			<span className=" flex flex-col justify-center">
				<FaArrowRight />
			</span>
		</div>
	) : (
		"Login"
	);
	const buttonOnClick = token
		? () => navigate("/dashboard")
		: () => navigate("/auth");

	return (
		<Navbar
			title={<img src="logo.png" width={100} />}
			options={["Docs"]}
			button={button}
			buttonOnClick={buttonOnClick}
		/>
	);
}
