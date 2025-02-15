const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const accountRoute = require("./routes/account");
const transactionRoute = require("./routes/transaction");

const PORT = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoute);
app.use("/api/account", accountRoute);
app.use("/api", transactionRoute);

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
