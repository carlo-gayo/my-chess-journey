// backend/middleware/role.middleware.js
// Role guards — run after `protect` has verified the token and set req.user.
//
// adminOnly    → only admins pass
// memberOrAdmin → logged-in members and admins pass; guests are blocked

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Access denied — Admins only' });
};

const memberOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'member' || req.user.role === 'admin')) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied — Members only' });
};

module.exports = { adminOnly, memberOrAdmin };
