const { Router } = require("express");
const { merchantSignup, projectInput } = require("../utils/zod");
const jwt = require("jsonwebtoken");
const {
	createMerchant,
	findMerchant,
	createProject,
	findProjectById,
	findProjects,
} = require("../utils/db");
const bcrypt = require("bcryptjs");
const { authMiddleware } = require("../middlewares");

const router = Router();

router.post("/signup", async (req, res) => {
	const body = req.body;
	const inputResponse = merchantSignup.safeParse(body);
	if (!inputResponse?.success) {
		return res.status(400).json({
			message: "Invalid input types",
		});
	}
	const { publicKey, firstName, lastName, email, password } =
		inputResponse?.data;

	const hashedPassword = bcrypt.hashSync(password);

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
			message: "Internal server error!",
		});
	}
	const token = jwt.sign(
		{ id: createMerchantResponse?.id, publicKey },
		process.env.JWT_SECRET
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
	console.log(merchantResponse);

	const comparisonResponse = await bcrypt.compareSync(
		password,
		merchantResponse?.merchant?.password
	);
	if (!comparisonResponse) {
		return res.status(401).json({
			message: "Wrong passoword",
		});
	}

	let token = jwt.sign(
		{
			id: merchantResponse?.merchant?.id,
			publicKey: merchantResponse?.merchant?.publicKey,
		},
		process.env.JWT_SECRET
	);
	return res.json({
		message: "User signed in",
		token,
	});
});

router.post("/project", authMiddleware, async (req, res) => {
	const body = req.body;
	let publicKey;
	const inputResponse = projectInput.safeParse(body);
	if (!inputResponse?.success) {
		return res.status(400).json({
			message: "Invalid or missing data",
		});
	}
	if (!inputResponse?.data?.publicKey) publicKey = req.publicKey;
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
		project: projectResponse?.project,
	});
});

module.exports = router;
