const { redisClient } = require("./client");
const { logger } = require("../../utils/http");

/**
 * Add a pending transaction to Redis
 * @param {string} transactionId - Transaction ID
 * @param {string} publicKey - Public key
 * @returns {Promise<void>}
 */
async function addPendingTransaction(transactionId, publicKey) {
	try {
		await redisClient.hSet("pending_transactions", transactionId, publicKey);
		logger.info(`Added transaction ${transactionId} to Redis pending transactions`);
	} catch (error) {
		logger.error("Error adding pending transaction to Redis:", { error: error.message });
	}
}

/**
 * Remove a completed transaction from Redis
 * @param {string} transactionId - Transaction ID
 * @returns {Promise<void>}
 */
async function removePendingTransaction(transactionId) {
	try {
		await redisClient.hDel("pending_transactions", transactionId);
		logger.info(`Removed transaction ${transactionId} from Redis pending transactions`);
	} catch (error) {
		logger.error("Error removing pending transaction from Redis:", { error: error.message });
	}
}

/**
 * Get all pending transactions from Redis
 * @returns {Promise<Object>} Pending transactions
 */
async function getAllPendingTransactions() {
	try {
		const transactions = await redisClient.hGetAll("pending_transactions");
		return transactions;
	} catch (error) {
		logger.error("Error getting pending transactions from Redis:", { error: error.message });
		return {};
	}
}

module.exports = {
	addPendingTransaction,
	removePendingTransaction,
	getAllPendingTransactions,
};