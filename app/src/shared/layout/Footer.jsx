import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full  text-black flex flex-col min-h-[200px] bg-white py-20 text-center bottom-0">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				{/* Copyright */}
				<div className="border-t border-gray-200 mt-8 pt-6">
					<p className="text-gray-500 text-sm">
						&copy; {currentYear} Payzee. All rights reserved.
					</p>
					<div className="flex flex-wrap justify-center gap-4 mt-2">
						<a
							href="/privacy"
							className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
						>
							Privacy Policy
						</a>
						<a
							href="/terms"
							className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
						>
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
