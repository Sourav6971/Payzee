function errorMiddleware(err, req, res, next) {
	console.error("Unhandled error:", err);
	
	// Check if headers have already been sent
	if (res.headersSent) {
		return next(err);
	}
	
	// Return a generic error response
	return res.status(500).json({
		message: "Internal server error",
	});
}

module.exports = { errorMiddleware };
