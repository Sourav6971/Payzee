const Router = require("express");
const router = Router();
const { User } = require("../db/index");
const bcrypt = require("bcryptjs");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/create-account", authMiddleware, async (req, res) => {
	username = req.username;
	let { password } = req.body;
	username = username.toLowerCase();

	const validateUser = await User.findOne({
		username,
	});
	if (validateUser) {
		// const { publicKeyString, secretKeyString } = await createAccount();

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
		return res.status(404).json({
			msg: "User does not exist",
		});
	}
});

router.post("/add-existing", authMiddleware, async (req, res) => {
	const username = req.username;
	const { privateKey } = req.body;

	const availableUser = await User.findOne({ username });
	if (!availableUser) {
		return res.json({
			msg: "user not found",
		});
	}

	// const publicAddress = await addAccount(privateKey);

	const existingAccount = await User.findOne({
		username,
		"accounts.publicKey": publicAddress,
	});
	if (existingAccount) {
		return res.json({ msg: "account already exists" });
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
		// const availableBalance = await balanceCheck(publicKey);
		return res.json({
			balance: availableBalance,
		});
	} catch (err) {
		return res.status(404).json({
			msg: "could not fetch balance",
		});
	}
});

router.get("/dashboard", authMiddleware, async (req, res) => {
	const username = req.username;
	const activeUser = await User.findOne({ username });
	if (activeUser)
		return res.json({
			user: activeUser,
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
		// const transactionList = await transactionHistory(publicKey);
		return res.json({ transactions: transactionList });
	} catch (err) {
		return res.status(403).json({
			msg: "error fetching transaction",
		});
	}
});

module.exports = router;
