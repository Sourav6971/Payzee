const z = require("zod");

const userSchema = z.object({
  username: z.string().email().trim(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  password: z.string().min(6),
});

const accountSchema = z.object({
  userId: z.string().trim(),
  publicKey: z.string().trim(),
});

module.exports = { userSchema, accountSchema };
