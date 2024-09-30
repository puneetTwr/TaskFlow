const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.warn({ authHeader });
  const token = authHeader && authHeader.split(" ")[1]; // Get token from Authorization header
  console.warn({ token });
  if (!token) return res.sendStatus(401); // Unauthorized if no token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user; // Attach user info to req.user
    next(); // Proceed to the next middleware
  });
};

module.exports = authenticateToken;
