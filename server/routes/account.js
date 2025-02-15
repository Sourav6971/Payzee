const Router = require("express");
const router = Router();
const { Account, User } = require("../db/index");
const { authMiddleware } = require("../middlewares/authMiddleware");

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

module.exports = router;
