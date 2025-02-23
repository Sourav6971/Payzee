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
});
//for future property listings in market
// const PropertySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId },
//   imgUrl: { type: String },
//   price: { type: Number },
// });

const User = mongoose.model("User", UserSchema);

const AccountSchema = new mongoose.Schema({
  //reference to the User table so that anyone cannot just type anything and there has to be a user to get the account access
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  publicKey: { type: String, required: true },
  privateKey: { type: String, required: true },
  balance: { type: String, required: true },
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = { User, Account };
