// redis.js
const { createClient } = require("redis");

const QUEUE_NAME = process.env.REDIS_QUEUE_NAME || "transactions";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const DEFAULT_TTL = parseInt(process.env.REDIS_TTL || "600", 10);

const client = createClient({
	url: REDIS_URL,
	socket: {
		reconnectStrategy: (retries) => {
			if (retries > 10) {
				console.error("Too many Redis retries, giving up.");
				return new Error("Redis reconnect failed");
			}

			const delay = Math.min(retries * 100, 30000);
			console.warn(`Reconnecting to Redis in ${delay}ms...`);
			return delay;
		},
	},
});

client.on("error", (err) => {
	console.error("Redis Client Error:", err);
});

client.on("connect", () => {
	console.log("Redis client connected");
});

client.on("reconnecting", () => {
	console.warn("Redis client reconnecting...");
});

client.on("end", () => {
	console.warn("Redis client connection closed");
});

async function init() {
	if (!client.isOpen) {
		try {
			await client.connect();
		} catch (err) {
			console.error("Failed to connect to Redis:", err);
			throw err;
		}
	}
}

async function enqueueTransaction(
	transactionId,
	transaction,
	ttlSeconds = DEFAULT_TTL
) {
	try {
		const payload = JSON.stringify(transaction);

		await client.set(`tx:${transactionId}`, payload, { EX: ttlSeconds });

		await client.lPush(QUEUE_NAME, transactionId);

		console.log(`Enqueued transaction: ${transactionId}`);
	} catch (err) {
		console.error("Failed to enqueue transaction:", err);
		throw err;
	}
}

async function consumeTransaction() {
	try {
		const transactionId = await client.rPop(QUEUE_NAME);
		if (!transactionId) return null;

		const data = await client.get(`tx:${transactionId}`);
		if (!data) {
			console.warn("Transaction expired or missing:", transactionId);
			return null;
		}

		return { id: transactionId, ...JSON.parse(data) };
	} catch (err) {
		console.error("Failed to consume transaction:", err);
		throw err;
	}
}

async function shutdown() {
	try {
		if (client.isOpen) {
			await client.quit();
			console.log("Redis client closed gracefully");
		}
	} catch (err) {
		console.error("Error shutting down Redis client:", err);
	}
}

module.exports = {
	init,
	enqueueTransaction,
	consumeTransaction,
	shutdown,
};
