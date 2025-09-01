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
const { findUser, createUser } = require("../db/database");

JWT_SECRET = process.env.JWT_SECRET;

router.post("/me", authMiddleware, (req, res) => {
	const receivedToken = req.userId;
	const jwtToken = receivedToken.split(" ")[1];

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

	if (!response?.success) {
		return res.status(400).json({
			message: "Invalid data format",
			success: false,
		});
	}
	try {
		let { email, password } = response?.data;

		const existingUser = await findUser(email);
		if (existingUser)
			return res.json({
				message: "User already exists",
				success: false,
			});

		const user = await createUser(email, password);
		if (user) {
			const token = await jwt.sign({ userId: user._id }, JWT_SECRET);

			return res.json({
				message: "User created successfully",
				success: true,
				user,
				token,
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
	let { email, password } = req.body;

	try {
		const validateUser = await findUser(email);
		if (validateUser) {
			const validatePassword = bcrypt.compareSync(
				password,
				validateUser?.password
			);

			if (validatePassword) {
				const token = jwt.sign({ userId: validateUser?._id }, JWT_SECRET);
				return res.json({
					success: true,
					message: "Signin successfull",
					user: validateUser,
					token,
				});
			}
		} else {
			return res.status(401).json({
				message: "Invalid credentials",
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error.message,
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
