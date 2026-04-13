const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token" });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    // ✅ Verify using SAME secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user
    req.user = decoded;

    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};