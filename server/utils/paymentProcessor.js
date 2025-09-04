const { checkPaymentReceived } = require('./solana');
const { updateTransactionStatus } = require('./database');
const { sendWebhook } = require('./webhook');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Process a payment by checking the Solana account
 * @param {string} transactionId - ID of the transaction to process
 * @returns {Object} Processing result
 */
async function processPayment(transactionId) {
	try {
		// Get transaction details
		const transaction = await prisma.transaction.findUnique({
			where: { id: transactionId },
			include: { project: true },
		});

		if (!transaction) {
			throw new Error('Transaction not found');
		}

		if (transaction.status !== 'pending') {
			return {
				success: false,
				message: 'Transaction already processed',
			};
		}

		if (!transaction.solanaAccount) {
			throw new Error('Solana account not found for transaction');
		}

		// Check if payment has been received
		const paymentResult = await checkPaymentReceived(
			transaction.solanaAccount,
			transaction.amount / 1000000000 // Convert lamports to SOL
		);

		if (paymentResult.received && paymentResult.sufficient) {
			// Update transaction status to success
			await updateTransactionStatus(transactionId, 'success');

			// Send webhook to merchant
			const webhookData = {
				event: 'payment.success',
				transactionId: transaction.id,
				amount: transaction.amount,
				fromKey: transaction.fromKey,
				toKey: transaction.toKey,
				timestamp: new Date().toISOString(),
			};

			const webhookResult = await sendWebhook(
				transaction.project.webhookUrl,
				webhookData
			);

			return {
				success: true,
				message: 'Payment successful',
				webhookResult,
			};
		} else {
			// Payment not received or insufficient
			return {
				success: false,
				message: 'Payment not received or insufficient',
				paymentResult,
			};
		}
	} catch (error) {
		console.error('Error processing payment:', error);
		
		// Update transaction status to failed
		await updateTransactionStatus(transactionId, 'failed');
		
		return {
			success: false,
			message: 'Error processing payment',
			error: error.message,
		};
	}
}

/**
 * Process all pending transactions
 * @returns {Array} Results of processing
 */
async function processAllPendingPayments() {
	try {
		// Get all pending transactions
		const pendingTransactions = await prisma.transaction.findMany({
			where: {
				status: 'pending',
			},
			include: {
				project: true,
			},
		});

		const results = [];
		for (const transaction of pendingTransactions) {
			const result = await processPayment(transaction.id);
			results.push({
				transactionId: transaction.id,
				...result,
			});
		}

		return results;
	} catch (error) {
		console.error('Error processing pending payments:', error);
		throw error;
	}
}

module.exports = {
	processPayment,
	processAllPendingPayments,
};