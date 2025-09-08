const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config");

const { disconnect } = require("./utils/database");
const { connectRedis, disconnectRedis } = require("./utils/cache");
const transactionVerificationWorker = require("./workers/transactionVerificationWorker");
const { logger } = require("./utils/http");

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per 15 minutes
	message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(apiLimiter);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
	return res.json({
		msg: "Welcome to Payzee - A Solana Payment Gateway",
		version: "1.0.0",
		status: "operational",
	});
});

app.get("/health", async (req, res) => {
	return res.json({
		status: "healthy",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/transaction", require("./routes/transaction"));

const server = app.listen(PORT, async () => {
	logger.info(`Payzee Payment Gateway listening on port ${PORT}`);
	// Connect to Redis
	await connectRedis();
});

// Graceful shutdown
process.on("SIGTERM", () => {
	logger.info("SIGTERM received, shutting down gracefully");
	server.close(() => {
		logger.info("Process terminated");
		disconnect();
		disconnectRedis();
		// Close worker
		transactionVerificationWorker.close();
	});
});

process.on("SIGINT", () => {
	logger.info("SIGINT received, shutting down gracefully");
	server.close(() => {
		logger.info("Process terminated");
		disconnect();
		disconnectRedis();
		// Close worker
		transactionVerificationWorker.close();
	});
});
