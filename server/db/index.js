const mongoose = require("mongoose");
require("dotenv").config();

const MAX_RETRIES = 6;
let CURRENT_COUNT = 0;

(async function connectDb() {
	while (CURRENT_COUNT < MAX_RETRIES) {
		try {
			await mongoose.connect(process.env.MONGODB_URL, {
				timeoutMS: 10000,
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
})();

const MerchantSchema = new mongoose.Schema({
	email: string,
	password: string,
	source: string,
});
const User = mongoose.model("User", UserSchema);

module.exports = { User };
