const express = require("express");

const router = express.Router();

const auth = require("../../middlewares/auth");

const asyncHandler = require("express-async-handler");

const { registration, login, logout } = require("../../controllers/auth/index");

router.post("/register", asyncHandler(registration));
router.post("/login", asyncHandler(login));
router.post("/logout", auth, asyncHandler(logout));

module.exports = router;
