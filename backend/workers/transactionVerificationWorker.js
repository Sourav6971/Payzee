const { Worker } = require("bullmq");
const { Connection, clusterApiUrl, PublicKey } = require("@solana/web3.js");
const { SOLANA_CLUSTER } = require("../config");
const { updateTransactionWithTxId } = require("../utils/database");
const { sendWebhookNotification, logger } = require("../utils/http");
const { prisma } = require("../utils/database");
const { removePendingTransaction } = require("../utils/cache");

// Create a worker to process transaction verification jobs
const transactionVerificationWorker = new Worker(
	"transactionVerification",
	async (job) => {
		const { publicKey, transactionId } = job.data;
		let attempts = 0;
		const maxAttempts = 30; // 5 minutes max (10 seconds * 30)

		logger.info(
			`Starting transaction verification for publicKey: ${publicKey}, transactionId: ${transactionId}`
		);

		try {
			while (attempts < maxAttempts) {
				attempts++;

				const connection = new Connection(
					clusterApiUrl(SOLANA_CLUSTER),
					"confirmed"
				);
				let signatures = await connection.getSignaturesForAddress(
					new PublicKey(publicKey),
					{ limit: 5 } // Check more than 1 to be safe
				);

				if (signatures.length === 0) {
					logger.info("No signatures found yet for publicKey:", { publicKey });
					// Wait before next attempt
					await new Promise((resolve) => setTimeout(resolve, 10000));
					continue;
				}

				// Check all recent signatures
				for (let i = 0; i < signatures.length; i++) {
					let signature = signatures[i];
					let status = signature["confirmationStatus"];

					logger.info(`Signature ${signature.signature} status:`, { status });

					if (status === "finalized") {
						// Get transaction details
						const transactionDetails = await connection.getParsedTransaction(
							signature.signature
						);

						// Update transaction in database with txId using transactionId
						const updateResult = await updateTransactionWithTxId(
							transactionId,
							signature.signature
						);
						if (updateResult.success) {
							logger.info(
								"Transaction confirmed and updated successfully for publicKey:",
								{ publicKey }
							);

							// Remove transaction from Redis as it's now confirmed
							await removePendingTransaction(transactionId);

							// Send webhook notification
							const transaction = updateResult.transaction;
							const project = await prisma.project.findUnique({
								where: { id: transaction.project_id },
							});

							if (project && project.webhookUrl) {
								const webhookData = {
									eventType: "transaction.status.updated",
									data: {
										transactionId: transaction.id,
										status: "success",
										txId: signature.signature,
										amount: transaction.amount,
									},
								};

								const webhookResult = await sendWebhookNotification(
									project.webhookUrl,
									webhookData
								);

								if (webhookResult.success) {
									logger.info(
										"Webhook notification sent successfully for transaction:",
										{ transactionId: transaction.id }
									);
								} else {
									logger.error(
										"Failed to send webhook notification for transaction:",
										{ 
											transactionId: transaction.id,
											error: webhookResult.message 
										}
									);
								}
							}

							// Job completed successfully
							return {
								success: true,
								publicKey,
								transactionId,
								txId: signature.signature,
							};
						}
					}
				}

				// Wait before next attempt
				await new Promise((resolve) => setTimeout(resolve, 10000));
			}

			// If we've reached max attempts without success
			logger.error(
				"Transaction verification timed out for publicKey:",
				{ publicKey }
			);
			// Remove transaction from Redis as it has timed out
			await removePendingTransaction(transactionId);

			throw new Error(
				`Transaction verification timed out after ${maxAttempts} attempts`
			);
		} catch (error) {
			logger.error("Error in transaction verification worker:", { error: error.message });
			throw error;
		}
	},
	{
		// Worker options
		connection: {
			url: process.env.REDIS_URL || "redis://localhost:6379",
		},
		// Remove job from queue after completion
		removeOnComplete: { age: 3600 },
		removeOnFail: { age: 3600 },
	},
);

module.exports = transactionVerificationWorker;