const express = require("express");
const cors = require("cors");
const axios = require("axios");
const UAParser = require("ua-parser-js");
const { getIp } = require("./utils/functions");

const app = express();

app.use(express.json());
app.use(cors());
app.enable("trust proxy");

app.get("/", (req, res) => {
  const ipAddress = getIp(req);
  axios
    .get(`https://ipapi.co/${ipAddress}/json/`)
    .then(function (response) {
      if (response.data.error) {
        console.log("Error in response+++");
        res.status(500).json({ data: "Local IP", ipAddress });
      } else {
        const userAgent = req.headers["user-agent"];
        const parser = new UAParser(userAgent);

        const result = parser.getResult();

        const os = result.os.name;
        const browser = result.browser.name;
        const device = result.device.model || "Unknown Device";

        res.status(200).json({ location: response.data, os, browser, device });
      }
    })
    .catch(function (error) {
      // handle error
      console.log("Error===");
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  console.log("Running");
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
