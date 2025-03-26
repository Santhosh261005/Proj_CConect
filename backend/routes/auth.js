const express = require("express");
const { check, validationResult } = require("express-validator");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// @route   POST /auth/register
// @desc    Register a new user
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    registerUser(req, res);
  }
);

// @route   POST /auth/login
// @desc    Login user & return token
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    loginUser(req, res);
  }
);

// @route   POST /auth/logout
// @desc    Logout user
router.post("/logout", logoutUser);

// @route   GET /auth/me
// @desc    Get current logged-in user
// @access  Private (Requires valid token)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json({ success: true, user: req.user }); // req.user is set in authMiddleware
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
