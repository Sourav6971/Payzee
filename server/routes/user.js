const Router = require("express");
const router = Router();
const { User } = require("../db/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const { userSchema } = require("./../zod/index");

const { authMiddleware } = require("../middlewares/authMiddleware");
const bcrypt = require("bcryptjs");
const z = require("zod");

router.post("/me", authMiddleware, (req, res) => {
  const recievedToken = req.userId;
  const jwtToken = recievedToken.split(" ")[1];

  try {
    const response = jwt.verify(jwtToken, SECRET);
    if (response) {
      res.status(200).json({
        verification: true,
      });
    } else {
      return res.json({
        verification: false,
      });
    }
  } catch (err) {
    return res.json({
      msg: "sign in again",
    });
  }
});

router.post("/signup", async (req, res) => {
  let data = req.body;

  const response = userSchema.safeParse(data);

  if (!response.success) {
    return res.status(400).json({
      message: "Invalid data format",
    });
  }
  try {
    let { username, password, firstName, lastName } = response?.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });
    if (user) {
      return res.status(201).json({
        message: "User created successfully!",
        user,
      });
    } else {
      return res.status(500).json({
        message: "Could not create user",
      });
    }
  } catch {
    res.status(500).json({
      message: "Internal server error",
    });
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
      return res.json({ token });
    }
  } else {
    return res.json({
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
    return res.json({
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
    return res.json({
      updatedUser,
    });
  } else {
    return res.json({
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

router.get("/get-users", authMiddleware, async (req, res) => {
  let filter = req.query.filter || "";

  console.log(filter);
  try {
    const user = await User.find({
      username: { $ne: req.username },
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    if (user.length) {
      res.json({
        users: user,
      });
    } else {
      res.json({
        users: [],
      });
    }
  } catch (err) {
    res.json({ msg: "user not found" });
  }
});

module.exports = router;
