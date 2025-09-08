const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { generateAPI } = require("../scripts/api");

// Create a single Prisma instance for the application
const prisma = new PrismaClient({
	log: [
		{
			emit: "event",
			level: "query",
		},
		{
			emit: "event",
			level: "error",
		},
	],
});

if (process.env.NODE_ENV !== "production") {
	prisma.$on("query", (e) => {
		console.log("Prisma Query:", e.query, e.params);
	});

	prisma.$on("error", (e) => {
		console.error("Prisma Error:", e);
	});
}

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

async function createProject(name, webhookUrl, merchantId, publicKey) {
	try {
		// Check if project name already exists for this merchant
		const existingProject = await prisma.project.findFirst({
			where: {
				name,
				merchant_id: merchantId,
			},
		});
		if (existingProject) {
			return {
				success: false,
				message: "Project with same name already exists",
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
		console.error("Error creating project:", error);
		if (error.code === "P2003") {
			return { success: false, message: "Invalid merchant ID" };
		}
		return { success: false, message: "Failed to create project" };
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
		console.error("Error finding project:", error);
		return { success: false, message: "Database error" };
	}
}

async function findProjects(merchantId) {
	try {
		const projects = await prisma.project.findMany({
			where: {
				merchant_id: merchantId,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		if (!projects.length)
			return { success: false, message: "No projects exist" };
		return { success: true, projects };
	} catch (error) {
		console.error("Error finding projects:", error);
		return { success: false, message: "Database error" };
	}
}

// Graceful shutdown
async function disconnect() {
	await prisma.$disconnect();
}

module.exports = {
	createMerchant,
	updateMerchant,
	findMerchant,
	findMerchantById,
	createProject,
	findProjectById,
	findProjects,
	disconnect,
	prisma, // Export prisma instance for other modules that may need direct access
};
