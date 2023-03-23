const express = require("express");

const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../models/userModel");

const router = express.Router();

const auth = require("../../middlewares/auth");

const asyncHandler = require("express-async-handler");

const { registration, login, logout } = require("../../controllers/auth/index");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  asyncHandler(registration)
);
// router.post("/login", validateBody(schemas.loginSchema), asyncHandler(login));
router.post("/login", login);
router.post("/logout", auth, asyncHandler(logout));

module.exports = router;
