const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    token = token.split(" ")[1]; // Extract token correctly
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// Role-based authorization middleware
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You do not have permission" });
    }
    next();
  };
};
