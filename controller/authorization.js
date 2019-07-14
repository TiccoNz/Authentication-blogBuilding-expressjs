const jwt = require('jsonwebtoken');

function privateRouteAuthorization(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.send('Sorry private page');

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.send('Invalid token');
  }
}

module.exports = { privateRouteAuthorization };
