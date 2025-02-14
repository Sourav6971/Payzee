const Router = require("express");
const router = Router();
const { Account, User } = require("../db/index");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/balance", authMiddleware, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username });

  const userBalance = await Account.findOne(user.userId);

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

module.exports = router;
