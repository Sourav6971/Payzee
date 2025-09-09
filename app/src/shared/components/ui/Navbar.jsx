import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar({
	title,
	options,
	button,
	buttonOnClick,
	classProps,
}) {
	const navigate = useNavigate();

	const handleOptionClick = option => {
		// Handle options that are objects with actions
		if (typeof option === 'object' && option.action) {
			option.action();
		}
		// Handle string options
		else if (option === 'Docs') {
			navigate('/docs');
		} else {
			// Default behavior for other options
			navigate(`/${option.toLowerCase()}`);
		}
	};

	const getOptionLabel = option => {
		// Handle options that are objects with names
		if (typeof option === 'object' && option.name) {
			return option.name;
		}
		// Handle string options
		return option;
	};

	return (
		<div className={`w-screen p-6 h-full bg-white shadow ${classProps}`}>
			<div className=" flex flex-col justify-center ">
				<div className="flex justify-between  w-[90%] mx-auto">
					<div className=" flex flex-col justify-center align-center ">
						{title}
					</div>
					<div className="flex gap-16">
						<div className="flex gap-10">
							{options?.map(option => (
								<div
									key={getOptionLabel(option)}
									onClick={() => handleOptionClick(option)}
									className="flex flex-col justify-center hover:underline underline-offset-4 cursor-pointer"
								>
									{getOptionLabel(option)}
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

Navbar.propTypes = {
	title: PropTypes.node,
	options: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				action: PropTypes.func.isRequired,
			}),
		])
	),
	button: PropTypes.string,
	buttonOnClick: PropTypes.func,
	classProps: PropTypes.string,
};
