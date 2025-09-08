const { prisma } = require("./client");
const { generateAPI } = require("../../scripts/api");

/**
 * Create a new merchant
 * @param {string} publicKey - Merchant's public key
 * @param {string} firstName - Merchant's first name
 * @param {string} lastName - Merchant's last name
 * @param {string} email - Merchant's email
 * @param {string} password - Merchant's hashed password
 * @returns {Promise<Object>} Creation result
 */
async function createMerchant(publicKey, firstName, lastName, email, password) {
	try {
		const merchant = await prisma.merchant.create({
			data: {
				publicKey,
				firstName,
				lastName,
				email,
				password,
			},
			select: {
				id: true,
			},
		});

		return {
			success: true,
			id: merchant.id,
		};
	} catch (error) {
		console.error("Error creating merchant:", error);

		// Handle specific Prisma errors
		if (error.code === "P2002") {
			// Unique constraint violation
			if (error.meta?.target?.includes("email")) {
				return { success: false, message: "Email already registered" };
			}
			if (error.meta?.target?.includes("publicKey")) {
				return { success: false, message: "Public key already registered" };
			}
		}
		return { success: false, message: "Failed to create merchant" };
	}
}

/**
 * Find a merchant by email or ID
 * @param {string} identifier - Merchant's email or ID
 * @returns {Promise<Object>} Merchant lookup result
 */
async function findMerchant(identifier) {
	try {
		// Determine if identifier is an email or ID
		const whereClause = identifier.includes("@")
			? { email: identifier }
			: { id: identifier };

		const merchant = await prisma.merchant.findFirst({
			where: whereClause,
		});
		if (!merchant) return { success: false, message: "Merchant not found" };
		return { success: true, merchant };
	} catch (error) {
		console.error("Error finding merchant:", error);
		return { success: false, message: "Database error" };
	}
}

/**
 * Find a merchant by ID
 * @param {string} merchantId - Merchant's ID
 * @returns {Promise<Object>} Merchant lookup result
 */
async function findMerchantById(merchantId) {
	try {
		const merchant = await prisma.merchant.findFirst({
			where: {
				id: merchantId,
			},
		});
		if (!merchant) return { success: false, message: "Merchant not found" };
		return { success: true, merchant };
	} catch (error) {
		console.error("Error finding merchant by ID:", error);
		return { success: false, message: "Database error" };
	}
}

/**
 * Update a merchant's API keys
 * @param {string} merchantId - Merchant's ID
 * @returns {Promise<Object>} Update result
 */
async function updateMerchant(merchantId) {
	const apiData = await generateAPI();
	try {
		await prisma.merchant.update({
			where: {
				id: merchantId,
			},
			data: {
				api_key: apiData.hashedApiKey,
				api_secret: apiData.hashedApiSecret,
				updatedAt: new Date(),
			},
		});
		//The user can see the apikey and apisecret only once. He needs to save the apiKey and the apiSecret for future use
		return {
			success: true,
			apiKey: apiData.apiKey,
			apiSecret: apiData.apiSecret,
			createdAt: apiData.createdAt,
		};
	} catch (error) {
		console.error("Error updating merchant API keys:", error);
		if (error.code === "P2025") {
			return { success: false, message: "Merchant not found" };
		}
		return { success: false, message: "Failed to generate API keys" };
	}
}

module.exports = {
	createMerchant,
	findMerchant,
	findMerchantById,
	updateMerchant,
};