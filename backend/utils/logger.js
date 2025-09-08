const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir, { recursive: true });
}

function log(level, message, metadata = {}) {
	const timestamp = new Date().toISOString();
	const logEntry = {
		timestamp,
		level,
		message,
		metadata
	};
	
	// Log to console
	console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, metadata);
	
	// Write to file (append mode)
	const logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
	const logLine = JSON.stringify(logEntry) + '\n';
	
	fs.appendFile(logFile, logLine, (err) => {
		if (err) {
			console.error('Failed to write to log file:', err);
		}
	});
}

module.exports = {
	info: (message, metadata) => log('info', message, metadata),
	error: (message, metadata) => log('error', message, metadata),
	warn: (message, metadata) => log('warn', message, metadata),
	debug: (message, metadata) => log('debug', message, metadata)
};