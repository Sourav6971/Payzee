import React from 'react';

export default function TermsOfService() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-6">
				Terms of Service
			</h1>

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
					1. Acceptance of Terms
				</h2>
				<p className="mb-4">
					By accessing or using the Payzee payment gateway services, you agree
					to be bound by these Terms of Service and all applicable laws and
					regulations. If you do not agree with any of these terms, you are
					prohibited from using or accessing this service.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					2. Description of Service
				</h2>
				<p className="mb-4">
					Payzee provides a cryptocurrency payment gateway service that enables
					merchants to accept payments in Solana (SOL) and other supported
					cryptocurrencies. The service includes transaction processing,
					merchant dashboard, API access, and related features.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					3. Merchant Account
				</h2>
				<h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
					3.1 Account Registration
				</h3>
				<p className="mb-4">
					To use our services, you must register for a merchant account and
					provide accurate, complete information. You are responsible for
					maintaining the confidentiality of your account credentials.
				</p>

				<h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
					3.2 Account Security
				</h3>
				<p className="mb-4">
					You are responsible for all activities that occur under your account.
					You agree to notify us immediately of any unauthorized use of your
					account.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					4. Transaction Processing
				</h2>
				<h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
					4.1 Payment Processing
				</h3>
				<p className="mb-4">
					We process cryptocurrency transactions on behalf of merchants.
					Transactions are final and irreversible once confirmed on the
					blockchain.
				</p>

				<h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
					4.2 Fees
				</h3>
				<p className="mb-4">
					We charge a processing fee for each transaction. Current fees are
					displayed in your merchant dashboard and may be updated with 30 days'
					notice.
				</p>

				<h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">
					4.3 Settlements
				</h3>
				<p className="mb-4">
					Funds from processed transactions are settled to your designated
					wallet address according to our settlement schedule.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					5. Merchant Obligations
				</h2>
				<p className="mb-4">Merchants agree to:</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>Comply with all applicable laws and regulations</li>
					<li>Provide accurate business and product information</li>
					<li>Not engage in fraudulent or deceptive practices</li>
					<li>Use our services only for lawful purposes</li>
					<li>Cooperate with our compliance and security measures</li>
				</ul>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					6. Prohibited Activities
				</h2>
				<p className="mb-4">Merchants may not use our services for:</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>Illegal activities or products</li>
					<li>Fraudulent transactions</li>
					<li>Money laundering</li>
					<li>Violating intellectual property rights</li>
					<li>Engaging in spam or unsolicited communications</li>
				</ul>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					7. Intellectual Property
				</h2>
				<p className="mb-4">
					All content, features, and functionality of our services are owned by
					Payzee and are protected by international copyright, trademark,
					patent, trade secret, and other intellectual property laws.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					8. Limitation of Liability
				</h2>
				<p className="mb-4">
					To the maximum extent permitted by law, Payzee shall not be liable for
					any indirect, incidental, special, consequential, or punitive damages,
					including without limitation, loss of profits, data, use, goodwill, or
					other intangible losses.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					9. Disclaimer of Warranties
				</h2>
				<p className="mb-4">
					Our services are provided "as is" and "as available" without
					warranties of any kind, either express or implied, including but not
					limited to, implied warranties of merchantability, fitness for a
					particular purpose, or non-infringement.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					10. Indemnification
				</h2>
				<p className="mb-4">
					You agree to indemnify and hold harmless Payzee, its affiliates,
					officers, agents, and employees from any claim or demand, including
					reasonable attorneys' fees, made by any third party due to or arising
					out of your use of our services.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					11. Termination
				</h2>
				<p className="mb-4">
					We may terminate or suspend your account and access to our services
					immediately, without prior notice, for any reason, including breach of
					these Terms.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					12. Governing Law
				</h2>
				<p className="mb-4">
					These Terms shall be governed by and construed in accordance with the
					laws of [Jurisdiction], without regard to its conflict of law
					provisions.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					13. Changes to Terms
				</h2>
				<p className="mb-4">
					We reserve the right to modify these Terms at any time. We will notify
					you of any changes by posting the new terms on this page and updating
					the "Last updated" date.
				</p>

				<h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
					14. Contact Information
				</h2>
				<p className="mb-4">
					If you have any questions about these Terms, please contact us at:
				</p>
				<p className="mb-4">Email: legal@payzee.com</p>
			</div>
		</div>
	);
}
