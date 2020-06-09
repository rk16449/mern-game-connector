const jwt = require("jsonwebtoken");
const config = require("config");

// middleware function has access to the request and response cycle (objects) and next is a callback that we have to run once we're done so that we can go to the next piece of middleware
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    // Not authorized error
    return res.status(401).json({ msg: "No token, no authorization given" });
  }

  // Verify token
  try {
    // decode the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // User was attached in the payload
    req.user = decoded.user;

    // finish
    next();
  } catch (err) {
    // token not valid
    return res.status(401).json({ msg: "Token not valid!" });
  }
};
