import { useNavigate } from 'react-router-dom';
import Nav from '../../shared/layout/Nav';
import Footer from '../../shared/layout/Footer';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<Nav />
			<div className="min-h-screen font-sans overflow-hidden">
				{/* Hero Section */}
				<div className="relative pt-16 pb-20 sm:pb-24 lg:pb-32 bg-gradient-to-br from-blue-50 to-indigo-50 	min-h-[95vh] flex  flex-col justify-center">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:grid lg:grid-cols-12 lg:gap-8">
							<div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
								>
									<h1 className="text-6xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
										<span className="block">Accept Crypto Payments</span>
										<span className="block text-indigo-600 mt-2">
											With Zero Hassle
										</span>
									</h1>

									<p className="mt-6 text-xl	 text-gray-600 sm:max-w-xl sm:mx-auto lg:mx-0">
										Payzee is the easiest way to accept cryptocurrency payments.
										Low fees, lightning-fast transactions on Solana, and
										powerful analytics to grow your business.
									</p>

									<div className="mt-10 sm:flex sm:justify-center lg:justify-start">
										<div className="rounded-md shadow">
											<button
												onClick={() => navigate('/auth')}
												className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:-translate-y-1"
											>
												Get Started
											</button>
										</div>
										<div className="mt-3 sm:mt-0 sm:ml-3">
											<button
												onClick={() => navigate('/docs')}
												className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all duration-300"
											>
												Learn More
											</button>
										</div>
									</div>
								</motion.div>
							</div>

							<motion.div
								className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<div className="relative mx-auto w-full rounded-xl shadow-xl lg:max-w-lg  border border-gray-200">
									<div className="relative bg-white rounded-xl overflow-hidden">
										<div className="p-10">
											<div className="flex items-center justify-between">
												<h3 className="text-lg font-semibold text-gray-900">
													Payment Dashboard
												</h3>
												<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
													Live
												</span>
											</div>
											<div className="mt-4">
												<div className="flex items-center justify-between">
													<p className="text-sm text-gray-500">Total Revenue</p>
													<p className="text-lg font-semibold text-gray-900">
														$24,568.23
													</p>
												</div>
												<div className="mt-2">
													<div className="w-full bg-gray-200 rounded-full h-2">
														<div
															className="bg-indigo-600 h-2 rounded-full"
															style={{ width: '75%' }}
														></div>
													</div>
												</div>
											</div>
											<div className="mt-4 grid grid-cols-3 gap-4">
												<div className="bg-gray-50 p-3 rounded-lg">
													<p className="text-xs text-gray-500">Transactions</p>
													<p className="text-lg font-semibold">1,248</p>
												</div>
												<div className="bg-gray-50 p-3 rounded-lg">
													<p className="text-xs text-gray-500">Success Rate</p>
													<p className="text-lg font-semibold">98.7%</p>
												</div>
												<div className="bg-gray-50 p-3 rounded-lg">
													<p className="text-xs text-gray-500">Avg. Fee</p>
													<p className="text-lg font-semibold">0.5%</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>

				{/* Demo Video Section */}
				<div className="py-16 bg-white overflow-hidden">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
								Automatic payment verification for proxy payments
							</p>
						</div>
						<div className="mt-12 flex flex-col lg:flex-row items-center justify-between gap-8">
							<div className="relative w-full max-w-3xl">
								<div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200">
									<video
										className="w-full h-auto"
										autoPlay
										muted
										loop
										controls
										poster="/logo.png"
									>
										<source src="/transaction.mp4" type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								</div>
							</div>
							<div className="w-full max-w-md">
								<div className="bg-indigo-50 rounded-xl p-6 h-full">
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										Transaction Process
									</h3>
									<ul className="space-y-4">
										<li className="flex items-start">
											<div className="flex-shrink-0">
												<CheckCircleIcon className="h-6 w-6 text-indigo-600" />
											</div>
											<p className="ml-3 text-base text-gray-700">
												<span className="font-medium">Step 1:</span> Customer
												initiates payment
											</p>
										</li>
										<li className="flex items-start">
											<div className="flex-shrink-0">
												<CheckCircleIcon className="h-6 w-6 text-indigo-600" />
											</div>
											<p className="ml-3 text-base text-gray-700">
												<span className="font-medium">Step 2:</span> Transaction
												is broadcast to Solana network
											</p>
										</li>
										<li className="flex items-start">
											<div className="flex-shrink-0">
												<CheckCircleIcon className="h-6 w-6 text-indigo-600" />
											</div>
											<p className="ml-3 text-base text-gray-700">
												<span className="font-medium">Step 3:</span> Automatic
												verification and confirmation
											</p>
										</li>
										<li className="flex items-start">
											<div className="flex-shrink-0">
												<CheckCircleIcon className="h-6 w-6 text-indigo-600" />
											</div>
											<p className="ml-3 text-base text-gray-700">
												<span className="font-medium">Step 4:</span> Funds
												available instantly
											</p>
										</li>
									</ul>
									<div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
										<p className="text-indigo-700 font-medium">
											You just need to wait until your transaction confirms
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Features Section */}
				<div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="relative">
							<div className="lg:text-center">
								<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
									Everything you need
								</h2>
								<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
									Powerful features for your business
								</p>
								<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
									Payzee provides everything you need to accept cryptocurrency
									payments and grow your business.
								</p>
							</div>

							<div className="mt-16">
								<div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
									<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</div>
											</div>
											<div className="ml-4">
												<h3 className="text-lg font-medium text-gray-900">
													Lowest Fees
												</h3>
											</div>
										</div>
										<div className="mt-4 ml-16">
											<p className="text-base text-gray-500">
												Only 0.5% per transaction - significantly lower than
												traditional processors.
											</p>
										</div>
									</div>

									<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M13 10V3L4 14h7v7l9-11h-7z"
														/>
													</svg>
												</div>
											</div>
											<div className="ml-4">
												<h3 className="text-lg font-medium text-gray-900">
													Lightning Fast
												</h3>
											</div>
										</div>
										<div className="mt-4 ml-16">
											<p className="text-base text-gray-500">
												Transactions settle in seconds on Solana's high-speed
												blockchain.
											</p>
										</div>
									</div>

									<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
														/>
													</svg>
												</div>
											</div>
											<div className="ml-4">
												<h3 className="text-lg font-medium text-gray-900">
													Bank-Level Security
												</h3>
											</div>
										</div>
										<div className="mt-4 ml-16">
											<p className="text-base text-gray-500">
												Military-grade encryption and multi-signature wallets
												for maximum protection.
											</p>
										</div>
									</div>

									<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
														/>
													</svg>
												</div>
											</div>
											<div className="ml-4">
												<h3 className="text-lg font-medium text-gray-900">
													Advanced Analytics
												</h3>
											</div>
										</div>
										<div className="mt-4 ml-16">
											<p className="text-base text-gray-500">
												Real-time insights and detailed reports to understand
												your business performance.
											</p>
										</div>
									</div>

									<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
														/>
													</svg>
												</div>
											</div>
											<div className="ml-4">
												<h3 className="text-lg font-medium text-gray-900">
													Easy Integration
												</h3>
											</div>
										</div>
										<div className="mt-4 ml-16">
											<p className="text-base text-gray-500">
												Simple APIs and plugins for quick integration with your
												existing systems.
											</p>
										</div>
									</div>

									<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
										<div className="flex items-center">
											<div className="flex-shrink-0">
												<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
														/>
													</svg>
												</div>
											</div>
											<div className="ml-4">
												<h3 className="text-lg font-medium text-gray-900">
													24/7 Support
												</h3>
											</div>
										</div>
										<div className="mt-4 ml-16">
											<p className="text-base text-gray-500">
												Dedicated support team ready to help whenever you need
												assistance.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className="bg-indigo-700">
					<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
						<h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
							<span className="block">Ready to get started?</span>
							<span className="block text-indigo-200">
								Start accepting crypto payments today.
							</span>
						</h2>
						<div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
							<div className="inline-flex rounded-md shadow">
								<button
									onClick={() => navigate('/auth')}
									className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-300"
								>
									Get started
								</button>
							</div>
							<div className="ml-3 inline-flex rounded-md shadow">
								<button
									onClick={() => navigate('/docs')}
									className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
								>
									Learn more
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default LandingPage;
