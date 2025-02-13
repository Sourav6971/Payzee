const Router = require("express");
const router = Router();
const { User } = require("../db/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const zod = require("zod");

const userSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string().min(1),
});

router.post("/signup", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  const validateSchema = userSchema.safeParse({
    firstName,
    lastName,
    username,
    password,
  });
  console.log(validateSchema);

  if (!validateSchema.success) {
    res.json({
      msg: "Enter correct format",
    });
  } else {
    const response = await User.findOne({
      username,
    });
    if (response) {
      res.json({
        msg: "User already exists",
      });
    } else {
      const newUser = await User.create({
        firstName,
        lastName,
        username,
        password,
      });
      const token = jwt.sign(username, SECRET);
      res.json({
        newUser,
        token: token,
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const validateUser = await User.findOne({
    username,
    password,
  });
  if (validateUser) {
    const token = jwt.sign(username, SECRET);
    res.json({ token });
  } else {
    res.json({
      msg: "Invalid Credentials",
    });
  }
});

router.put("/update_password:", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  const updatedUser = await User.findOne({
    username,
    password,
  });
  if (!updatedUser) {
    res.json({
      msg: "user not found",
    });
  } else {
    updatedUser.password = newPassword;
    await updatedUser.save();
    res.json({
      updatedUser,
    });
  }
});

module.exports = router;
