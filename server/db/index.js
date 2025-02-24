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
//for future property listings in market
// const PropertySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId },
//   imgUrl: { type: String },
//   price: { type: Number },
// });

const User = mongoose.model("User", UserSchema);

module.exports = { User };
