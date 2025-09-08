const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createTransaction(
	amount,
	mode,
	projectId,
	merchantId,
	solanaAccount
) {
	try {
		const transaction = await prisma.transaction.create({
			data: {
				amount,
				merchant_id: merchantId,
				mode: mode || "other",
				project_id: projectId,
				solanaAccount,
				status: "pending",
			},
		});
		return { success: true, transaction };
	} catch (error) {
		console.error("Error creating transaction:", error);

		// Handle specific Prisma errors
		if (error.code === 'P2002') {
			return { success: false, message: "Transaction already exists" };
		}
		if (error.code === 'P2003') {
			return { success: false, message: "Invalid merchant or project ID" };
		}
		return { success: false, message: "Failed to create transaction" };
	}
}

/**
 * Find authorized merchant by API credentials
 * @param {string} hashedApiKey - Hashed API key
 * @param {string} hashedApiSecret - Hashed API secret
 * @returns {Promise<Object>} Merchant lookup result
 */
async function findAuthorizedMerchant(hashedApiKey, hashedApiSecret) {
	try {
		// Validate inputs
		if (!hashedApiKey || !hashedApiSecret) {
			return { success: false, message: "API credentials missing" };
		}

		const merchant = await prisma.merchant.findFirst({
			where: {
				api_key: hashedApiKey,
				api_secret: hashedApiSecret,
			},
		});
		
		if (!merchant) {
			return { success: false, message: "Invalid API credentials" };
		}
		
		return { success: true, merchant };
	} catch (error) {
		console.error("Error finding authorized merchant:", error);
		return { success: false, message: "Authentication error" };
	}
}

/**
 * Update transaction with Solana transaction ID and mark as successful
 * @param {string} publicKey - Solana account public key
 * @param {string} txId - Solana transaction ID
 * @returns {Promise<Object>} Transaction update result
 */
async function updateTransaction(publicKey, txId) {
	try {
		// Validate inputs
		if (!publicKey || !txId) {
			return { success: false, message: "Missing required parameters" };
		}

		const transaction = await prisma.transaction.update({
			where: {
				solanaAccount: publicKey,
			},
			data: {
				txId,
				status: "success",
				updatedAt: new Date(),
			},
		});
		return { success: true, transaction };
	} catch (error) {
		console.error("Error updating transaction:", error);
		if (error.code === 'P2025') {
			return { success: false, message: "Transaction not found" };
		}
		return { success: false, message: "Failed to update transaction" };
	}
}

/**
 * Get transaction by ID
 * @param {string} transactionId - Transaction ID
 * @returns {Promise<Object>} Transaction lookup result
 */
async function getTransactionById(transactionId) {
	try {
		if (!transactionId) {
			return { success: false, message: "Transaction ID missing" };
		}

		const transaction = await prisma.transaction.findUnique({
			where: {
				id: transactionId,
			},
		});
		
		if (!transaction) {
			return { success: false, message: "Transaction not found" };
		}
		
		return { success: true, transaction };
	} catch (error) {
		console.error("Error getting transaction:", error);
		return { success: false, message: "Failed to retrieve transaction" };
	}
}

/**
 * Update transaction status
 * @param {string} transactionId - Transaction ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Transaction update result
 */
async function updateTransactionStatus(transactionId, status) {
	try {
		if (!transactionId || !status) {
			return { success: false, message: "Missing required parameters" };
		}

		const validStatuses = ["pending", "success", "failed"];
		if (!validStatuses.includes(status)) {
			return { success: false, message: "Invalid status" };
		}

		const transaction = await prisma.transaction.update({
			where: {
				id: transactionId,
			},
			data: {
				status,
				updatedAt: new Date(),
			},
		});
		return { success: true, transaction };
	} catch (error) {
		console.error("Error updating transaction status:", error);
		if (error.code === 'P2025') {
			return { success: false, message: "Transaction not found" };
		}
		return { success: false, message: "Failed to update transaction status" };
	}
}

module.exports = {
	createTransaction,
	findAuthorizedMerchant,
	updateTransaction,
	getTransactionById,
	updateTransactionStatus,
};
