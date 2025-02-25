const Router = require("express");
const router = Router();
const { User } = require("../db/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const zod = require("zod");
const { authMiddleware } = require("../middlewares/authMiddleware");
const bcrypt = require("bcryptjs");

const userSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/me", (req, res) => {
  const recievedToken = req.body.token;
  const jwtToken = recievedToken.split(" ")[1];

  try {
    const response = jwt.verify(jwtToken, SECRET);
    if (response) {
      res.status(200).json({
        verification: true,
      });
    } else {
      res.json({
        verification: false,
      });
    }
  } catch (err) {
    res.json({
      msg: "sign in again",
    });
  }
});

router.post("/signup", async (req, res) => {
  let { firstName, lastName, username, password } = req.body;
  username = username?.toLowerCase();
  const { success } = userSchema.safeParse(req.body);

  if (!success) {
    res.json({
      msg: "Enter correct format",
    });
  } else {
    const response = await User.findOne({
      username,
    });
    if (response) {
      res.status(409).json({
        msg: "User already exists",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      await User.create({
        firstName,
        lastName,
        username,
        password: hashedPassword,
      });
      const token = jwt.sign(username, SECRET);
      res.json({
        token: token,
      });
    }
  }
});

router.post("/signin", async (req, res) => {
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
      req.userId = validateUser._id.toString();

      const token = jwt.sign(username, SECRET);
      res.json({ token });
    }
  } else {
    res.json({
      msg: "Invalid Credentials",
    });
  }
});

router.put("/update_user", authMiddleware, async (req, res) => {
  const { firstName, lastName, password } = req.body;
  const username = req.username;
  const { success } = userSchema.safeParse({
    firstName,
    lastName,
    username,
    password,
  });
  if (!success)
    res.json({
      msg: "Invalid input",
    });

  const updatedUser = await User.findOneAndUpdate(
    { username },

    {
      firstName,
      lastName,
      password,
    },
    {
      new: true,
    }
  );
  if (updatedUser) {
    res.json({
      updatedUser,
    });
  } else {
    res.json({
      msg: "user not found",
    });
  }
});

router.post("/verify-password", authMiddleware, async (req, res) => {
  const password = req.body.password;
  try {
    const user = await User.findOne({ username: req.username });
    const validation = bcrypt.compareSync(password, user.password);
    if (validation) {
      return res.status(200).json({ msg: true });
    } else {
      throw new error();
    }
  } catch (err) {
    return res.json({
      msg: false,
    });
  }
});

module.exports = router;
