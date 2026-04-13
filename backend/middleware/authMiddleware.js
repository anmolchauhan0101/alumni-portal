const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "fallback_secret";

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token or invalid format" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET); // ✅ FIX

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};