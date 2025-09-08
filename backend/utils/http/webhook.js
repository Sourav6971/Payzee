const axios = require("axios");

/**
 * Send webhook notification to the specified URL
 * @param {string} webhookUrl - The URL to send the webhook to
 * @param {Object} data - The data to send in the webhook
 * @returns {Promise<Object>} Result of the webhook request
 */
async function sendWebhookNotification(webhookUrl, data) {
	try {
		// Validate webhook URL
		if (!webhookUrl) {
			return { success: false, message: "Webhook URL is missing" };
		}

		// Send POST request to webhook URL
		const response = await axios.post(webhookUrl, data, {
			timeout: 5000,
			headers: {
				"Content-Type": "application/json",
			},
		});

		return {
			success: true,
			status: response.status,
			message: "Webhook notification sent successfully",
		};
	} catch (error) {
		console.error("Error sending webhook notification:", error.message);
		return {
			success: false,
			message: `Failed to send webhook notification: ${error.message}`,
		};
	}
}

module.exports = { sendWebhookNotification };