const express = require("express");
const app = express();

const PORT = process.env.PORT ?? 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
	res.json({
		msg: "app running successfully",
	});
});

// app.use("/api/user", require("./routes/user"));
// app.use("/api/account", require("./routes/account"));
// app.use("/api", require("./routes/transaction"));

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
