const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to mongodb"));

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  accounts: [{ privateKey: String, publicKey: String }],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
