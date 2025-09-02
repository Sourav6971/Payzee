import { FaPaperPlane } from "react-icons/fa";
import { IoMdSwap } from "react-icons/io";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { IoQrCode } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useNavigate } from "react-router-dom";
const SIDE_BAR_ITEMS = [
	{
		title: "Send",
		icon: <FaPaperPlane color="#0047AB" size={30} />,
		location: "/dashboard/options?tab=send",
	},
	{
		title: "Swap",
		icon: <IoMdSwap color="#0047AB" size={30} />,
		location: "/dashboard/options?tab=swap",
	},
	{
		title: "Buy",
		icon: <FaCircleDollarToSlot color="#0047AB" size={30} />,
		location: "/dashboard/options?tab=buy",
	},
	{
		title: "Receive",
		icon: <IoQrCode color="#0047AB" size={30} />,
		location: "/dashboard/options?tab=receive",
	},
];

export default function SideBar() {
	const navigate = useNavigate();
	return (
		<div className="h-[500px] max-w-[80px] w-full bg-white shadow shadow-slate-300 mx-8 my-36 rounded-xl">
			<div className="flex flex-col justify-around h-full py-6">
				{SIDE_BAR_ITEMS.map(({ title, icon, location }) => (
					<span
						key={title}
						className="flex justify-center cursor-pointer"
						onClick={() => navigate(location)}
					>
						<Tooltip
							title={title}
							arrow
							placement="right"
							slots={{
								transition: Zoom,
							}}
							slotProps={{
								transition: { timeout: 100 },
							}}
						>
							{icon}
						</Tooltip>
					</span>
				))}
			</div>
		</div>
	);
}
