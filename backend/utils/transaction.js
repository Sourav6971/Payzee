const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createTransaction(amount, mode, projectId, merchantId) {
	try {
		const transaction = await prisma.transaction.create({
			data: {
				amount,
				merchant_id: merchantId,
				mode,
				project_id: projectId,
			},
		});
		return { success: true, transaction };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
}

async function findAuthorizedMercant(apiKey, apiSecret) {
	try {
		const merchant = await prisma.merchant.findFirst({
			where: {
				api_key: apiKey,
			},
		});
		const verifyMerchant = bcrypt.compareSync(apiSecret, merchant?.api_secret);
		if (!verifyMerchant) {
			return { success: false };
		}
		return { success: true, merchant };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
}

module.exports = { createTransaction, findAuthorizedMercant };
