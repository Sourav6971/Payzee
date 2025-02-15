const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const { User } = require("../db/index");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    res.json({
      msg: "Session timed out",
    });
  const jwtToken = authHeader.split(" ")[1];
  try {
    const response = jwt.verify(jwtToken, secret);
    const foundUser = await User.findOne({ username: response });
    if (response) {
      req.username = response;
      req.userId = foundUser._id;
      next();
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports = { authMiddleware };
