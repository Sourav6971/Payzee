const { createClient } = require("redis");
const { REDIS_URL } = require("../../config");
const { logger } = require("../../utils/http");

const redisClient = createClient({
	url: REDIS_URL,
});

redisClient.on("error", (err) => {
	logger.error("Redis Client Error:", { error: err.message });
});

async function connectRedis() {
	try {
		await redisClient.connect();
		logger.info("Connected to Redis successfully");
	} catch (error) {
		logger.error("Failed to connect to Redis:", { error: error.message });
	}
}

async function disconnectRedis() {
	try {
		await redisClient.quit();
		logger.info("Disconnected from Redis");
	} catch (error) {
		logger.error("Error disconnecting from Redis:", { error: error.message });
	}
}

module.exports = {
	connectRedis,
	disconnectRedis,
	redisClient,
};
