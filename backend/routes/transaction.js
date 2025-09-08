const { Router } = require("express");
const { transactionInput } = require("../utils/validation");
const {
	findAuthorizedMerchant,
	createTransaction,
	getTransactionById,
} = require("../utils/database");
const { generateKeypair } = require("../utils/blockchain");
const { API_URL } = require("../config");
const { generateHash } = require("../utils/api");
const { addPendingTransaction } = require("../utils/cache");
const { addTransactionVerificationJob } = require("../workers/queueService");

const router = Router();

/**
 * Create a new transaction
 * POST /api/v1/transaction
 *
 * Headers:
 * - x-api-key: Merchant API key
 * - x-api-secret: Merchant API secret
 *
 * Body:
 * - amount: number (required)
 * - projectId: string (required)
 * - mode: string (optional)
 */
router.post("/", async (req, res) => {
	try {
		const apiKey = req.headers["x-api-key"];
		const apiSecret = req.headers["x-api-secret"];

		if (!apiKey || !apiSecret) {
			return res.status(401).json({
				message: "X-API-Key or X-API-Secret missing",
			});
		}

		const body = req.body;
		const parsedResponse = transactionInput.safeParse(body);

		if (!parsedResponse.success) {
			return res.status(400).json({
				message: "Invalid or missing data",
				errors: parsedResponse.error.issues,
			});
		}

		const hashedApiKey = await generateHash(apiKey);
		const hashedApiSecret = await generateHash(apiSecret);

		const authorizedMerchant = await findAuthorizedMerchant(
			hashedApiKey,
			hashedApiSecret
		);

		if (!authorizedMerchant.success) {
			return res.status(401).json({
				message: authorizedMerchant.message || "Invalid API key or secret",
			});
		}

		// Extract transaction data
		const { amount, mode, projectId } = parsedResponse.data;

		const generateResponse = await generateKeypair();
		if (!generateResponse.success) {
			return res.status(500).json({
				message: "Server error generating keypair, please retry",
			});
		}

		const { publicKey } = generateResponse.data;

		const createTransactionResponse = await createTransaction(
			amount,
			mode,
			projectId,
			authorizedMerchant.merchant.id,
			publicKey
		);

		if (!createTransactionResponse.success) {
			return res.status(500).json({
				message:
					createTransactionResponse.message ||
					"Server error creating transaction, please retry",
			});
		}

		// Store pending transaction in Redis
		await addPendingTransaction(
			createTransactionResponse.transaction.id,
			publicKey
		);

		await addTransactionVerificationJob(
			publicKey,
			createTransactionResponse.transaction.id
		);

		let redirectUrl = API_URL || "http://localhost:5173/transfer";
		redirectUrl += `?transactionId=${createTransactionResponse.transaction.id}&publicKey=${publicKey}`;

		return res.status(201).json({
			message: "Transaction created successfully",
			redirectUrl,
			transactionId: createTransactionResponse.transaction.id,
			publicKey,
		});
	} catch (error) {
		console.error("Unexpected error in transaction creation:", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
});

/**
 * Get transaction by ID
 * GET /api/v1/transaction/:id
 */
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Transaction ID is required",
			});
		}

		const transactionResponse = await getTransactionById(id);

		if (!transactionResponse.success) {
			return res.status(404).json({
				message: transactionResponse.message,
			});
		}

		return res.json({
			message: "Transaction retrieved successfully",
			transaction: transactionResponse.transaction,
		});
	} catch (error) {
		console.error("Error retrieving transaction:", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
});

module.exports = router;
