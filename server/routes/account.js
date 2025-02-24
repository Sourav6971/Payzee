const Router = require("express");
const router = Router();
const { Account, User } = require("../db/index");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createAccount } = require("../solana/createAccount");
const bcrypt = require("bcryptjs");
const { balanceCheck } = require("../solana/balance");

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

    if (validatePassword) {
      const { publicKeyString, secretKeyString } = await createAccount();
      const balance = await balanceCheck(publicKeyString);

      const userUpdated = await User.updateOne(
        { username },
        {
          $push: {
            accounts: {
              publicKey: publicKeyString,
              privateKey: secretKeyString,
              balance,
            },
          },
        }
      );
      if (userUpdated) {
        return res.status(200).json({
          msg: "account successfully created",
        });
      }
    } else {
      return res.status(401).json({
        msg: "wrong password",
      });
    }
  } else {
    return res.status(404).json({
      msg: "User does not exist",
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
