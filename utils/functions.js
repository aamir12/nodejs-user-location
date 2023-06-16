const ipaddr = require("ipaddr.js");
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

module.exports = {
  getIp,
};
