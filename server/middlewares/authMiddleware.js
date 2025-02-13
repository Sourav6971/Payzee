const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    res.json({
      msg: "Session timed out",
    });
  const jwtToken = authHeader.split(" ")[1];

  try {
    const response = jwt.verify(jwtToken, secret);
    if (response) next();
  } catch (err) {
    res.json(err);
  }
};

module.exports = { authMiddleware };
