const jwt = require("jsonwebtoken");

const generateAccessToken = (object) => {
  return jwt.sign(object, process.env.TOKEN_SECRET, { expiresIn: "5m" });
};

module.exports = { generateAccessToken };
