const Router = require("express");
const router = Router();
const { Account, User } = require("../db/index");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createAccount } = require("../solana/createAccount");
const bcrypt = require("bcryptjs");
const { balance } = require("../solana/balance");

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const userBalance = await Account.findOne({ userId });

  if (userBalance) {
    res.json({
      balance: userBalance.balance,
    });
  } else {
    res.json({
      msg: "error",
    });
  }
});
router.post("/create-account", async (req, res) => {
  let { username, password } = req.body;
  username = username?.toLowerCase();

  const validateUser = await User.findOne({
    username,
  });
  if (validateUser) {
    const validatePassword = bcrypt.compareSync(
      password,
      validateUser.password
    );
    const accountExists = await Account.findOne({
      userId: validateUser._id,
    });
    if (validatePassword) {
      if (accountExists) {
        return res.status(403).json({
          msg: "account already exists",
        });
      }

      const returnValue = await createAccount();
      const balanceAvailable = await balance(returnValue.publicKeyString);

      await Account.create({
        userId: validateUser._id,
        publicKey: returnValue.publicKeyString,
        privateKey: returnValue.secretKeyString,
        balance: balanceAvailable,
      });
      return res.json({
        msg: "account created successfully",
      });
    } else {
      return res.status(401).json({
        msg: "wrong password",
      });
    }
  } else {
    return res.status(403).json({
      msg: "user not found",
    });
  }
});

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const response = await Account.findOne({
    userId,
  });
  if (response.balance) {
    return res.json({
      balance: "balance",
    });
  } else {
    return res.status(404).json({
      msg: "user does not exist",
    });
  }
});

module.exports = router;
