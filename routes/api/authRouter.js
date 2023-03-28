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
  verify,
  resendEmail,
} = require("../../controllers/auth/index");

// signup routes
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  asyncHandler(registration)
);
router.get("/verify/:verificationToken", asyncHandler(verify));
router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  asyncHandler(resendEmail)
);

// signin routes
router.post("/login", validateBody(schemas.loginSchema), asyncHandler(login));
router.post("/logout", auth, asyncHandler(logout));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  asyncHandler(updateAvatar)
);

module.exports = router;
