const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      error: "Unauthorized",
      message: "Missing JWT token",
    });
  }

  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      return res.status(403).json({
        statusCode: 403,
        error: "Forbidden",
        message: "Invalid JWT token",
      });
    }

    req.userId = user.userId;
    next();
  });
}

module.exports = authenticateToken;
