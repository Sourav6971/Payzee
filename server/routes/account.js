const Router = require("express");
const router = Router();
const { User } = require("../db/index");
const { createAccount } = require("../solana/createAccount");
const bcrypt = require("bcryptjs");
const { balanceCheck } = require("../solana/balance");
const { addAccount } = require("../solana/addAccount");

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

router.post("/add-existing", async (req, res) => {
  const { username, password, privateKey } = req.body;

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

  const availableBalance = await balanceCheck(publicAddress);
  const addedAccount = await User.updateOne(
    { username },
    {
      $push: {
        accounts: {
          publicKey: publicAddress,
          privateKey,
          balance: availableBalance,
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

module.exports = router;
