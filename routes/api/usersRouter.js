const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");

const { userController } = require("../../controllers/users/index");

router.get("/list", asyncHandler(userController));

module.exports = router;
