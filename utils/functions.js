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

  // Check if the IP is in IPv6-mapped IPv4 format
  if (ipaddr.IPv6.isValid(ip) && ipaddr.IPv6.parse(ip).kind() === "ipv4") {
    const ipv4 = ipaddr.IPv6.parse(ip).toIPv4().toString();
    return ipv4;
  }

  return ip;
};

module.exports = {
  getIp,
};
