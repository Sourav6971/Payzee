const mongoose = require("mongoose");

require("dotenv").config();

var MAX_RETRIES = 10;
var CURRENT_COUNT = 0;

async function connectDb() {
  while (CURRENT_COUNT < MAX_RETRIES) {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("DB connected");
      return; // exit once connected
    } catch (err) {
      CURRENT_COUNT++;
      console.log(
        `DB connection failed, retrying ${CURRENT_COUNT}/${MAX_RETRIES}...`
      );
      await new Promise((res) => setTimeout(res, 2000)); // wait 2s before retry
    }
  }
  console.log("Could not connect to DB after max retries");
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
connectDb();

module.exports = { User };
