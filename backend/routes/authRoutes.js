const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateProfile   // ✅ MUST be here
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// routes
router.post("/register", register);
router.post("/login", login);
router.put("/update", authMiddleware, updateProfile); // ✅

module.exports = router;