import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	FaHome,
	FaProjectDiagram,
	FaKey,
	FaExchangeAlt,
	FaChartLine,
} from 'react-icons/fa';

const navigationItems = [
	{ name: 'Overview', href: '/dashboard', icon: <FaHome /> },
	{ name: 'Projects', href: '/dashboard/projects', icon: <FaProjectDiagram /> },
	{ name: 'API Keys', href: '/dashboard/api-keys', icon: <FaKey /> },
	{
		name: 'Transactions',
		href: '/dashboard/transactions',
		icon: <FaExchangeAlt />,
	},
	{ name: 'Analytics', href: '/dashboard/analytics', icon: <FaChartLine /> },
];

export default function DashboardNavigation() {
	const location = useLocation();

	// For mobile, we keep the top navigation
	// For desktop, we make it a sidebar
	return (
		<>
			{/* Mobile navigation - horizontal scroll */}
			<div className="bg-white shadow md:hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex overflow-x-auto py-4 space-x-8">
						{navigationItems.map(item => {
							const isActive = location.pathname === item.href;
							return (
								<Link
									key={item.name}
									to={item.href}
									className={`flex items-center space-x-2 px-1 py-2 text-sm font-medium whitespace-nowrap ${
										isActive
											? 'text-blue-600 border-b-2 border-blue-600'
											: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
									}`}
								>
									<span>{item.icon}</span>
									<span>{item.name}</span>
								</Link>
							);
						})}
					</div>
				</div>
			</div>

			{/* Desktop navigation - sidebar */}
			<div className="hidden md:block md:w-64 md:flex-shrink-0 bg-white shadow">
				<div className="h-full overflow-y-auto">
					<nav className="px-4 py-6">
						<div className="space-y-1">
							{navigationItems.map(item => {
								const isActive = location.pathname === item.href;
								return (
									<Link
										key={item.name}
										to={item.href}
										className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
											isActive
												? 'bg-blue-50 text-blue-600'
												: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
										}`}
									>
										<span className="mr-3">{item.icon}</span>
										<span>{item.name}</span>
									</Link>
								);
							})}
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}
