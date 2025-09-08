const { sendWebhookNotification } = require('./webhook');
const logger = require('./logger');

module.exports = {
	sendWebhookNotification,
	logger,
};