import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApiContext } from '../../context/api/context';
import { formatDate, truncateAddress } from '../../utils/helpers';

export default function Transactions() {
	const { makeApiRequest } = useContext(ApiContext);
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		amount: '',
		projectId: '',
	});
	const [projects, setProjects] = useState([]);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const projectId = searchParams.get('projectId');

	useEffect(() => {
		fetchProjects();
		fetchTransactions();
	}, [projectId]);

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
		}
	};

	const fetchTransactions = async () => {
		setLoading(true);
		try {
			// Note: The backend doesn't currently have an endpoint to fetch transactions
			// We'll simulate this for now, but in a real implementation, we would:
			// 1. Add a backend endpoint to fetch transactions
			// 2. Call that endpoint here

			// For now, we'll simulate some transactions
			const simulatedTransactions = [
				{
					id: 'txn_1',
					amount: 100,
					status: 'success',
					txId: '5DZd8vxu8vQh7W75yNXfX3u4fJXqJ98wDf6zZ7b8C9d',
					createdAt: new Date(Date.now() - 3600000),
				},
				{
					id: 'txn_2',
					amount: 250,
					status: 'pending',
					txId: null,
					createdAt: new Date(Date.now() - 7200000),
				},
				{
					id: 'txn_3',
					amount: 50,
					status: 'failed',
					txId: null,
					createdAt: new Date(Date.now() - 86400000),
				},
			];
			setTransactions(simulatedTransactions);
		} catch (error) {
			console.error('Error fetching transactions:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateTransaction = async e => {
		e.preventDefault();

		try {
			const token = localStorage.getItem('token');

			// Get the merchant's API keys
			// In a real implementation, we would retrieve stored API keys
			// For demo purposes, we'll need to generate them first

			// First, we need to get the project to ensure we have valid data
			const selectedProject = projects.find(p => p.id === formData.projectId);

			if (!selectedProject) {
				alert('Please select a valid project');
				return;
			}

			// For demo purposes, we'll just show what would happen
			// In a real implementation, this would:
			// 1. Use the merchant's stored API keys
			// 2. Call the transaction creation API
			// 3. Redirect to the returned payment page

			alert(
				`In a real implementation, this would create a transaction for ${formData.amount} SOL on project "${selectedProject.name}" and redirect to the payment page.`
			);

			// Reset form
			setShowForm(false);
			setFormData({ amount: '', projectId: '' });
		} catch (error) {
			console.error('Error creating transaction:', error);
			alert('Failed to create transaction. Please try again.');
		}
	};

	const getStatusColor = status => {
		switch (status) {
			case 'success':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'failed':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
				<button
					onClick={() => setShowForm(!showForm)}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
				>
					{showForm ? 'Cancel' : 'New Transaction'}
				</button>
			</div>

			{showForm && (
				<div className="bg-white shadow rounded-lg p-6 mb-8">
					<h2 className="text-xl font-semibold mb-4">Create New Transaction</h2>
					<form onSubmit={handleCreateTransaction}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Project
							</label>
							<select
								value={formData.projectId}
								onChange={e =>
									setFormData({ ...formData, projectId: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-md"
								required
							>
								<option value="">Select a project</option>
								{projects.map(project => (
									<option key={project.id} value={project.id}>
										{project.name}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Amount (SOL)
							</label>
							<input
								type="number"
								step="0.001"
								placeholder="0.1"
								value={formData.amount}
								onChange={e =>
									setFormData({ ...formData, amount: e.target.value })
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-md"
								required
							/>
						</div>
						<div className="flex justify-end space-x-3">
							<button
								type="button"
								onClick={() => setShowForm(false)}
								className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
							>
								Create Transaction
							</button>
						</div>
					</form>
				</div>
			)}

			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Filter by Project
				</label>
				<select
					value={projectId || ''}
					onChange={e => {
						if (e.target.value) {
							navigate(`/dashboard/transactions?projectId=${e.target.value}`);
						} else {
							navigate(`/dashboard/transactions`);
						}
					}}
					className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md"
				>
					<option value="">All Projects</option>
					{projects.map(project => (
						<option key={project.id} value={project.id}>
							{project.name}
						</option>
					))}
				</select>
			</div>

			{loading ? (
				<div className="text-center py-8">
					<p>Loading transactions...</p>
				</div>
			) : transactions.length === 0 ? (
				<div className="text-center py-8 bg-white shadow rounded-lg">
					<p className="text-gray-500">
						No transactions found. Create your first transaction to get started.
					</p>
				</div>
			) : (
				<div className="bg-white shadow rounded-lg overflow-hidden">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									ID
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Amount (SOL)
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
									Tx ID
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
							{transactions.map(transaction => (
								<tr key={transaction.id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{transaction.id.substring(0, 8)}...
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{transaction.amount}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
												transaction.status
											)}`}
										>
											{transaction.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{transaction.txId ? (
											<span className="text-blue-600 hover:underline cursor-pointer">
												{truncateAddress(transaction.txId, 10, 5)}
											</span>
										) : (
											'Pending'
										)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(transaction.createdAt)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
