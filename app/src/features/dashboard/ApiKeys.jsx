import React, { useState, useContext, useEffect } from 'react';
import { ApiContext } from '../../context/api/context';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { copyToClipboard } from '../../utils/helpers';

export default function ApiKeys() {
	const { makeApiRequest } = useContext(ApiContext);
	const [apiKeys, setApiKeys] = useState(null);
	const [copiedKey, setCopiedKey] = useState(null);
	const [copiedSecret, setCopiedSecret] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Check if we have stored API keys in localStorage
		const storedKeys = localStorage.getItem('latestApiKeys');
		if (storedKeys) {
			setApiKeys(JSON.parse(storedKeys));
		}
	}, []);

	const handleGenerateKeys = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem('token');
			const response = await makeApiRequest({
				method: 'PUT',
				url: 'api/v1/user/',
				token: `Bearer ${token}`,
			});

			if (response?.success) {
				const keys = {
					apiKey: response.apiKey,
					apiSecret: response.apiSecret,
				};
				setApiKeys(keys);
				// Store in localStorage so user can access them later
				localStorage.setItem('latestApiKeys', JSON.stringify(keys));
			}
		} catch (error) {
			console.error('Error generating API keys:', error);
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboardHandler = async (text, type) => {
		const success = await copyToClipboard(text);
		if (success) {
			if (type === 'key') {
				setCopiedKey(true);
				setTimeout(() => setCopiedKey(false), 2000);
			} else {
				setCopiedSecret(true);
				setTimeout(() => setCopiedSecret(false), 2000);
			}
		}
	};

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="bg-white  rounded-lg p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">API Keys</h1>
				<p className="text-gray-600 mb-6">
					Generate and manage your API keys for authenticating requests to the
					Payzee API.
				</p>

				<div className="mb-8">
					<button
						onClick={handleGenerateKeys}
						disabled={loading}
						className={`px-4 py-2 rounded-md ${
							loading
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-blue-600 hover:bg-blue-700'
						} text-white`}
					>
						{loading ? 'Generating...' : 'Generate New API Keys'}
					</button>
				</div>

				{apiKeys && (
					<div className="border border-gray-200 rounded-lg p-6 mb-6 bg-blue-50">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							Your New API Keys
						</h2>
						<p className="text-sm text-gray-600 mb-4">
							Please save these keys securely. You won&#39;t be able to see the
							secret again.
						</p>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									API Key
								</label>
								<div className="flex">
									<input
										type="text"
										readOnly
										value={apiKeys.apiKey}
										className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 font-mono text-sm"
									/>
									<button
										onClick={() =>
											copyToClipboardHandler(apiKeys.apiKey, 'key')
										}
										className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
									>
										{copiedKey ? <FiCheck /> : <FiCopy />}
									</button>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									API Secret
								</label>
								<div className="flex">
									<input
										type="text"
										readOnly
										value={apiKeys.apiSecret}
										className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 font-mono text-sm"
									/>
									<button
										onClick={() =>
											copyToClipboardHandler(apiKeys.apiSecret, 'secret')
										}
										className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
									>
										{copiedSecret ? <FiCheck /> : <FiCopy />}
									</button>
								</div>
							</div>

							<div className="mt-4 p-3 bg-gray-100 rounded-md">
								<h3 className="text-sm font-medium text-gray-900 mb-2">
									How to use your API keys:
								</h3>
								<pre className="text-xs text-gray-700 bg-gray-50 p-3 rounded overflow-x-auto">
									{`// For creating transactions
POST /api/v1/transaction
Headers:
  x-api-key: ${apiKeys.apiKey}
  x-api-secret: ${apiKeys.apiSecret.substring(0, 8)}...`}
								</pre>
							</div>
						</div>
					</div>
				)}

				<div className="bg-white  rounded-lg p-6 mb-8">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">
						How API Keys Work
					</h2>
					<div className="prose max-w-none text-sm text-gray-600">
						<ul className="list-disc pl-5 space-y-2">
							<li>
								<strong>API Key:</strong> Used to identify your merchant account
								when making requests
							</li>
							<li>
								<strong>API Secret:</strong> Used to authenticate your requests
								(keep this secret!)
							</li>
							<li>
								Both keys are required for creating transactions through the
								Payzee API
							</li>
							<li>
								Each time you generate new keys, the previous ones become
								invalid
							</li>
						</ul>
					</div>
				</div>

				<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-yellow-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-sm font-medium text-yellow-800">
								Security Notice
							</h3>
							<div className="mt-2 text-sm text-yellow-700">
								<ul className="list-disc space-y-1 pl-5">
									<li>
										Never share your API secret with anyone or include it in
										client-side code
									</li>
									<li>Store your API keys securely in environment variables</li>
									<li>
										If you suspect your keys have been compromised, generate new
										ones immediately
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
