const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const { getIp } = require("./utils/functions");

app.enable("trust proxy");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const ipAddress = getIp(req);
  console.log(ipAddress);

  axios
    .get(`https://ipapi.co/${ipAddress}/json/`)
    .then(function (response) {
      // handle success
      //console.log(response.data);
      if (response.data.error) {
        console.log("Error in response+++");
        res.status(500).json({ data: "Local IP", ipAddress });
      } else {
        res.status(200).json({ ipAddress, location: response.data });
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
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
