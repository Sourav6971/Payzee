const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const PORT = 8000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
