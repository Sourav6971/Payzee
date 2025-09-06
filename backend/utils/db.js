const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

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
			id: merchant?.id,
		};
	} catch (error) {
		console.error(error);
		return { success: false };
	}
}

async function findMerchant(email) {
	try {
		const merchant = await prisma.merchant.findFirst({
			where: {
				email,
			},
		});
		if (!merchant) return { success: false };
		return { success: true, merchant };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
}
async function updateMerchant(apiKey, apiSecret, merchantId) {
	const hashedApiSecret = await bcrypt.hashSync(apiSecret);
	try {
		await prisma.merchant.update({
			where: {
				id: merchantId,
			},
			data: {
				api_key: apiKey,
				api_secret: hashedApiSecret,
			},
		});
		//The user can see the apikey and apisecret only once. He needs to save the apiKey and the apiSecret
		return { success: true, apiKey, apiSecret };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
}

async function createProject(name, webhookUrl, merchantId, publicKey) {
	try {
		const existingProject = await prisma.project.findFirst({
			where: {
				name,
			},
		});
		if (existingProject) {
			return {
				success: false,
				message: "Project with same name exist",
			};
		}
		const project = await prisma.project.create({
			data: {
				name,
				publicKey,
				webhookUrl,
				merchant_id: merchantId,
			},
		});
		return { success: true, project };
	} catch (error) {
		console.log(error);
		return { success: false, message: "Internal server error" };
	}
}
async function findProjectById(projectId, merchantId) {
	try {
		const project = await prisma.project.findFirst({
			where: {
				id: projectId,
				merchant_id: merchantId,
			},
		});
		if (!project) return { success: false, message: "Project does not exist" };
		return {
			success: true,
			project,
		};
	} catch (error) {
		console.error(error);
		return { success: false, message: "Internal server error" };
	}
}
async function findProjects(merchantId) {
	try {
		const project = await prisma.project.findMany({
			where: {
				merchant_id: merchantId,
			},
		});
		if (!project.length)
			return { success: false, message: "No projects exist" };
		return { success: true, project };
	} catch (error) {
		console.error(error);
		return { success: false, message: "Internal server error" };
	}
}

module.exports = {
	createMerchant,
	updateMerchant,
	findMerchant,
	createProject,
	findProjectById,
	findProjects,
};
