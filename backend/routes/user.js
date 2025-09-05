const { Router } = require("express");
const { createMerchant, createProject } = require("../utils/database");
const { generateAPI } = require("../scripts/db");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const router = Router();
const prisma = new PrismaClient();

// Merchant signup
router.post("/signup", async (req, res) => {
	try {
		const { firstName, lastName, email, password, publicKey } = req.body;

		// Check if merchant already exists
		const existingMerchant = await prisma.merchant.findUnique({
			where: { email },
		});

		if (existingMerchant) {
			return res.status(400).json({
				error: "Merchant with this email already exists",
			});
		}

		// Hash password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create merchant
		const merchant = await createMerchant(
			firstName,
			lastName,
			email,
			hashedPassword,
			publicKey
		);

		// Remove sensitive data before sending response
		const { password: _, ...merchantData } = merchant;

		res.status(201).json({
			message: "Merchant created successfully",
			merchant: merchantData,
		});
	} catch (error) {
		console.error("Error creating merchant:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

// Merchant login
router.post("/signin", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find merchant
		const merchant = await prisma.merchant.findUnique({
			where: { email },
		});

		if (!merchant) {
			return res.status(401).json({
				error: "Invalid credentials",
			});
		}

		// Check password
		const isPasswordValid = await bcrypt.compare(password, merchant.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				error: "Invalid credentials",
			});
		}

		// Remove sensitive data before sending response
		const { password: _, ...merchantData } = merchant;

		res.json({
			message: "Login successful",
			merchant: merchantData,
		});
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

// Create project
router.post("/projects", async (req, res) => {
	try {
		const { merchantId, name, publicKey, webhookUrl } = req.body;

		// Verify merchant exists
		const merchant = await prisma.merchant.findUnique({
			where: { id: merchantId },
		});

		if (!merchant) {
			return res.status(404).json({
				error: "Merchant not found",
			});
		}

		// Create project
		const project = await createProject(merchantId, name, publicKey, webhookUrl);

		res.status(201).json({
			message: "Project created successfully",
			project,
		});
	} catch (error) {
		console.error("Error creating project:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

// Get merchant projects
router.get("/projects/:merchantId", async (req, res) => {
	try {
		const { merchantId } = req.params;

		// Verify merchant exists
		const merchant = await prisma.merchant.findUnique({
			where: { id: merchantId },
		});

		if (!merchant) {
			return res.status(404).json({
				error: "Merchant not found",
			});
		}

		// Get projects
		const projects = await prisma.project.findMany({
			where: { merchant_id: merchantId },
		});

		res.json({
			projects,
		});
	} catch (error) {
		console.error("Error fetching projects:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
});

module.exports = router;
