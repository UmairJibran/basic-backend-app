const jwt = require("jsonwebtoken");
const config = require("../config");

const firebase = { auth: {} };

// Function to generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, config.get("jwt_secret"), { expiresIn: "1h" });
};

// Function to verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.get("jwt_secret"));
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};

firebase.generateToken = generateToken;
firebase.verifyToken = verifyToken;

module.exports = firebase;