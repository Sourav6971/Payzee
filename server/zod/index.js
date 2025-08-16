const z = require("zod");

const userSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6).trim(),
});

const accountSchema = z.object({
  userId: z.string().trim(),
  publicKey: z.string().trim(),
});

module.exports = { userSchema, accountSchema };
