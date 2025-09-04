const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { generateAPI } = require("../scripts/db");
const prisma = new PrismaClient();

async function createMerchant(firstName, lastName, email, password, publicKey) {
	const apiValue = await generateAPI();

	const merchant = await prisma.merchant.create({
		data: {
			api_key: apiValue.apiKey,
			api_secret: apiValue.apiSecret,
			email,
			firstName,
			lastName,
			password,
			publicKey,
		},
	});
	console.log(merchant);
	return merchant;
}

async function createProject(merchantId, name, publicKey, webhookUrl) {
	const project = await prisma.project.create({
		data: {
			name,
			publicKey,
			webhookUrl,
			merchant_id: merchantId,
		},
	});
	return project;
}

async function getProjectById(projectId) {
	return await prisma.project.findUnique({
		where: {
			id: projectId,
		},
	});
}

async function getTransactionById(transactionId) {
	return await prisma.transaction.findUnique({
		where: {
			id: transactionId,
		},
		include: {
			project: true,
		},
	});
}

async function updateTransactionStatus(transactionId, status, txId = null) {
	const data = { status };
	if (txId) {
		data.txId = txId;
	}
	
	return await prisma.transaction.update({
		where: {
			id: transactionId,
		},
		data,
	});
}

module.exports = { 
	createMerchant, 
	createProject, 
	getProjectById, 
	getTransactionById,
	updateTransactionStatus,
};
