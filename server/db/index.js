const mongoose = require("mongoose");
require("dotenv").config();

const MAX_RETRIES = 6;
let CURRENT_COUNT = 0;

async function connectDb() {
	while (CURRENT_COUNT < MAX_RETRIES) {
		try {
			await mongoose.connect(process.env.MONGODB_URL, {
				serverSelectionTimeoutMS: 10000,
			});
			console.log("DB connected");
			return;
		} catch (err) {
			CURRENT_COUNT++;
			console.log(
				`DB connection failed, retrying ${CURRENT_COUNT}/${MAX_RETRIES}...`
			);
		}
	}
	console.log("Could not connect to DB after max retries");
}

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

connectDb();

const User = mongoose.model("User", UserSchema);

module.exports = { User };
