const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");

// const {} = require("../../controllers/users/index");

router.get("/register", asyncHandler());
module.exports = router;
