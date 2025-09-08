const crypto = require("crypto");
const { API_SALT } = require("../config");

async function generateAPI() {
	// Generate API key and secret
	const apiKey = crypto.randomBytes(16).toString("hex");
	const apiSecret = crypto.randomBytes(32).toString("hex");

	// Add timestamp for expiration tracking
	const createdAt = new Date().toISOString();

	// Hash the values for storage
	const hashedApiKey = await generateHash(apiKey);
	const hashedApiSecret = await generateHash(apiSecret);

	return {
		apiKey,
		apiSecret,
		hashedApiKey,
		hashedApiSecret,
		createdAt,
	};
}

async function generateHash(data) {
	// Use sha256 with salt for better security
	const salt = API_SALT || "payzee_default_salt";
	return crypto
		.createHash("sha256")
		.update(data + salt)
		.digest("hex");
}

function isApiKeyExpired(createdAt, maxAgeHours = 24) {
	const created = new Date(createdAt);
	const now = new Date();
	const diffHours = (now - created) / (1000 * 60 * 60);
	return diffHours > maxAgeHours;
}

module.exports = {
	generateAPI,
	generateHash,
	isApiKeyExpired,
};
