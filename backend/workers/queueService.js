const { Queue } = require("bullmq");
const { redisClient } = require("../utils/cache");
const { logger } = require("../utils/http");

// Create a queue for transaction verification jobs
const transactionVerificationQueue = new Queue("transactionVerification", {
	connection: {
		url: process.env.REDIS_URL || "redis://localhost:6379",
	},
});

// Add a job to verify a transaction
async function addTransactionVerificationJob(publicKey, transactionId) {
	try {
		const job = await transactionVerificationQueue.add(
			"verifyTransaction",
			{
				publicKey,
				transactionId,
			},
			{
				// Job options
				attempts: 3, // Retry up to 3 times on failure
				backoff: {
					type: "exponential",
					delay: 1000, // Start with 1 second delay
				},
				// Remove job from queue after 1 hour
				removeOnComplete: { age: 3600 },
				removeOnFail: { age: 3600 },
			}
		);
		
		logger.info(`Added transaction verification job: ${job.id}`);
		return job;
	} catch (error) {
		logger.error("Error adding transaction verification job:", { error: error.message });
		throw error;
	}
}

module.exports = {
	transactionVerificationQueue,
	addTransactionVerificationJob,
};