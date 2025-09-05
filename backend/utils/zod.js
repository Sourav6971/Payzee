const z = require("zod");

const merchantSignup = z.object({
	publicKey: z.string().trim(),
	firstName: z.string().trim().toLowerCase(),
	lastName: z.string().trim().toLowerCase(),
	email: z.string().trim(),
	password: z.string().trim().min(8),
});

const projectInput = z.object({
	name: z.string().trim(),
	publicKey: z.string().trim().optional(),
	webhookUrl: z.string().trim(),
});

module.exports = { merchantSignup, projectInput };
