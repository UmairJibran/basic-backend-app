const jwt = require("jsonwebtoken");
const config = require("../config");

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

// Example usage in authenticateUser function
const authenticateUser = (req, res) => {
  const { username, password } = req.body;

  // Replace this with your user authentication logic
  const user = authenticateWithDatabase(username, password);

  if (user) {
    const token = generateToken({ id: user.id, username: user.username });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
};

// Example middleware to protect routes
const authenticateMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Failed to authenticate token" });
  }

  req.user = decoded;
  next();
};

module.exports = {
  authenticateUser,
  authenticateMiddleware,
};