import { useNavigate } from "react-router-dom";
export default function Navbar({
	title,
	options,
	button,
	buttonOnClick,
	classProps,
}) {
	const navigate = useNavigate();
	return (
		<div className={`w-screen p-6 h-full bg-white shadow ${classProps}`}>
			<div className=" flex flex-col justify-center ">
				<div className="flex justify-between  w-[90%] mx-auto">
					<div className=" flex flex-col justify-center align-center ">
						{title}
					</div>
					<div className="flex gap-16">
						<div className="flex gap-10">
							{options?.map((option) => (
								<div
									key={option}
									onClick={() => navigate(`/${option.toLowerCase()}`)}
									className="flex flex-col justify-center hover:underline underline-offset-4 cursor-pointer"
								>
									{option}
								</div>
							))}
						</div>
						<button
							className="bg-blue-800 w-[200px] hover:bg-blue-900 text-white py-3 px-6 cursor-pointer outline-none rounded-full"
							onClick={buttonOnClick}
						>
							<span className="flex flex-col justify-center">{button}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
