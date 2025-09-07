const crypto = require("crypto");

async function generateAPI() {
	const apiKey = crypto.randomBytes(16).toString("hex");
	const apiSecret = crypto.randomBytes(32).toString("hex");
	return { apiKey, apiSecret };
}

module.exports = { generateAPI };
