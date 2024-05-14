const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config");

const jwtTokenGenerator = ({ payload }) => {
  return jwt.sign(payload, jwtSecret);
};

const verifyToken = ({ token }) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (e) {
    console.error(e);
    return false;
  }
};

const decodeToken = ({ token }) => {
  return jwt.decode(token);
};

const createRefreshToken = ({ payload }) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "30d" });
};

module.exports = {
  jwtTokenGenerator,
  verifyToken,
  decodeToken,
  createRefreshToken,
};
