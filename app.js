const express = require("express");
const cors = require("cors");
const { logHistory } = require("./utils/functions");

const app = express();

app.use(express.json());
app.use(cors());
app.enable("trust proxy");

app.get("/", (req, res) => {
  logHistory("login", { user: "aamir", req, res });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
