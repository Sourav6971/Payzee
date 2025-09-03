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

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
