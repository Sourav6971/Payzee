const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
	return res.json({
		msg: "Welcome to payzee",
	});
});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/transaction", require("./routes/transaction"));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
