const axios = require("axios");
const UAParser = require("ua-parser-js");

const getIp = (req) => {
  let ip;
  // console.log(JSON.stringify(req, null, 2));
  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",").pop().trim();
  } else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.ip;
  }

  if (ip.includes("::")) {
    ip = ip.split(":").pop();
  }
  return ip;
};

const logHistory = (logType, userDetail, req, res) => {
  console.log(req.headers);
  const isPostmanRequest =
    req.headers["user-agent"].includes("Postman") ||
    req.headers["postman-token"];
  if (isPostmanRequest) {
    return;
  }

  console.log("Call API");
  const ipAddress = getIp(req);
  console.log(`IP ADDRESS ${ipAddress}`);
  axios
    .get(`https://ipapi.co/${ipAddress}/json/`)
    .then(function (response) {
      if (response.data.error) {
        res.status(500).json({ data: "Local IP", ipAddress });
      } else {
        const userAgent = req.headers["user-agent"];
        const parser = new UAParser(userAgent);
        const result = parser.getResult();
        const os = result.os.name;
        const browser = result.browser.name;
        const device = result.device.model || "Unknown Device";
        //insert data here
        res.status(200).json({ location: response.data, os, browser, device });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  console.log("Running");
};

module.exports = {
  getIp,
  logHistory,
};
