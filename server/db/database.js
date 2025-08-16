const { User } = require(".");
const bcrypt = require("bcryptjs");

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hashSync(password);
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  if (user) return { email: user.email, id: user._id };
}

async function findUser(email) {
  const user = await User.findOne({ email });
  return user;
}

module.exports = { createUser, findUser };
