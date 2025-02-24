const mongoose = require("mongoose");
const Router = require("express");
const { User } = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { transaction } = require("../solana/transaction");
const router = Router();
const bcrypt = require("bcryptjs");

router.post("/transaction", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { fromAddress, toAddress, password, amount } = req.body;

  const fromAccount = await User.findOne({
    "accounts.privateKey": fromAddress,
  }).session(session);

  if (!fromAccount) {
    await session.abortTransaction();
    return res.status(401).json({
      msg: "Account does not exist",
    });
  }

  const correctPassword = bcrypt.compareSync(password, fromAccount.password);

  if (!correctPassword) {
    await session.abortTransaction();
    return res.status(401).json({
      msg: "Incorrect password",
    });
  }

  try {
    const signature = await transaction(fromAddress, toAddress, amount);

    await session.commitTransaction();
    return res.status(200).json({
      msg: "transfer successfull",
      signature,
    });
  } catch (err) {
    await session.abortTransaction();
    return res.status(404).json({
      msg: "Insufficient funds",
    });
  }
});

module.exports = router;
