import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import documentationSections from '../docs/documentationData';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Docs() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('getting-started');
	const location = useLocation();
	const navigate = useNavigate();

	// Set active section based on URL hash
	useEffect(() => {
		const hash = location.hash.replace('#', '');
		if (hash && documentationSections.some(section => section.id === hash)) {
			setActiveSection(hash);
		}
	}, [location]);

	// Scroll to section when active section changes
	useEffect(() => {
		if (activeSection) {
			const element = document.getElementById(activeSection);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}, [activeSection]);

	const handleSectionClick = sectionId => {
		setActiveSection(sectionId);
		setMobileMenuOpen(false);
		navigate(`#${sectionId}`);
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Mobile menu button */}
			<div className="md:hidden fixed top-4 right-4 z-50">
				<button
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					className="bg-white p-2 rounded-md shadow-md text-gray-700 hover:bg-gray-50 border border-gray-200"
				>
					{mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
				</button>
			</div>

			{/* Mobile sidebar */}
			{mobileMenuOpen && (
				<div className="md:hidden fixed inset-0 z-40">
					<div
						className="fixed inset-0 bg-gray-900 bg-opacity-50"
						onClick={() => setMobileMenuOpen(false)}
					></div>
					<div className="relative bg-white w-80 h-full overflow-y-auto border-r border-gray-200">
						<div className="p-6 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-900">
								Documentation
							</h2>
						</div>
						<nav className="p-4">
							<ul className="space-y-1">
								{documentationSections.map(section => (
									<li key={section.id}>
										<button
											onClick={() => handleSectionClick(section.id)}
											className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
												activeSection === section.id
													? 'bg-blue-50 text-blue-700 border border-blue-200'
													: 'text-gray-700 hover:bg-gray-50'
											}`}
										>
											{section.title}
										</button>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			)}

			<div className="max-w-8xl mx-auto">
				<div className="flex">
					{/* Desktop sidebar */}
					<div className="hidden md:block md:w-64 lg:w-72 xl:w-80 flex-shrink-0 border-r border-gray-200 min-h-screen sticky top-0">
						<div className="py-6 px-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Documentation
							</h2>
							<nav>
								<ul className="space-y-1">
									{documentationSections.map(section => (
										<li key={section.id}>
											<button
												onClick={() => handleSectionClick(section.id)}
												className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
													activeSection === section.id
														? 'bg-blue-50 text-blue-700 border border-blue-200'
														: 'text-gray-700 hover:bg-gray-50'
												}`}
											>
												{section.title}
											</button>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</div>

					{/* Main content */}
					<div className="flex-1 min-w-0">
						<div className="py-8 px-4 sm:px-6 lg:px-8">
							<div className="max-w-6xl mx-auto">
								{documentationSections.map(section => (
									<div
										key={section.id}
										id={section.id}
										className={`prose prose-lg max-w-none mb-16 ${
											activeSection === section.id ? 'block' : 'hidden'
										}`}
									>
										<div
											dangerouslySetInnerHTML={{ __html: section.content }}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
