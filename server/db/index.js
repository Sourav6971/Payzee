const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to mongodb"));

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
