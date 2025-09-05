const jwt = require("jsonwebtoken");
async function authMiddleware(req, res, next) {
	const token = req.headers["authorization"]?.split(" ")[1];
	if (!token) {
		return res.status(401).json({
			message: "Unauthorized request",
		});
	}
	try {
		const verification = jwt.verify(token, process.env.JWT_SECRET);
		if (verification) {
			req.merchantId = verification?.id;
			req.publicKey = verification?.publicKey;
			next();
		}
	} catch (error) {
		console.error(error);
		return res.status(403).json({
			message: "Session timed out",
		});
	}
}

module.exports = { authMiddleware };
