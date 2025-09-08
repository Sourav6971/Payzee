const { prisma } = require("./client");

/**
 * Create a new project
 * @param {string} name - Project name
 * @param {string} webhookUrl - Webhook URL
 * @param {string} merchantId - Merchant ID
 * @param {string} publicKey - Public key
 * @returns {Promise<Object>} Creation result
 */
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

/**
 * Find a project by ID and merchant ID
 * @param {string} projectId - Project ID
 * @param {string} merchantId - Merchant ID
 * @returns {Promise<Object>} Project lookup result
 */
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

/**
 * Find all projects for a merchant
 * @param {string} merchantId - Merchant ID
 * @returns {Promise<Object>} Projects lookup result
 */
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

module.exports = {
	createProject,
	findProjectById,
	findProjects,
};