const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const {
	enqueueTransaction,
	init,
	consumeTransaction,
} = require("./utils/redis");
const { createPaymentAccount } = require("./utils/solana");
const { getProjectById, updateTransactionStatus } = require("./utils/database");
const { processPayment } = require("./utils/paymentProcessor");
const userRoutes = require("./routes/user");

const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
	res.json({
		msg: "Payzee Payment Gateway running successfully",
	});
});

// Initiate a payment
app.post("/api/payment", async (req, res) => {
	try {
		const { amount, projectId } = req.body;
		
		// Validate project exists
		const project = await getProjectById(projectId);
		if (!project) {
			return res.status(404).json({
				error: "Project does not exist",
			});
		}
		
		// Create a new Solana account for this payment
		const paymentAccount = createPaymentAccount();
		
		// Create transaction record
		const transaction = await prisma.transaction.create({
			data: {
				amount: amount, // Amount in lamports
				fromKey: "", // Will be filled when customer provides their wallet
				toKey: project.publicKey,
				merchant_id: project.merchant_id,
				project_id: projectId,
				solanaAccount: paymentAccount.publicKey,
				redirectUrl: `/payment/${paymentAccount.publicKey}`, // Temporary redirect URL
			},
		});
		
		// Add to processing queue
		await init();
		await enqueueTransaction(transaction.id, {
			transactionId: transaction.id,
			amount: amount,
			solanaAccount: paymentAccount.publicKey,
		});
		
		// Return payment details
		res.status(201).json({
			message: "Payment initiated successfully",
			transactionId: transaction.id,
			amount: transaction.amount,
			solanaAccount: paymentAccount.publicKey,
			redirectUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/pay/${transaction.id}`,
		});
	} catch (error) {
		console.error("Error initiating payment:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

// Customer payment page - this would be handled by frontend
app.get("/pay/:transactionId", async (req, res) => {
	try {
		const { transactionId } = req.params;
		
		// Get transaction details
		const transaction = await prisma.transaction.findUnique({
			where: { id: transactionId },
			include: { project: true },
		});
		
		if (!transaction) {
			return res.status(404).json({
				error: "Transaction not found",
			});
		}
		
		if (transaction.status !== "pending") {
			return res.status(400).json({
				error: "Transaction is not pending",
			});
		}
		
		// In a real implementation, this would serve an HTML page
		// For now, we'll return JSON with payment details
		res.json({
			transactionId: transaction.id,
			amount: transaction.amount,
			solanaAccount: transaction.solanaAccount,
			projectName: transaction.project.name,
			instructions: "Send the exact amount of SOL to the provided Solana account address",
		});
	} catch (error) {
		console.error("Error fetching payment details:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

// Webhook endpoint for merchants to receive payment notifications
app.post("/api/webhook/:projectId", async (req, res) => {
	try {
		const { projectId } = req.params;
		const eventData = req.body;
		
		// In a production environment, you would verify the webhook signature here
		// For now, we'll just log the event
		
		console.log(`Webhook received for project ${projectId}:`, eventData);
		
		res.status(200).json({
			message: "Webhook received",
		});
	} catch (error) {
		console.error("Error processing webhook:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

// Process a specific transaction (manual trigger for testing)
app.post("/api/process/:transactionId", async (req, res) => {
	try {
		const { transactionId } = req.params;
		
		const result = await processPayment(transactionId);
		
		res.json({
			message: "Payment processing completed",
			result,
		});
	} catch (error) {
		console.error("Error processing payment:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

// Consume transactions from queue and process them
app.post("/api/process-queue", async (req, res) => {
	try {
		await init();
		const tx = await consumeTransaction();
		
		if (!tx) {
			return res.json({ msg: "No transaction in queue" });
		}
		
		// Process the payment
		const result = await processPayment(tx.transactionId);
		
		res.json({ 
			msg: "Transaction processed", 
			transaction: tx,
			result,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Internal server error" });
	}
});

// Get transaction status
app.get("/api/transaction/:transactionId", async (req, res) => {
	try {
		const { transactionId } = req.params;
		
		const transaction = await prisma.transaction.findUnique({
			where: { id: transactionId },
			include: { project: true },
		});
		
		if (!transaction) {
			return res.status(404).json({
				error: "Transaction not found",
			});
		}
		
		res.json({
			transaction,
		});
	} catch (error) {
		console.error("Error fetching transaction:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

app.listen(PORT, () => {
	console.log(`Payzee Payment Gateway listening on port ${PORT}`);
});
