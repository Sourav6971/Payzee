import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../../context/api/context';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { formatDate } from '../../utils/helpers';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function Analytics() {
	const { makeApiRequest } = useContext(ApiContext);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	// Mock data for the chart
	const chartData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		datasets: [
			{
				label: 'Transaction Volume (SOL)',
				data: [12, 19, 3, 5, 2, 3],
				borderColor: 'rgb(59, 130, 246)',
				backgroundColor: 'rgba(59, 130, 246, 0.5)',
				tension: 0.1,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Transaction Volume Over Time',
			},
		},
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await makeApiRequest({
				method: 'GET',
				url: 'api/v1/user/project',
				token: `Bearer ${token}`,
			});

			if (response) {
				setProjects(response.projects || []);
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		} finally {
			setLoading(false);
		}
	};

	// In a real implementation, we would fetch actual analytics data
	// For now, we'll use mock data to demonstrate the UI

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
				<p className="mt-2 text-gray-600">
					View insights and statistics about your transactions
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white shadow rounded-lg p-6">
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Total Volume
					</h3>
					<p className="text-3xl font-bold text-blue-600">32.5 SOL</p>
					<p className="text-sm text-gray-500 mt-1">Across all transactions</p>
				</div>

				<div className="bg-white shadow rounded-lg p-6">
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Successful Transactions
					</h3>
					<p className="text-3xl font-bold text-green-600">24</p>
					<p className="text-sm text-gray-500 mt-1">Completed payments</p>
				</div>

				<div className="bg-white shadow rounded-lg p-6">
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Success Rate
					</h3>
					<p className="text-3xl font-bold text-purple-600">86%</p>
					<p className="text-sm text-gray-500 mt-1">Successful vs total</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Transaction Volume
					</h2>
					<Line data={chartData} options={chartOptions} />
				</div>

				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Top Projects
					</h2>
					{loading ? (
						<p>Loading projects...</p>
					) : projects.length === 0 ? (
						<p>No projects found</p>
					) : (
						<ul className="divide-y divide-gray-200">
							{projects.slice(0, 5).map(project => (
								<li key={project.id} className="py-4">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-sm font-medium text-gray-900">
												{project.name}
											</h3>
											<p className="text-sm text-gray-500 mt-1">
												Project ID: {project.id.substring(0, 8)}...
											</p>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium text-gray-900">
												5 transactions
											</p>
											<p className="text-sm text-gray-500">2.5 SOL</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					Recent Activity
				</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Transaction ID
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Project
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Amount
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Status
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Date
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							<tr>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									tx_123456789
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									E-commerce Store
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									1.25 SOL
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
										Success
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									2 hours ago
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									tx_987654321
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									Subscription Service
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									0.5 SOL
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
										Pending
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									1 day ago
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
