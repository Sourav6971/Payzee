import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../../context/api/context';
import Input from '../../shared/components/ui/Input';
import { copyToClipboard, formatDate } from '../../utils/helpers';

export default function Projects() {
	const { makeApiRequest } = useContext(ApiContext);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		webhookUrl: '',
	});
	const [deletingProjectId, setDeletingProjectId] = useState(null);
	const navigate = useNavigate();

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

	const handleCreateProject = async e => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');
			const response = await makeApiRequest({
				method: 'POST',
				url: 'api/v1/user/project',
				data: formData,
				token: `Bearer ${token}`,
			});

			if (response?.success) {
				setShowForm(false);
				setFormData({ name: '', webhookUrl: '' });
				fetchProjects(); // Refresh the project list
			}
		} catch (error) {
			console.error('Error creating project:', error);
		}
	};

	const handleDeleteProject = async projectId => {
		if (
			!window.confirm(
				'Are you sure you want to delete this project? This action cannot be undone.'
			)
		) {
			return;
		}

		setDeletingProjectId(projectId);
		try {
			// Note: The backend doesn't currently have a DELETE endpoint for projects
			// This is a placeholder for when that functionality is implemented
			alert(
				'Project deletion would be implemented here in a real application.'
			);

			// In a real implementation:
			// const token = localStorage.getItem("token");
			// const response = await makeApiRequest({
			// 	method: "DELETE",
			// 	url: `api/v1/user/project/${projectId}`,
			// 	token: `Bearer ${token}`,
			// });
			//
			// if (response?.success) {
			// 	fetchProjects(); // Refresh the project list
			// }
		} catch (error) {
			console.error('Error deleting project:', error);
		} finally {
			setDeletingProjectId(null);
		}
	};

	const copyProjectId = async projectId => {
		const success = await copyToClipboard(projectId);
		if (success) {
			alert('Project ID copied to clipboard!');
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Projects</h1>
				<button
					onClick={() => setShowForm(!showForm)}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
				>
					{showForm ? 'Cancel' : 'Create Project'}
				</button>
			</div>

			{showForm && (
				<div className="bg-white  rounded-lg p-6 mb-8">
					<h2 className="text-xl font-semibold mb-4">Create New Project</h2>
					<form onSubmit={handleCreateProject}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Project Name
							</label>
							<Input
								type="text"
								placeholder="My Awesome Project"
								value={formData.name}
								onChange={e =>
									setFormData({ ...formData, name: e.target.value })
								}
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Webhook URL
							</label>
							<Input
								type="url"
								placeholder="https://yourdomain.com/webhook"
								value={formData.webhookUrl}
								onChange={e =>
									setFormData({ ...formData, webhookUrl: e.target.value })
								}
								required
							/>
							<p className="mt-1 text-sm text-gray-500">
								URL where we'll send transaction status updates
							</p>
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
								Create Project
							</button>
						</div>
					</form>
				</div>
			)}

			{loading ? (
				<div className="text-center py-8">
					<p>Loading projects...</p>
				</div>
			) : projects.length === 0 ? (
				<div className="text-center py-8 ">
					<p className="text-gray-500">
						You don't have any projects yet. Create your first project to get
						started.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map(project => (
						<div
							key={project.id}
							className="bg-white  rounded-lg overflow-hidden hover:shadow-md transition-shadow"
						>
							<div className="p-6">
								<div className="flex justify-between items-start">
									<h3 className="text-lg font-semibold text-gray-900">
										{project.name}
									</h3>
									<button
										onClick={() => handleDeleteProject(project.id)}
										disabled={deletingProjectId === project.id}
										className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
									>
										{deletingProjectId === project.id
											? 'Deleting...'
											: 'Delete'}
									</button>
								</div>
								<p className="text-sm text-gray-500 mt-1">
									Created: {formatDate(project.createdAt)}
								</p>
								<div className="mt-4">
									<p className="text-sm text-gray-600 truncate">
										<span className="font-medium">Webhook:</span>{' '}
										{project.webhookUrl || 'Not set'}
									</p>
									<p className="text-sm text-gray-600 truncate mt-1">
										<span className="font-medium">Project ID:</span>{' '}
										<span className="font-mono text-xs">{project.id}</span>
									</p>
								</div>
								<div className="mt-6 flex justify-between">
									<button
										onClick={() =>
											navigate(
												`/dashboard/transactions?projectId=${project.id}`
											)
										}
										className="text-blue-600 hover:text-blue-800 text-sm font-medium"
									>
										View Transactions
									</button>
									<button
										onClick={() => copyProjectId(project.id)}
										className="text-gray-600 hover:text-gray-800 text-sm font-medium"
									>
										Copy ID
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
