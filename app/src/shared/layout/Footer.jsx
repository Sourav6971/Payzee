import { FaGithub } from 'react-icons/fa';

const Footer = () => {
	return (
		<div className="w-full shadow text-black flex flex-col min-h-[200px] bg-white md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 py-6 text-center  bottom-0">
			<a
				href="https://github.com/Sourav6971/payzee"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center space-x-2 hover:text-gray-400 transition"
			>
				<FaGithub size={20} />
			</a>
			<span className="text-3xl">&copy;</span>
		</div>
	);
};

export default Footer;
