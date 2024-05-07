// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
exports.authenticateUser = (req, res, next) => {
  // Get token from request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, 'your_secret_key');

    // Attach user ID to request object
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
