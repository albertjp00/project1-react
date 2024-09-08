const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization'];  // Token from cookies or Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, token missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user; // Attach user information from the token to the request object
    next(); // Allow request to proceed
  });
};

module.exports = {authenticateToken}