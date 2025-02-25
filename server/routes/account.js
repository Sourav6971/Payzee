const Router = require("express");
const router = Router();
const { User } = require("../db/index");
const { createAccount } = require("../solana/createAccount");
const bcrypt = require("bcryptjs");
const { balanceCheck } = require("../solana/balance");
const { addAccount } = require("../solana/addAccount");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { transactionHistory } = require("../solana/transactionHistory");

router.post("/create-account", authMiddleware, async (req, res) => {
  username = req.username;
  let { password } = req.body;
  username = username.toLowerCase();

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

      const userUpdated = await User.updateOne(
        { username },
        {
          $push: {
            accounts: {
              publicKey: publicKeyString,
              privateKey: secretKeyString,
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

router.post("/add-existing", authMiddleware, async (req, res) => {
  const username = req.username;
  const { password, privateKey } = req.body;

  const availableUser = await User.findOne({ username });
  if (!availableUser) {
    return res.json({
      msg: "user not found",
    });
  }
  const correctPassword = availableUser.password;
  const validatePassword = bcrypt.compareSync(password, correctPassword);
  if (!validatePassword) {
    return res.json({
      msg: "wrong password",
    });
  }
  const publicAddress = await addAccount(privateKey);

  const existingAccount = await User.findOne({
    username,
    "accounts.publicKey": publicAddress,
  });
  if (existingAccount) {
    return res.json({ msg: "public key must be unique" });
  }

  const addedAccount = await User.updateOne(
    { username },
    {
      $push: {
        accounts: {
          publicKey: publicAddress,
          privateKey,
        },
      },
    }
  );
  if (!addedAccount) {
    return res.status(401).json({
      msg: "could not create account",
    });
  } else {
    return res.status(200).json({
      msg: "account added successfully",
    });
  }
});

router.get("/balance", authMiddleware, async (req, res) => {
  const publicKey = req.body.publicKey;
  try {
    const availableBalance = await balanceCheck(publicKey);
    return res.json({
      balance: availableBalance,
    });
  } catch (err) {
    return res.status(404).json({
      msg: "could not fetch balance",
    });
  }
});

router.get("/accounts", authMiddleware, async (req, res) => {
  const username = req.username;
  const activeUser = await User.findOne({ username });
  if (activeUser)
    return res.json({
      accounts: activeUser.accounts,
    });
  else {
    return res.status(404).json({
      msg: "error finding accounts",
    });
  }
});
router.get("/transactions", authMiddleware, async (req, res) => {
  const publicKey = req.body.publicKey;

  try {
    const transactionList = await transactionHistory(publicKey);
    return res.json({ transactions: transactionList });
  } catch (err) {
    return res.status(403).json({
      msg: "error fetching transaction",
    });
  }
});

module.exports = router;
