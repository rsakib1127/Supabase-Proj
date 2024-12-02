const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: true, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: true, message: 'Invalid or expired token.' });
  }
}


function authMiddlewareMock(req, res, next) {
    next();
  }

module.exports = authMiddleware;