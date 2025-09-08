require("dotenv").config();

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "fallback_jwt_secret_for_dev_only";
const API_SALT = process.env.API_SALT ?? "fallback_api_salt_for_dev_only";
const REDIS_URL = process.env.REDIS_URL ?? "redis://localhost:6379";

if (
	process.env.NODE_ENV === "production" &&
	(!JWT_SECRET || JWT_SECRET === "fallback_jwt_secret_for_dev_only")
) {
	throw new Error("JWT_SECRET must be set in production environment");
}

const API_URL =
	process.env.NODE_ENV === "production"
		? process.env.APP_URL
		: "http://localhost:5173";

const SOLANA_CLUSTER = process.env.SOLANA_CLUSTER || "devnet";

module.exports = {
	PORT,
	JWT_SECRET,
	API_URL,
	API_SALT,
	SOLANA_CLUSTER,
	REDIS_URL,
};
