const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { transactionInput } = require("../utils/zod");
const {
	findAuthorizedMercant,
	createTransaction,
} = require("../utils/transaction");
const { generateKeypair } = require("../utils/solana");

const router = Router();

router.post("/", async (req, res) => {
	const apiKey = req.headers["x-api-key"];
	const apiSecret = req.headers["x-api-secret"];

	if (!apiKey || !apiSecret)
		return res.status(401).json({
			message: "X-API-Key or X-API-Secret missing",
		});
	const body = req.body;

	const parsedResponse = transactionInput?.safeParse(body);
	if (!parsedResponse?.success) {
		return res.status(400).json({
			message: "Invalid or missing data",
		});
	}
	const authorizedMerchant = await findAuthorizedMercant(apiKey, apiSecret);
	if (!authorizedMerchant.success) {
		res.status(401).json({
			message: "Invalid api key or secret",
		});
	}
	const { amount, mode, projectId } = parsedResponse?.data;
	const createTransactionResponse = await createTransaction(
		amount,
		mode,
		projectId,
		authorizedMerchant?.merchant?.id
	);
	if (!createTransactionResponse?.success) {
		return res.status(500).json({
			message: "Server error, retry",
		});
	}

	const generateResponse = await generateKeypair();
	if (!generateResponse?.success) {
		return res.status(500).json({
			message: "Server error, retry",
		});
	}
	const { publicKey, secretKey } = generateResponse?.data;
	console.log(publicKey, secretKey);

	let redirectUrl = process.env.APP_URL ?? "http://localhost:5173/transfer";
	redirectUrl += `?transactionId=${createTransactionResponse?.transaction?.id}&publicKey=${publicKey}`;

	return res.json({
		message: "Transaction created",
		redirectUrl,
	});
});

module.exports = router;
