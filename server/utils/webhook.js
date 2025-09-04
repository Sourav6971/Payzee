const axios = require('axios');

/**
 * Send webhook notification to merchant
 * @param {string} webhookUrl - URL to send the webhook to
 * @param {Object} data - Data to send in the webhook
 * @returns {Object} Response from the webhook
 */
async function sendWebhook(webhookUrl, data) {
	try {
		const response = await axios.post(webhookUrl, data, {
			timeout: 5000, // 5 seconds timeout
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return {
			success: true,
			status: response.status,
			data: response.data,
		};
	} catch (error) {
		console.error('Webhook error:', error.message);
		return {
			success: false,
			error: error.message,
		};
	}
}

module.exports = {
	sendWebhook,
};