const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");

const {
  registrationController,
  loginController,
} = require("../../controllers/auth/index");

router.post("/register", asyncHandler(registrationController));
router.post("/login", asyncHandler(loginController));

module.exports = router;
