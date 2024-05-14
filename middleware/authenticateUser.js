const { verifyToken } = require("../util/auth");
const config = require("../config");

const authenticateUser = async (req, res, next) => {
  try {
    if (config.get("env") === "test_remote") next();
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).send({ message: "No token provided" });
    }

    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
      return res.status(401).send({ message: "Invalid token" });
    }

    let token = headerToken.split(" ")[1];
    const tokenContent = verifyToken(token);

    if (tokenContent) {
      req.user = tokenContent;
      return next();
    } else {
      return res.status(403).send({ message: "Could not authorize" });
    }
  } catch (error) {
    req.log.error(error);
    return res.status(403).send({ message: "Could not authorize" });
  }
};

module.exports = authenticateUser;
