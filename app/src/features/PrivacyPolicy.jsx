import React from 'react';

export default function PrivacyPolicy() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

			<div className="prose prose-lg text-gray-600">
				<p className="mb-4">
					Last updated:{' '}
					{new Date().toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Introduction
				</h2>
				<p className="mb-4">
					Payzee ("we", "our", or "us") is committed to protecting your privacy.
					This Privacy Policy explains how we collect, use, disclose, and
					safeguard your information when you use our payment gateway services.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Information We Collect
				</h2>
				<h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
					Personal Information
				</h3>
				<p className="mb-4">
					We may collect personally identifiable information that you
					voluntarily provide, including:
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>Name and contact information</li>
					<li>Email address</li>
					<li>Business information</li>
					<li>Wallet addresses (public keys only)</li>
				</ul>

				<h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
					Usage Information
				</h3>
				<p className="mb-4">
					We automatically collect information about your interaction with our
					services:
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>IP address</li>
					<li>Browser type and version</li>
					<li>Pages visited</li>
					<li>Time and date of visits</li>
					<li>Referring website</li>
				</ul>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					How We Use Your Information
				</h2>
				<p className="mb-4">
					We use your information for the following purposes:
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>To provide and maintain our services</li>
					<li>To process transactions</li>
					<li>To communicate with you</li>
					<li>To detect and prevent fraudulent activity</li>
					<li>To improve our services</li>
					<li>To comply with legal obligations</li>
				</ul>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Information Sharing
				</h2>
				<p className="mb-4">
					We do not sell, trade, or otherwise transfer your personal information
					to third parties except in the following circumstances:
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>With your consent</li>
					<li>To comply with legal requirements</li>
					<li>To protect our rights and property</li>
					<li>
						With service providers who assist us in operating our services
					</li>
				</ul>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Data Security
				</h2>
				<p className="mb-4">
					We implement appropriate security measures to protect your
					information, including:
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>Encryption of data in transit and at rest</li>
					<li>Regular security assessments</li>
					<li>Access controls and authentication</li>
					<li>Employee training on data protection</li>
				</ul>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Data Retention
				</h2>
				<p className="mb-4">
					We retain your information for as long as necessary to provide our
					services and comply with legal obligations. Transaction data is
					retained for a minimum of 7 years as required by financial
					regulations.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Your Rights
				</h2>
				<p className="mb-4">You have the right to:</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>Access your personal information</li>
					<li>Correct inaccurate information</li>
					<li>Request deletion of your information</li>
					<li>Object to processing of your information</li>
					<li>Data portability</li>
				</ul>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Children's Privacy
				</h2>
				<p className="mb-4">
					Our services are not intended for individuals under the age of 18. We
					do not knowingly collect personal information from children.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Changes to This Policy
				</h2>
				<p className="mb-4">
					We may update this Privacy Policy from time to time. We will notify
					you of any changes by posting the new policy on this page and updating
					the "Last updated" date.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					Contact Us
				</h2>
				<p className="mb-4">
					If you have any questions about this Privacy Policy, please contact us
					at:
				</p>
				<p className="mb-4">Email: privacy@payzee.com</p>
			</div>
		</div>
	);
}
