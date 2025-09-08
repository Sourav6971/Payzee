const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config");

const { disconnect } = require("./utils/db");

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
	return res.json({
		msg: "Welcome to Payzee - A Solana Payment Gateway",
		version: "1.0.0",
		status: "operational"
	});
});

// Health check endpoint
app.get("/health", async (req, res) => {
	return res.json({
		status: "healthy",
		timestamp: new Date().toISOString(),
		uptime: process.uptime()
	});
});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/transaction", require("./routes/transaction"));

const server = app.listen(PORT, () => {
	console.log(`Payzee Payment Gateway listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
	console.log('SIGTERM received, shutting down gracefully');
	server.close(() => {
		console.log('Process terminated');
		disconnect();
	});
});

process.on('SIGINT', () => {
	console.log('SIGINT received, shutting down gracefully');
	server.close(() => {
		console.log('Process terminated');
		disconnect();
	});
});
