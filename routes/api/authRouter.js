const express = require("express");

const { schemas } = require("../../models/userModel");

const router = express.Router();

const { auth, validateBody, upload } = require("../../middlewares");

const asyncHandler = require("express-async-handler");

const {
  registration,
  login,
  logout,
  updateAvatar,
} = require("../../controllers/auth/index");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  asyncHandler(registration)
);
router.post("/login", validateBody(schemas.loginSchema), asyncHandler(login));
router.post("/logout", auth, asyncHandler(logout));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  asyncHandler(updateAvatar)
);

module.exports = router;
