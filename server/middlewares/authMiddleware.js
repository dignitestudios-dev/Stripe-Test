const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Unauthorized." });
    }

    req.admin = decoded;

    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token." });
  }
};

module.exports = verifyAdmin;
