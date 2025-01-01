const express = require("express");
const router = express.Router();
const authController = require("modules/auth/authController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/login-admin", authController.loginAdmin);
router.post("/register-admin", authController.registerAdmin);

module.exports = router;
