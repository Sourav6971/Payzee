import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	FaProjectDiagram,
	FaKey,
	FaExchangeAlt,
	FaChartLine,
	FaWallet,
} from 'react-icons/fa';
import { ApiContext } from '../../context/api/context';
import { UserContext } from '../../context/user/context';
import { truncateAddress, formatDate } from '../../utils/helpers';

const dashboardItems = [
	{
		title: 'Projects',
		description: 'Manage your payment projects',
		icon: <FaProjectDiagram className="h-6 w-6" />,
		href: '/dashboard/projects',
		color: 'bg-blue-500',
	},
	{
		title: 'API Keys',
		description: 'Generate and manage API credentials',
		icon: <FaKey className="h-6 w-6" />,
		href: '/dashboard/api-keys',
		color: 'bg-green-500',
	},
	{
		title: 'Transactions',
		description: 'View and create payment transactions',
		icon: <FaExchangeAlt className="h-6 w-6" />,
		href: '/dashboard/transactions',
		color: 'bg-purple-500',
	},
	{
		title: 'Analytics',
		description: 'View payment analytics and reports',
		icon: <FaChartLine className="h-6 w-6" />,
		href: '/dashboard/analytics',
		color: 'bg-yellow-500',
	},
];

export default function DashboardOverview() {
	const { makeApiRequest } = useContext(ApiContext);
	const { connected, wallet } = useContext(UserContext);
	const location = useLocation();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('');
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Set active tab based on current route
		const path = location.pathname;
		if (path.includes('/projects')) setActiveTab('projects');
		else if (path.includes('/api-keys')) setActiveTab('api-keys');
		else if (path.includes('/transactions')) setActiveTab('transactions');
		else if (path.includes('/analytics')) setActiveTab('analytics');
		else setActiveTab('overview');

		fetchProjects();
	}, [location]);

	const fetchProjects = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await makeApiRequest({
				method: 'GET',
				url: 'api/v1/user/project',
				token: `Bearer ${token}`,
			});

			if (response?.success) {
				setProjects(response.projects || []);
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
				<p className="mt-2 text-gray-600">
					Welcome to your Payzee merchant dashboard
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
				<div className="lg:col-span-2 bg-white  rounded-lg p-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Recent Projects
					</h2>
					{loading ? (
						<p>Loading projects...</p>
					) : projects.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-gray-500">
								You don't have any projects yet. Create your first project to
								get started.
							</p>
							<Link
								to="/dashboard/projects"
								className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
							>
								Create Project
							</Link>
						</div>
					) : (
						<div className="space-y-4">
							{projects.slice(0, 3).map(project => (
								<div
									key={project.id}
									className="border border-gray-200 rounded-lg p-4"
								>
									<div className="flex justify-between">
										<h3 className="text-lg font-medium text-gray-900">
											{project.name}
										</h3>
										<span className="text-sm text-gray-500">
											Created {formatDate(project.createdAt)}
										</span>
									</div>
									<p className="text-sm text-gray-600 mt-2 truncate">
										<span className="font-medium">Webhook:</span>{' '}
										{project.webhookUrl}
									</p>
									<div className="mt-4 flex space-x-3">
										<Link
											to={`/dashboard/transactions?projectId=${project.id}`}
											className="text-blue-600 hover:text-blue-800 text-sm font-medium"
										>
											View Transactions
										</Link>
										<Link
											to={`/dashboard/projects`}
											className="text-gray-600 hover:text-gray-800 text-sm font-medium"
										>
											Manage
										</Link>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="space-y-6">
					<div className="bg-white  rounded-lg p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-4">
							Wallet Status
						</h2>
						<div className="flex items-center">
							<div
								className={`rounded-full p-2 mr-3 ${connected ? 'bg-green-100' : 'bg-red-100'}`}
							>
								<FaWallet
									className={`h-6 w-6 ${connected ? 'text-green-600' : 'text-red-600'}`}
								/>
							</div>
							<div>
								<p
									className={`text-lg font-medium ${connected ? 'text-green-600' : 'text-red-600'}`}
								>
									{connected ? 'Connected' : 'Not Connected'}
								</p>
								{connected && wallet && (
									<p className="text-sm text-gray-600 truncate">
										{truncateAddress(wallet, 6, 4)}
									</p>
								)}
							</div>
						</div>
						{!connected && (
							<p className="mt-3 text-sm text-gray-600">
								Connect your wallet to enable full functionality
							</p>
						)}
					</div>

					<div className="bg-white  rounded-lg p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-4">
							Quick Actions
						</h2>
						<div className="space-y-4">
							<Link
								to="/dashboard/projects"
								className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-md border border-blue-200"
							>
								Create New Project
							</Link>
							<Link
								to="/dashboard/api-keys"
								className="block w-full text-center bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-md border border-green-200"
							>
								Generate API Keys
							</Link>
							<Link
								to="/dashboard/transactions"
								className="block w-full text-center bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-md border border-purple-200"
							>
								View Transactions
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white  rounded-lg p-6">
				<h2 className="text-xl  text-gray-900 mb-10">Getting Started</h2>
				<div className="prose max-w-none text-md font-normal">
					<ol className="list-decimal pl-5 space-y-4">
						<li>
							<span className="text-gray-900">Create a Project:</span> Start by
							creating your first project in the Projects section. Each project
							represents a different application or service where you want to
							accept payments.
						</li>
						<li>
							<span>Generate API Keys:</span> Navigate to the API Keys section
							to generate your merchant API credentials. You'll need these to
							authenticate payment requests.
						</li>
						<li>
							<span>Integrate Payment Flow:</span> Use your API keys to
							integrate the Payzee payment flow into your application. Refer to
							the{' '}
							<a
								href="/docs"
								className="text-blue-600 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								documentation
							</a>{' '}
							for integration guides.
						</li>
						<li>
							<span>Test Transactions:</span> Create test transactions to ensure
							everything is working correctly before going live.
						</li>
						<li>
							<span>Monitor Activity:</span> Use the Transactions and Analytics
							sections to monitor your payment activity and business
							performance.
						</li>
					</ol>
				</div>

				<div className="mt-6 p-4 bg-blue-50 rounded-lg">
					<h3 className="font-medium text-blue-800">Need Help?</h3>
					<p className="mt-2 text-sm text-blue-700">
						Check out our{' '}
						<a
							href="/docs"
							className="font-medium underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							documentation
						</a>{' '}
						or contact our support team if you have any questions.
					</p>
				</div>
			</div>
		</div>
	);
}
