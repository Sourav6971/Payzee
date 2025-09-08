const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

async function authMiddleware(req, res, next) {
	const token = req.headers["authorization"]?.split(" ")[1];
	if (!token) {
		return res.status(401).json({
			message: "Authorization token missing",
		});
	}
	try {
		const verification = jwt.verify(token, JWT_SECRET);
		if (verification) {
			req.merchantId = verification?.id;
			req.publicKey = verification?.publicKey;
			next();
		} else {
			return res.status(401).json({
				message: "Invalid token",
			});
		}
	} catch (error) {
		console.error("Authentication error:", error);
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				message: "Session expired. Please sign in again.",
			});
		}
		return res.status(403).json({
			message: "Invalid or malformed token",
		});
	}
}

async function errorMiddleware(req, res, next) {}

module.exports = { authMiddleware };
