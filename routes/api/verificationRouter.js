const express = require("express");

const router = express.Router();

const { verificationController } = require("../../controllers/users/index");
const { verifyController } = require("../../controllers/users/index");
const asyncHandler = require("express-async-handler");

router.post("/verify/"), asyncHandler(verifyController);
router.get("/verify/:verificationToken", asyncHandler(verificationController));

module.exports = router;
