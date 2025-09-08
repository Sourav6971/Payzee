const { Router } = require("express");
const { merchantSignup, projectInput } = require("../utils/zod");
const jwt = require("jsonwebtoken");
const {
	createMerchant,
	findMerchant,
	createProject,
	findProjectById,
	findProjects,
	updateMerchant,
	findMerchantById,
} = require("../utils/db");
const bcrypt = require("bcryptjs");
const { authMiddleware } = require("../middlewares");
const { JWT_SECRET } = require("../config");
const { verifyPublicKey } = require("../utils/solana");

const router = Router();

router.post("/signup", async (req, res) => {
	const body = req.body;
	const inputResponse = merchantSignup.safeParse(body);
	if (!inputResponse?.success) {
		return res.status(400).json({
			message: "Invalid input types",
			errors: inputResponse?.error?.issues,
		});
	}
	const { publicKey, firstName, lastName, email, password } =
		inputResponse?.data;

	const hashedPassword = await bcrypt.hash(password, 12); // Use async hash with 12 rounds
	const validPublicKey = await verifyPublicKey(publicKey);
	if (!validPublicKey) {
		return res.status(400).json({
			message: "Invalid public key",
		});
	}

	const existingMerchant = await findMerchant(email);
	if (existingMerchant?.success) {
		return res.status(409).json({
			message: "User already exists",
		});
	}

	const createMerchantResponse = await createMerchant(
		publicKey,
		firstName,
		lastName,
		email,
		hashedPassword
	);
	if (!createMerchantResponse?.success) {
		return res.status(500).json({
			message: createMerchantResponse?.message || "Internal server error!",
		});
	}

	// Set token expiration to 24 hours
	const token = jwt.sign(
		{ id: createMerchantResponse?.id, publicKey },
		JWT_SECRET,
		{ expiresIn: "24h" }
	);

	return res.status(201).json({
		message: "User created successfully!",
		id: createMerchantResponse?.id,
		token,
	});
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			message: "Email or password missing",
		});
	}

	const merchantResponse = await findMerchant(email);
	if (!merchantResponse?.success) {
		return res.status(404).json({
			message: "User does not exist",
		});
	}

	const comparisonResponse = await bcrypt.compare(
		password,
		merchantResponse?.merchant?.password
	);
	if (!comparisonResponse) {
		return res.status(401).json({
			message: "Wrong password",
		});
	}

	// Set token expiration to 24 hours
	const token = jwt.sign(
		{
			id: merchantResponse?.merchant?.id,
			publicKey: merchantResponse?.merchant?.publicKey,
		},
		JWT_SECRET,
		{ expiresIn: "24h" }
	);

	return res.json({
		message: "User signed in",
		token,
	});
});

router.post("/project", authMiddleware, async (req, res) => {
	const body = req.body;
	let publicKey = req.publicKey; // Default to user's publicKey
	const inputResponse = projectInput.safeParse(body);
	if (!inputResponse?.success) {
		return res.status(400).json({
			message: "Invalid or missing data",
			errors: inputResponse?.error?.issues,
		});
	}

	// If a specific publicKey was provided in the request, use that instead
	if (inputResponse?.data?.publicKey) {
		publicKey = inputResponse?.data?.publicKey;
	}

	const validPublicKey = await verifyPublicKey(publicKey);
	if (!validPublicKey) {
		return res.status(400).json({
			message: "Public key is not valid",
		});
	}

	const merchantId = req.merchantId;

	const { name, webhookUrl } = inputResponse?.data;
	const projectCreateResponse = await createProject(
		name,
		webhookUrl,
		merchantId,
		publicKey
	);
	if (!projectCreateResponse?.success) {
		return res.status(500).json({
			message: projectCreateResponse?.message,
		});
	}
	return res.status(201).json({
		message: "Project created successfully",
		project: projectCreateResponse?.project,
	});
});

router.get("/project", authMiddleware, async (req, res) => {
	const projectId = req.query.projectId;
	const merchantId = req.merchantId;
	let projectResponse;
	if (!projectId) {
		projectResponse = await findProjects(merchantId);
	} else {
		projectResponse = await findProjectById(projectId, merchantId);
	}
	if (!projectResponse?.success) {
		return res.status(500).json({
			message: projectResponse?.message,
		});
	}

	return res.json({
		message: "Project fetched successfully",
		projects: projectResponse?.projects || projectResponse?.project,
	});
});

router.put("/", authMiddleware, async (req, res) => {
	const merchantId = req.merchantId;
	const merchant = await findMerchantById(merchantId);
	if (!merchant?.success) {
		return res.status(404).json({
			message: "User does not exist",
		});
	}
	const updateApiResponse = await updateMerchant(merchantId);
	if (!updateApiResponse?.success) {
		return res.status(500).json({
			message: updateApiResponse?.message || "Internal server error",
		});
	}

	return res.status(200).json({
		message: "API keys generated successfully",
		apiKey: updateApiResponse?.apiKey,
		apiSecret: updateApiResponse?.apiSecret,
	});
});

module.exports = router;
