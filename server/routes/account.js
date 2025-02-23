const Router = require("express");
const router = Router();
const { Account, User } = require("../db/index");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createAccount } = require("../solana/createAccount");
const bcrypt = require("bcryptjs");

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

      const returnValue = createAccount();
      await Account.create({
        userId: validateUser._id,
        publicKey: (await returnValue).publicKeyString,
        privateKey: (await returnValue).secretKeyString,
        balance: 0,
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

module.exports = router;
